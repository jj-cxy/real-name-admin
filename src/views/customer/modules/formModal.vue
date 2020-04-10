<template>
  <a-modal
    :title="textMap[dialogStatus]"
    :width="600"
    centered
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
    :maskClosable="false"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="企业名称">
          <a-input placeholder="请输入企业名称" v-decorator="['name', validatorRules.name]" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="统一社会信用代码">
          <a-input
            placeholder="请输入统一社会信用代码"
            v-decorator="['credentialsNo',validatorRules.credentialsNo]"
          />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="是否为集团账户">
          <a-radio-group v-decorator="['group', validatorRules.group]">
            <a-radio value="1">是</a-radio>
            <a-radio value="0">否</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="选择上级单位">
          <a-select
            :disabled="form.getFieldValue('group')==1"
            allowClear
            showSearch
            optionFilterProp="children"
            v-decorator="['parentId']"
            placeholder="请选择"
          >
            <a-select-option
              v-for="(item,index) in enterpriseList"
              :key="index"
              :value="item.id"
            >{{item.name}}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="默认密码">
          <span>{{defaultPass}}</span>
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import modalMixin from '@/components/Mixins/modal'
import { axios } from '@/utils/request'
import pick from 'lodash.pick'

export default {
  name: 'customerModel',
  mixins: [modalMixin],
  data() {
    return {
      Urls: {
        addUrl: '/auth/api/customer/insert',
        editUrl: '/auth/api/customer/update/',
        getByIdUrl: '/auth/api/customer/get/',
        enterpriseListUrl: '/auth/api/enterprise/getGroup',
        defaultPassUrl: '/auth/api/account/defaultPwd'
      },
      textMap: {
        add: '新招租账户资料填写'
      },
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 }
      },
      validatorRules: {
        name: {
          rules: [
            { required: true, message: '此字段为必填!' },
            { min: 2, max: 40, message: '长度在 2 到 40 个字符', trigger: 'blur' }
          ]
        },
        must: { rules: [{ required: true, message: '此字段为必填!' }] },
        group: { rules: [{ required: true, message: '此字段为必填!' }], initialValue: '1' },
        credentialsNo: { rules: [{ required: true, validator: this.validateCredentialsNo }] }
      },
      enterpriseList: [],
      defaultPass: ''
    }
  },
  created() {},
  methods: {
    beforeOpen() {
      this.getEnterpriseList()
      this.getDefaultPass()
    },
    // 企业列表
    getEnterpriseList() {
      axios({
        url: this.Urls.enterpriseListUrl,
        method: 'get'
      }).then(res => {
        if (res.code == 0) {
          this.enterpriseList = res.data.records
        } else {
          this.$notification.error({
            message: res.msg
          })
        }
      })
    },

    // 获取初始密码
    getDefaultPass() {
      axios({
        url: this.Urls.defaultPassUrl,
        method: 'get'
      }).then(res => {
        if (res.code == 0) {
          this.defaultPass = res.data
        } else {
          this.$notification.error({
            message: res.msg
          })
        }
      })
    },
    // 提交表单
    handleSubmit() {
      const {
        form: { validateFields }
      } = this
      this.confirmLoading = true
      validateFields((errors, values) => {
        if (!errors) {
          this.beforeSubmit(values)
          axios({
            url: this.model.id ? this.Urls.editUrl + this.model.id : this.Urls.addUrl,
            method: 'post',
            data: values
          })
            .then(res => {
              this.confirmLoading = false
              if (res.code == 0) {
                let _this = this
                this.$info({
                  title: '请确认该招租账号：' + res.data.username,
                  content: '默认密码：' + _this.defaultPass,
                  centered: true,
                  onOk() {
                    _this.visible = false
                    _this.$emit('ok')
                  }
                })
              } else {
                this.$notification.error({
                  message: res.msg
                })
              }
            })
            .catch(() => {
              this.confirmLoading = false
            })
        } else {
          this.confirmLoading = false
        }
      })
    },
    validateCredentialsNo(rule, value, callback) {
      const reg = /[^_IOZSVa-z\W]{2}\d{6}[^_IOZSVa-z\W]{10}/g
      if (reg.test(value)) {
        callback()
      } else {
        callback('请输入正确的社会信用代码')
      }
    }
  }
}
</script>

<style scoped>
</style>