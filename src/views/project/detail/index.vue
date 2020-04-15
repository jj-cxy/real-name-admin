<template>
  <a-card :body-style="{padding: '24px'}" :bordered="false">
    <a-tabs :activeKey="activeKey" class="card-tabs" size="small" @change="handleTabChange">
      <a-tab-pane tab="项目信息" key="1">
        <info-tab ref="infoTab"></info-tab>
      </a-tab-pane>
      <a-tab-pane tab="五方主体" key="2" forceRender>
        <tab-one v-if="activeKey==2" :list="model.five"></tab-one>
      </a-tab-pane>
      <a-tab-pane tab="分包信息" key="3">
        <tab-two v-if="activeKey==3" :list="model.sub"></tab-two>
      </a-tab-pane>
      <a-tab-pane tab="班组信息" key="4">Content of Tab Pane 3</a-tab-pane>
      <a-tab-pane tab="管理人员" key="5">Content of Tab Pane 3</a-tab-pane>
      <a-tab-pane tab="劳务人员" key="6">Content of Tab Pane 3</a-tab-pane>
      <a-tab-pane tab="其他人员" key="7">Content of Tab Pane 3</a-tab-pane>
      <a-tab-pane tab="人员考勤" key="8">Content of Tab Pane 3</a-tab-pane>
      <a-tab-pane tab="工资发放" key="9">Content of Tab Pane 3</a-tab-pane>
    </a-tabs>
  </a-card>
</template>

<script>
import modalMixin from '@/components/Mixins/modal'
import indexMixin from './modules/index'
import viewer from '@/views/modules/viewer'
import InfoTab from './modules/InfoTab/index'
import TabOne from './modules/TabOne/index'
import TabTwo from './modules/TabTwo/index'

export default {
  name: 'ProjectDetail',
  mixins: [modalMixin, indexMixin],
  components: {
    viewer,
    InfoTab,
    TabOne,
    TabTwo
  }
}
</script>
