<template>
  <a-modal
    title="添加人员"
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
        <a-form-item
          style="margin-bottom:5px"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="职务名称"
        >
          <span>{{model.name}}</span>
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="添加成员">
          <a-select
            showSearch
            mode="multiple"
            optionFilterProp="children"
            v-decorator="['ids', validatorRules.must]"
            placeholder="请选择"
          >
            <a-select-option
              v-for="(item,index) in userList"
              :key="index"
              :value="item.id"
            >{{item.name}}</a-select-option>
          </a-select>
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
  name: 'addUserModel',
  mixins: [modalMixin],
  data() {
    return {
      Urls: {
        editUrl: '/auth/api/role/addUser/',
        userListurl: '/auth/api/user/unAssigningUsers'
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
        must: { rules: [{ required: true, message: '此字段为必填!' }] }
      },
      userList: [],
      tips: {
        edit: '成功添加人员'
      }
    }
  },
  created() {},
  methods: {
    beforeOpen() {
      this.getUserList()
    },

    getUserList() {
      axios({
        url: this.Urls.userListurl,
        method: 'get'
      }).then(res => {
        if (res.code == 0) {
          this.userList = res.data.records
        } else {
          this.$notification.error({
            message: res.msg
          })
        }
      })
    }
  }
}
</script>

<style scoped>
</style>