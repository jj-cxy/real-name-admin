<template>
  <a-drawer
    title="详情"
    :maskClosable="true"
    :width="900"
    placement="right"
    :closable="true"
    @close="visible=false"
    :visible="visible"
    class="detail-form"
    style="height: calc(100% - 55px);overflow: auto;padding-bottom: 53px;"
  >
    <a-spin :spinning="confirmLoading">
      <a-form class="detail-form" :form="form">
        <project-info @close="visible=false" :mdl="projectModel"></project-info>
        <a-card title="收费信息" style="margin-top: 24px">
          <a-row :gutter="12">
            <a-col :sm="24" :md="12">
              <a-form-item
                label="收费类型"
                :labelCol="labelMinCol"
                :wrapperCol="wrapperMInCol"
              >{{model.typeDesc}}</a-form-item>
            </a-col>
            <a-col :sm="24" :md="12">
              <a-form-item
                label="缴费方"
                :labelCol="labelMinCol"
                :wrapperCol="wrapperMInCol"
              >{{model.userName}}</a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="12">
            <a-col :sm="24" :md="12">
              <a-form-item
                label="收费金额"
                :labelCol="labelMinCol"
                :wrapperCol="wrapperMInCol"
              >{{model.amount}}元</a-form-item>
            </a-col>
            <a-col :sm="24" :md="12">
              <a-form-item
                label="缴费情况"
                :labelCol="labelMinCol"
                :wrapperCol="wrapperMInCol"
              >{{model.payStatusDesc}}</a-form-item>
            </a-col>
          </a-row>
          <a-form-item label="收费说明" :labelCol="labelCol" :wrapperCol="wrapperCol">{{model.remark}}</a-form-item>
        </a-card>
      </a-form>
    </a-spin>
  </a-drawer>
</template>

<script>
import pick from 'lodash.pick'
import modalMixin from '@/components/Mixins/modal'
import ProjectInfo from '@/views/modules/ProjectInfo'

export default {
  name: 'formDrawer',
  mixins: [modalMixin],
  components: {
    ProjectInfo
  },
  data() {
    return {
      Urls: {
        getByIdUrl: '/biz/oaCharges/get/'
      }
    }
  },
  computed: {},
  methods: {
    beforeOpen(record) {
      this.getProjectInfo(record.projectId)
    },
    setForm(data) {
      this.model = data
    }
  }
}
</script>

<style scoped>
</style>