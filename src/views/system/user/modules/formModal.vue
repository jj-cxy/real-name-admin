<template>
  <a-modal
    :title="textMap[dialogStatus]"
    :width="520"
    centered
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
    :maskClosable="false"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="用户名">
          <a-input placeholder="请输入用户名" v-decorator="['username', validatorRules.must]" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="真实姓名">
          <a-input placeholder="请输入真实姓名" v-decorator="['name', validatorRules.must]" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="手机号码">
          <a-input
            maxlength="11"
            placeholder="请输入手机号码"
            v-decorator="['phone', validatorRules.phone]"
          />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="所属机构">
          <a-tree-select
            allowClear
            :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
            :treeData="orgList"
            placeholder="请选择"
            treeDefaultExpandAll
            v-decorator="['orgId', {rules: [{required: true, message: '此字段为必填'}]}]"
          ></a-tree-select>
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="所属角色">
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
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="备注">
          <a-textarea :rows="3" v-decorator="['remark']" placeholder="..." />
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
  name: 'userModel',
  mixins: [modalMixin],
  data() {
    return {
      Urls: {
        addUrl: '/auth/api/user/insert',
        editUrl: '/auth/api/user/update/',
        getByIdUrl: '/auth/api/user/get/',
        roleListurl: '/auth/api/role/list',
        orgListurl: '/auth/api/org/tree'
      },
      textMap: {
        add: '新增用户',
        edit: '编辑用户'
      },
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 }
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
      orgList: []
    }
  },
  created() {},
  methods: {
    beforeOpen() {
      this.getRoleList()
      this.getOrgList()
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
        let resData = res.data.records
        this.orgList = resData.map(item => this.mapTree(item))
      })
    },

    setForm(data) {
      this.$nextTick(() => {
        this.form.setFieldsValue(pick(data, 'name', 'phone', 'orgId', 'roleId', 'remark'))
      })
    }
  }
}
</script>

<style scoped>
</style>