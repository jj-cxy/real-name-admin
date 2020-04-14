<template>
  <a-card :body-style="{padding: '24px'}" :bordered="false">
    <a-tabs defaultActiveKey="1" class="card-tabs" size="small">
      <a-tab-pane tab="项目信息" key="1">
        <info-tab ref="infoTab"></info-tab>
      </a-tab-pane>
      <a-tab-pane tab="五方主体" key="2" forceRender>
        <tab-one></tab-one>
      </a-tab-pane>
      <a-tab-pane tab="分包信息" key="3">Content of Tab Pane 3</a-tab-pane>
    </a-tabs>
  </a-card>
</template>

<script>
import modalMixin from '@/components/Mixins/modal'
import indexMixin from './modules/index'
import viewer from '@/views/modules/viewer'
import InfoTab from './modules/InfoTab/index'
import TabOne from './modules/TabOne/index'

export default {
  name: 'ProjectDetail',
  mixins: [modalMixin, indexMixin],
  components: {
    viewer,
    InfoTab,
    TabOne
  }
}
</script>
