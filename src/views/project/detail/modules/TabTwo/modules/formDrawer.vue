<template>
  <a-drawer
    title="详情"
    :maskClosable="true"
    :width="720"
    placement="right"
    :closable="true"
    @close="visible=false"
    :visible="visible"
    style="height: calc(100% - 55px);overflow: auto;padding-bottom: 53px;"
  >
    <a-spin :spinning="confirmLoading">
      <a-form class="detail-form" :form="form">
        <a-form-item label="资产名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <span>{{model.name}}</span>
        </a-form-item>
        <a-form-item label="资产地址" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <span>{{model.province}} {{model.city}} {{model.district}} {{model.address}}</span>
        </a-form-item>
        <a-form-item label="所属单位" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <span>{{model.userName}}</span>
        </a-form-item>
        <a-row :gutter="12">
          <a-col :sm="24" :md="12">
            <a-form-item label="资产类型" :labelCol="labelMinCol" :wrapperCol="wrapperMInCol">
              <span>{{model.assetsType}}</span>
            </a-form-item>
          </a-col>
          <a-col :sm="24" :md="12">
            <a-form-item label="资产状态" :labelCol="labelMinCol" :wrapperCol="wrapperMInCol">
              <span>{{model.assetsStatusDesc}}</span>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="12">
          <a-col :sm="24" :md="12">
            <a-form-item label="租赁到期时间" :labelCol="labelMinCol" :wrapperCol="wrapperMInCol">
              <span>{{model.leaseExpirationTime}}</span>
            </a-form-item>
          </a-col>
          <a-col :sm="24" :md="12">
            <a-form-item label="总面积" :labelCol="labelMinCol" :wrapperCol="wrapperMInCol">
              <span>{{model.totalArea}}</span>㎡
            </a-form-item>
          </a-col>
        </a-row>
        <a-form-item label="资产权属证明文件" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <viewer v-if="model.ownership" :ids="model.ownership"></viewer>
        </a-form-item>
        <a-form-item label="附件" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <viewer v-if="model.attachments" :ids="model.attachments"></viewer>
        </a-form-item>
      </a-form>
    </a-spin>
  </a-drawer>
</template>

<script>
import pick from 'lodash.pick'
import modalMixin from '@/components/Mixins/modal'
import Viewer from '@/views/modules/Viewer'

export default {
  name: 'assetsDetail',
  mixins: [modalMixin],
  components: {
    Viewer
  },
  data() {
    return {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 19 }
      },
      labelMinCol: {
        xs: { span: 24 },
        sm: { span: 10 }
      },
      wrapperMInCol: {
        xs: { span: 24 },
        sm: { span: 14 }
      },
      Urls: {
        getByIdUrl: '/biz/oaAssets/get/'
      },
      ownershipList: [],
      attachFileList: []
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