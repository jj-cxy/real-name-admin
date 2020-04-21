<template>
  <div class="main">
    <div class="top">
      <div class="header">
        <span class="title">贵阳市建筑工程从业人员 | 实名制管理系统</span>
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
        <h2>重置密码</h2>
        <a-form-item>
          <a-input
            size="large"
            type="text"
            placeholder="手机号"
            v-decorator="['phone',validatorRules.phone]"
          >
            <a-icon slot="prefix" type="user" :style="{ color: 'rgba(0,0,0,.25)' }" />
          </a-input>
        </a-form-item>

        <a-row :gutter="12">
          <a-col :span="14">
            <a-form-item>
              <a-input
                v-decorator="['code',validatorRules.code]"
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

        <a-row :gutter="16">
          <a-col class="gutter-row" :span="16">
            <a-form-item>
              <a-input
                v-decorator="['phoneCode',validatorRules.phoneCode]"
                size="large"
                type="text"
                placeholder="短信验证码"
              >
                <a-icon slot="prefix" type="mail" :style="{ color: 'rgba(0,0,0,.25)' }" />
              </a-input>
            </a-form-item>
          </a-col>
          <a-col class="gutter-row" :span="8">
            <a-button
              size="large"
              :disabled="state.smsSendBtn"
              @click.stop.prevent="getSmgCaptcha"
              v-text="!state.smsSendBtn && '获取验证码'||(state.time+' s')"
            ></a-button>
          </a-col>
        </a-row>

        <a-form-item style="margin-bottom: 0">
          <a-button
            size="large"
            type="primary"
            htmlType="submit"
            class="login-button"
            :loading="loginBtn"
            :disabled="loginBtn"
          >确 认</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script>
import { timeFix } from '@/utils/util'
import { axios } from '@/utils/request'
import { getImgCaptcha, getSmsCaptcha, getResetPwd } from '@/api/login'

export default {
  data() {
    return {
      loginBtn: false,
      form: this.$form.createForm(this),
      validatorRules: {
        phone: { rules: [{ required: true, message: '请输入手机号', validator: 'click' }] },
        code: { rules: [{ required: true, message: '请输入密码', validator: 'click' }] },
        phoneCode: { rules: [{ required: true, message: '请输短信验证码' }], validateTrigger: 'blur' }
      },
      state: {
        time: 60,
        smsSendBtn: false
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
    getSmgCaptcha(e) {
      e.preventDefault()
      const {
        form: { validateFields },
        state
      } = this

      validateFields((err, values) => {
        if (!err) {
          state.smsSendBtn = true
          const interval = window.setInterval(() => {
            if (state.time-- <= 0) {
              state.time = 60
              state.smsSendBtn = false
              window.clearInterval(interval)
            }
          }, 1000)

          const hide = this.$message.loading('验证码发送中..', 0)
          let params = {
            phone: values.phone,
            code: values.verifyCode,
            header: this.captchaHeader
          }
          getSmsCaptcha(params)
            .then(res => {
              setTimeout(hide, 2500)
              if (res.code == 0) {
                this.$notification['success']({
                  message: '提示',
                  description: '验证码获取成功',
                  duration: 8
                })
              } else {
                this.$notification['error']({
                  message: '错误',
                  description: err.msg,
                  duration: 4
                })
              }
            })
            .catch(err => {
              setTimeout(hide, 1)
              clearInterval(interval)
              state.time = 60
              state.smsSendBtn = false
            })
        }
      })
    },
    handleSubmit(e) {
      e.preventDefault()
      const {
        form: { validateFields }
      } = this

      this.loginBtn = true
      validateFields((err, values) => {
        if (!err) {
          const loginParams = {
            ...values
          }
          getResetPwd(loginParams)
            .then(res => {
              this.loginBtn = false
              if (res.code == 0) {
                this.$notification['success']({
                  message: '提示',
                  description: '密码重置成功，重置密码将发于手机短信，请注意查收',
                  duration: 4
                })
              } else {
                this.$notification['error']({
                  message: '错误',
                  description: err.msg || '请求出现错误，请稍后再试',
                  duration: 4
                })
              }
            })
            .catch(err => this.requestFailed(err))
            .finally(() => {
              this.loginBtn = false
            })
        } else {
          setTimeout(() => {
            this.loginBtn = false
          }, 600)
        }
      })
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
