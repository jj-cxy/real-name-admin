<template>
  <a-modal
    title="修改项目状态"
    :width="500"
    centered
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
    :maskClosable="false"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="项目状态">
          <a-radio-group v-decorator="['projectStatus', validatorRules.must]">
            <a-radio-button
              v-for="(item,index) in projectStatusList"
              :key="index"
              :value="item.key"
            >{{item.name}}</a-radio-button>
          </a-radio-group>
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import { axios } from '@/utils/request'
import modalMixin from '@/components/Mixins/modal'
import pick from 'lodash.pick'

export default {
  name: 'UserModel',
  mixins: [modalMixin],
  data() {
    return {
      Urls: {
        editUrl: '/ida/api/project/update/'
      },
      textMap: {
        add: '新增',
        edit: '编辑'
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
        must: {
          rules: [{ required: true, message: '此字段为必填!' }]
        }
      },
      projectStatusList: []
    }
  },
  created() {},
  methods: {
    beforeOpen(record) {
      this.getDictData('project_status', 'projectStatusList')
    },
    setForm(data) {
      this.model = data
      this.$nextTick(() => {
        this.form.setFieldsValue(pick(data, 'projectStatus'))
      })
    },
    beforeSubmit(form) {
      this.projectStatusList.map((item, index) => {
        if (item.key == form.projectStatus) {
          form.projectStatusDesc = item.name
        }
      })
      return form
    }
  }
}
</script>

<style scoped>
</style>