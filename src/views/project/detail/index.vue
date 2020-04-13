<template>
  <a-card :body-style="{padding: '24px'}" :bordered="false">
    <a-tabs defaultActiveKey="1" class="card-tabs" size="small">
      <a-tab-pane tab="项目信息" key="1">
        <base-one></base-one>
      </a-tab-pane>
      <a-tab-pane tab="五方主体" key="2" forceRender>
        <base-two></base-two>
      </a-tab-pane>
      <a-tab-pane tab="分包信息" key="3">Content of Tab Pane 3</a-tab-pane>
    </a-tabs>
  </a-card>
</template>

<script>
import modalMixin from '@/components/Mixins/modal'
import indexMixin from './modules/index'
import viewer from '@/views/modules/viewer'
import BaseOne from './modules/BaseOne/index'
import BaseTwo from './modules/BaseTwo/index'

export default {
  name: 'ProjectDetail',
  mixins: [modalMixin, indexMixin],
  components: {
    viewer,
    BaseOne,
    BaseTwo
  }
}
</script>
