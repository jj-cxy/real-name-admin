<template>
  <a-drawer
    title="详情"
    :maskClosable="true"
    :width="700"
    placement="right"
    :closable="true"
    @close="visible=false"
    :visible="visible"
    style="height: calc(100% - 55px);overflow: auto;padding-bottom: 53px;"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form" class="detail-form">
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="模板名称">
          <span>{{model.name}}</span>
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="协议内容">
          <span v-html="model.content"></span>
        </a-form-item>
      </a-form>
    </a-spin>
  </a-drawer>
</template>

<script>
import pick from 'lodash.pick'
import modalMixin from '@/components/Mixins/modal'

export default {
  name: 'formDrawer',
  mixins: [modalMixin],
  data() {
    return {
      Urls: { getByIdUrl: '/biz/oaAgreement/get/' }
    }
  },
  computed: {},
  methods: {
    setForm(data) {
      this.model = data
    }
  }
}
</script>

<style scoped>
</style>