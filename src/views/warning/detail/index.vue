<template>
  <a-card
    :body-style="{'padding': '12px 24px 24px'}"
    :bordered="false"
    :headStyle="{'textAlign':'center'}"
  >
    <a-form :form="form" class="detail-form">
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="预警类型">
        <span>{{model.warningTypeDesc}}——{{model.warningContent}}</span>
        <p v-if="model.heartbeatDiff">{{model.heartbeatDiff}}</p>
      </a-form-item>
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="异常原因">
        <span style="color: #ff4d4f">{{model.warningReason}}</span>
      </a-form-item>
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="项目名称">
        <span>{{model.projectName}}</span>
      </a-form-item>
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="施工单位">
        <span>{{model.enterpriseName}}</span>
      </a-form-item>
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="项目经理">
        <span>{{model.projectManagerName}}</span>
      </a-form-item>
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="手机号">
        <span>{{model.projectPhone}}</span>
      </a-form-item>
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="项目地址">
        <span>{{model.province}}{{model.city}}{{model.district}}{{model.address}}</span>
      </a-form-item>
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="具体定位地址">
        <div class="map-box">
          <div id="allmap"></div>
        </div>
      </a-form-item>
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="前端软件公司">
        <span>{{model.softNames}}</span>
      </a-form-item>
      <a-form-item style="text-align: center; margin-top: 24px">
        <a-button @click.prevent="$router.go(-1)">已知晓</a-button>
      </a-form-item>
    </a-form>
  </a-card>
</template>

<script>
import modalMixin from '@/components/Mixins/modal'
import indexMixin from './modules/index'
import Viewer from '@/views/modules/Viewer'

export default {
  name: 'EnterpriseAudit',
  mixins: [modalMixin, indexMixin],
  components: {
    Viewer
  }
}
</script>
