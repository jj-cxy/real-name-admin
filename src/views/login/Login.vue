<template>
  <div class="main">
    <div class="top">
      <div class="header">
        <!-- <img src="~@/assets/logo.png" class="logo" alt="logo" /> -->
        <span class="title">贵阳&贵安建筑工程施工现场数字监管服务平台</span>
        <!-- <span class="title">贵阳市建筑工程从业人员</span> -->
        <!-- <div class="childTitle">实名制管理系统</div> -->
      </div>
    </div>
    <div class="wrapper">
      <div class="user-layout-slogan">
        <img src="/slogan.png" width="90%" />
      </div>
      <a-form
        id="formLogin"
        class="user-layout-login"
        ref="formLogin"
        :form="form"
        @submit="handleSubmit"
      >
        <h2>欢迎登录</h2>
        <a-form-item>
          <a-input
            size="large"
            type="text"
            placeholder="用户名/手机号"
            v-decorator="['username',validatorRules.username]"
          >
            <a-icon slot="prefix" type="user" :style="{ color: 'rgba(0,0,0,.25)' }" />
          </a-input>
        </a-form-item>

        <a-form-item>
          <a-input
            size="large"
            type="password"
            autocomplete="false"
            placeholder="登录密码"
            v-decorator="['password',validatorRules.password]"
          >
            <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }" />
          </a-input>
        </a-form-item>

        <a-row :gutter="12">
          <a-col :span="14">
            <a-form-item style="margin-bottom: 6px">
              <a-input
                v-decorator="['verifyCode',validatorRules.verifyCode]"
                size="large"
                type="text"
                placeholder="验证码"
              >
                <a-icon slot="prefix" type="smile" :style="{ color: 'rgba(0,0,0,.25)' }" />
              </a-input>
            </a-form-item>
          </a-col>
          <a-col :span="10">
            <div class="captcha">
              <img :src="captchaImg" alt @click="getCaptcha" />
            </div>
          </a-col>
        </a-row>

        <a-form-item>
          <a-checkbox
            v-decorator="['rememberMe',{
            valuePropName: 'checked',
            initialValue: false
          }]"
          >记住账号</a-checkbox>
        </a-form-item>

        <a-form-item style="margin-bottom: 0">
          <a-button
            size="large"
            type="primary"
            htmlType="submit"
            class="login-button"
            :loading="loginBtn"
            :disabled="loginBtn"
          >登 录</a-button>
        </a-form-item>

        <a-form-item style="margin-bottom: 0">
          <a href="javascript:;" @click="handleDownload">“操作手册”下载</a>
          <a href="javascript:;" @click="resetPwd" style="float: right;">忘记密码？</a>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script>
import md5 from 'md5'
import { mapActions } from 'vuex'
import { timeFix } from '@/utils/util'
import { axios } from '@/utils/request'
import { getImgCaptcha } from '@/api/login'

export default {
  data() {
    return {
      loginBtn: false,
      form: this.$form.createForm(this),
      validatorRules: {
        username: { rules: [{ required: true, message: '请输入用户名或者手机号', validator: 'click' }] },
        password: {
          initialValue: 'Jjsj@123456',
          rules: [{ required: true, message: '请输入密码', validator: 'click' }]
        },
        verifyCode: { rules: [{ required: true, message: '请输入验证码' }] }
      },
      state: {
        time: 60,
        loginBtn: false
      },
      Urls: {},
      captchaImg: '',
      captchaHeader: ''
    }
  },
  created() {
    this.getCaptcha()

    this.$nextTick(() => {
      this.form.setFieldsValue({
        username: localStorage.getItem('in-username') || ''
      })
    })
  },
  methods: {
    ...mapActions(['Login', 'Logout']),
    getCaptcha() {
      getImgCaptcha().then(res => {
        if (res.code == 0) {
          this.captchaImg = res.data.image
          this.captchaHeader = res.data.hash
        } else {
          this.$notification.error({
            message: res.msg
          })
        }
      })
    },
    handleSubmit(e) {
      e.preventDefault()
      const {
        form: { validateFields },
        Login
      } = this

      this.loginBtn = true
      validateFields((err, values) => {
        if (!err) {
          const loginParams = {
            ...values
          }
          loginParams.scope = 'INSIDE'
          loginParams.loginType = 'normal'
          loginParams.header = this.captchaHeader
          Login(loginParams)
            .then(res => {
              this.loginBtn = false
              if (values.rememberMe) {
                localStorage.setItem('in-username', values.username)
              } else {
                localStorage.removeItem('in-username')
              }
              this.loginSuccess(res)
            })
            .catch(err => this.requestFailed(err))
        } else {
          setTimeout(() => {
            this.loginBtn = false
          }, 600)
        }
      })
    },
    requestFailed(err) {
      this.loginBtn = false
      this.$notification['error']({
        message: '错误',
        description: err.msg || '请求出现错误，请稍后再试',
        duration: 4
      })
      this.getCaptcha()
    },
    loginSuccess(res) {
      this.$router.push({ path: '/' })
      /* if (res.data.user.defaultPwd) {
        this.$router.push('/account/set/base')
      } else {
        this.$router.push({ path: '/' })
      } */
    },
    resetPwd() {
      this.$router.push({
        path: '/login/reset-password'
      })
    },
    handleDownload() {
      let link = document.createElement('a')
      link.download = '操作手册.pdf'
      link.href = process.env.VUE_APP_BASE_API + '@/views/manual/manualFile.pdf'
      link.style.display = 'none'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }
}
</script>

<style lang="less" scoped>
.wrapper {
  display: flex;
  width: 860px;
  align-items: center;
  padding: 24px 32px 24px 32px;
  background-color: #fff;
  border-radius: 8px;
  box-sizing: border-box;
}
.top {
  .header {
    margin-bottom: 24px;
    position: relative;
    display: flex;
    align-items: center;

    .logo {
      height: 74px;
      vertical-align: top;
      border-style: none;
    }

    .title {
      font-size: 30px;
      letter-spacing: 2px;
      color: #fff;
      font-family: Avenir, 'Helvetica Neue', Arial, Helvetica, sans-serif;
      position: relative;
    }

    .childTitle {
      font-size: 22px;
    }
  }

  .desc {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.45);
    margin-top: 12px;
    margin-bottom: 30px;
  }
}

canvas {
  background: rgb(226, 225, 225);
  opacity: 0.3;
}

.user-layout-login {
  max-width: 420px;
  min-width: 365px;
  background-color: #fff;
  border-radius: 8px;
  .captcha {
    width: 100%;
    height: 40px;
    img {
      width: 100%;
      height: 100%;
      cursor: pointer;
    }
  }
  h2 {
    text-align: center;
    font-size: 18px;
    margin-top: 12px;
    margin-bottom: 20px;
    letter-spacing: 1px;
  }

  label {
    font-size: 14px;
  }

  .getCaptcha {
    display: block;
    width: 100%;
    height: 40px;
  }

  .forge-password {
    font-size: 14px;
  }

  button.login-button {
    padding: 0 15px;
    font-size: 16px;
    height: 40px;
    width: 100%;
  }

  .user-login-other {
    text-align: left;
    margin-top: 24px;
    line-height: 22px;

    .item-icon {
      font-size: 24px;
      color: rgba(0, 0, 0, 0.2);
      margin-left: 16px;
      vertical-align: middle;
      cursor: pointer;
      transition: color 0.3s;

      &:hover {
        color: #1890ff;
      }
    }

    .register {
      float: right;
    }
  }
}
</style>
