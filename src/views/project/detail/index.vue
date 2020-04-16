<template>
  <a-card :body-style="{padding: '24px'}" :bordered="false">
    <a-tabs
      v-if="tabShow"
      :activeKey="activeKey"
      class="card-tabs"
      size="small"
      @change="handleTabChange"
    >
      <a-tab-pane key="1">
        <span slot="tab">
          <a-icon type="project" />项目信息
        </span>
        <info-tab :data="model"></info-tab>
      </a-tab-pane>
      <a-tab-pane key="2" forceRender>
        <span slot="tab">
          <a-icon type="home" />五方主体
        </span>
        <tab-one v-if="activeKey==2" :list="model.five"></tab-one>
      </a-tab-pane>
      <a-tab-pane key="3">
        <span slot="tab">
          <a-icon type="hdd" />分包信息
        </span>
        <tab-two v-if="activeKey==3" :list="model.sub"></tab-two>
      </a-tab-pane>
      <a-tab-pane key="4">
        <span slot="tab">
          <a-icon type="team" />班组信息
        </span>
        Content of Tab Pane 3
      </a-tab-pane>
      <a-tab-pane key="5">
        <span slot="tab">
          <a-icon type="cluster" />管理人员
        </span>
        Content of Tab Pane 3
      </a-tab-pane>
      <a-tab-pane key="6">
        <span slot="tab">
          <a-icon type="user" />劳务人员
        </span>
        Content of Tab Pane 3
      </a-tab-pane>
      <a-tab-pane key="7">
        <span slot="tab">
          <a-icon type="solution" />其他人员
        </span>
        Content of Tab Pane 3
      </a-tab-pane>
      <a-tab-pane key="8">
        <span slot="tab">
          <a-icon type="robot" />人员考勤
        </span>
        Content of Tab Pane 3
      </a-tab-pane>
      <a-tab-pane key="9">
        <span slot="tab">
          <a-icon type="money-collect" />工资发放
        </span>
        Content of Tab Pane 3
      </a-tab-pane>
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
