<template>
  <div class="account-settings-info-view">
    <a-row :gutter="16">
      <a-col :md="24" :lg="16">
        <a-form @submit="handleSubmit" :form="form" layout="vertical">
          <a-form-item label="人员姓名">
            <a-input placeholder="请输入人员姓名" v-decorator="['name', validatorRules.must]" />
          </a-form-item>
          <a-form-item label="手机号码">
            <a-input placeholder="请输入手机号码" v-decorator="['phone', validatorRules.phone]" />
          </a-form-item>
          <a-form-item label="所属部门">
            <a-select
              showSearch
              optionFilterProp="children"
              v-decorator="['orgId', validatorRules.must]"
              placeholder="请选择"
            >
              <a-select-option
                v-for="(item,index) in orgList"
                :key="index"
                :value="item.id"
              >{{item.name}}</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="所属职务">
            <a-select
              showSearch
              optionFilterProp="children"
              v-decorator="['roleId', validatorRules.must]"
              placeholder="请选择"
            >
              <a-select-option
                v-for="(item,index) in roleList"
                :key="index"
                :value="item.id"
              >{{item.name}}</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="备注">
            <a-textarea :rows="3" v-decorator="['remark']" placeholder="..." />
          </a-form-item>
          <a-form-item>
            <a-button type="primary" style="margin-left: 8px" htmlType="submit">提交</a-button>
          </a-form-item>
        </a-form>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import modalMixin from '@/components/Mixins/modal'
import { axios } from '@/utils/request'
import pick from 'lodash.pick'
import Vue from 'vue'
import { ACCESS_TOKEN } from '@/store/mutation-types'

export default {
  name: 'userModel',
  mixins: [modalMixin],
  data() {
    return {
      Urls: {
        editUrl: '/auth/api/user/update/',
        getByIdUrl: '/auth/api/user/get/',
        roleListurl: '/auth/api/role/list',
        orgListurl: '/auth/api/org/list'
      },
      validatorRules: {
        username: {
          rules: [
            { required: true, message: '此字段为必填!' },
            { min: 2, max: 30, message: '长度在 2 到 30 个字符', trigger: 'blur' }
          ]
        },
        must: {
          rules: [{ required: true, message: '此字段为必填!' }]
        },
        phone: {
          rules: [{ required: true, validator: this.validateMobile }]
        }
      },
      roleList: [],
      orgList: [],
      tips: {
        edit: '修改资料成功，将跳转至登录页'
      }
    }
  },
  created() {
    this.getRoleList()
    this.getOrgList()
    this.fillForm()
  },
  methods: {
    fillForm() {
      axios({
        url: this.Urls.getByIdUrl + localStorage.getItem('in-userId'),
        method: 'get'
      }).then(res => {
        this.model = res.data
        this.setForm(res.data)
      })
    },
    // 职务列表
    getRoleList() {
      axios({
        url: this.Urls.roleListurl,
        method: 'get'
      }).then(res => {
        if (res.code == 0) {
          this.roleList = res.data.records
        } else {
          this.$notification.error({
            message: res.msg
          })
        }
      })
    },

    // 部门列表
    getOrgList() {
      axios({
        url: this.Urls.orgListurl,
        method: 'get'
      }).then(res => {
        if (res.code == 0) {
          this.orgList = res.data.records
        } else {
          this.$notification.error({
            message: res.msg
          })
        }
      })
    },

    setForm(data) {
      this.$nextTick(() => {
        this.form.setFieldsValue(pick(data, 'name', 'phone', 'orgId', 'roleId', 'remark'))
      })
    },
    afterSubmit() {
      var _this = this
      setTimeout(() => {
        Vue.ls.remove(ACCESS_TOKEN)
        _this.$router.push('/login/login')
      }, 2000)
    }
  }
}
</script>

<style scoped>
</style>