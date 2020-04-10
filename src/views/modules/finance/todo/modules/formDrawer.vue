<template>
  <a-drawer
    title="详情"
    :maskClosable="true"
    :width="960"
    placement="right"
    :closable="true"
    @close="visible=false"
    :visible="visible"
    class="detail-form"
    style="height: calc(100% - 55px);overflow: auto;padding-bottom: 53px;"
  >
    <a-spin :spinning="confirmLoading">
      <a-form class="detail-form" :form="form">
        <project-info @close="visible=false" :mdl="model"></project-info>
        <a-card title="财务信息" style="margin-top: 24px">
          <a-row :gutter="12">
            <a-col :sm="24" :md="12">
              <a-form-item label="工单类型" :labelCol="labelMinCol" :wrapperCol="wrapperMInCol">
                <span>{{mdl.taskTypeDesc}}</span>
              </a-form-item>
            </a-col>
            <a-col :sm="24" :md="12">
              <a-form-item label="涉及金额" :labelCol="labelMinCol" :wrapperCol="wrapperMInCol">
                <span>{{mdl.amount || '-'}}元</span>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="12">
            <a-col :sm="24" :md="12">
              <a-form-item label="缴费方" :labelCol="labelMinCol" :wrapperCol="wrapperMInCol">
                <span>{{mdl.userName || '-'}}</span>
              </a-form-item>
            </a-col>
          </a-row>
        </a-card>
      </a-form>
    </a-spin>
  </a-drawer>
</template>

<script>
import pick from 'lodash.pick'
import modalMixin from '@/components/Mixins/modal'
import ProjectInfo from '@/views/modules/ProjectInfo'
import { axios } from '@/utils/request'

export default {
  name: 'formDrawer',
  mixins: [modalMixin],
  components: {
    ProjectInfo
  },
  data() {
    return {
      text: '你确定要审核通过么？',
      Urls: {
        getByIdUrl: '/biz/oaProject/get/'
      },
      mdl: {}
    }
  },
  computed: {},
  methods: {
    beforeOpen(record) {
      this.mdl = record
    },
    setForm(data) {
      this.model = data
    },
    fillForm(record) {
      this.confirmLoading = true
      axios({
        url: this.Urls.getByIdUrl + record.projectNo,
        method: 'get'
      })
        .then(res => {
          if (res.code == 0) {
            this.setForm(res.data)
          } else {
            this.$notification.error({
              message: res.msg
            })
          }
        })
        .finally(() => {
          this.confirmLoading = false
        })
    }
  }
}
</script>

<style scoped>
</style>