<template>
  <div class="account-settings-info-view">
    <span style="position: relative; top: -20px">为了保证你的账户安全，请及时更改你的密码</span>
    <a-row :gutter="16">
      <a-col :md="24" :lg="16">
        <a-form @submit="handleSubmit" :form="form" layout="vertical">
          <a-form-item label="用户名">
            <a-input readonly placeholder v-model="mdl.userName" />
          </a-form-item>
          <a-form-item label="原密码">
            <a-input
              type="password"
              placeholder="请输入原密码"
              v-decorator="[ 'oldPwd', {rules: [{ required: true, message: '请输入原密码'}]}]"
            />
          </a-form-item>
          <a-form-item label="新密码">
            <a-input
              type="password"
              placeholder="请输入新密码"
              v-decorator="[ 'newPwd', {rules: [{ required: true, message: '请输入新密码'},{validator: validateToNextPassword}]}]"
            />
          </a-form-item>
          <a-form-item label="确认新密码">
            <a-input
              type="password"
              placeholder="请确认新密码"
              v-decorator="[ 'confirmPwd', {rules: [{ required: true, message: '请确认新密码'},{validator: compareToFirstPassword}]}]"
              @blur="handleConfirmBlur"
            />
          </a-form-item>
          <a-form-item>
            <a-button @click="resetForm">重置</a-button>
            <a-button type="primary" style="margin-left: 8px" htmlType="submit">提交</a-button>
          </a-form-item>
        </a-form>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { axios } from '@/utils/request'
import Vue from 'vue'
import { ACCESS_TOKEN } from '@/store/mutation-types'

export default {
  components: {},
  data() {
    return {
      state: {
        time: 60,
        smsSendBtn: false,
        passwordLevel: 0,
        passwordLevelChecked: false,
        percent: 10,
        progressColor: '#FF0000'
      },
      form: this.$form.createForm(this),
      confirmDirty: false,
      mdl: {
        userName: localStorage.getItem('in-trueName') || '未知'
      }
    }
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          let data = values
          axios({
            url: '/auth/api/account/editPwd',
            method: 'get',
            params: values
          }).then(res => {
            if (res.code == 0) {
              this.$notification.success({
                message: '修改成功，将跳转至登录页'
              })
              setTimeout(() => {
                Vue.ls.remove(ACCESS_TOKEN)
                this.$router.push('/login/login')
              }, 2000)
            } else {
              this.$notification.error({
                message: res.msg
              })
            }
          })
        }
      })
    },
    handleConfirmBlur(e) {
      const value = e.target.value
      this.confirmDirty = this.confirmDirty || !!value
    },
    compareToFirstPassword(rule, value, callback) {
      const form = this.form
      if (value && value !== form.getFieldValue('newPwd')) {
        callback('你输入的密码不一致')
      } else {
        callback()
      }
    },
    validateToNextPassword(rule, value, callback) {
      const form = this.form
      if (value && this.confirmDirty) {
        form.validateFields(['confirmPwd'], { force: true })
      }
      callback()
    },
    resetForm() {
      this.form.resetFields()
    }
  }
}
</script>

<style lang="less" scoped>
.avatar-upload-wrapper {
  height: 200px;
  width: 100%;
}

.ant-upload-preview {
  position: relative;
  margin: 0 auto;
  width: 100%;
  max-width: 180px;
  border-radius: 50%;
  box-shadow: 0 0 4px #ccc;

  .upload-icon {
    position: absolute;
    top: 0;
    right: 10px;
    font-size: 1.4rem;
    padding: 0.5rem;
    background: rgba(222, 221, 221, 0.7);
    border-radius: 50%;
    border: 1px solid rgba(0, 0, 0, 0.2);
  }
  .mask {
    opacity: 0;
    position: absolute;
    background: rgba(0, 0, 0, 0.4);
    cursor: pointer;
    transition: opacity 0.4s;

    &:hover {
      opacity: 1;
    }

    i {
      font-size: 2rem;
      position: absolute;
      top: 50%;
      left: 50%;
      margin-left: -1rem;
      margin-top: -1rem;
      color: #d6d6d6;
    }
  }

  img,
  .mask {
    width: 100%;
    max-width: 180px;
    height: 100%;
    border-radius: 50%;
    overflow: hidden;
  }
}
</style>
