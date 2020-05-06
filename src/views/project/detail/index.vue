<template>
  <a-card :body-style="{padding: '24px'}" :bordered="false">
    <a-tabs
      v-if="tabShow"
      :activeKey="activeKey"
      class="card-tabs"
      size="small"
      @change="handleTabChange"
    >
      <a-tab-pane key="0">
        <span slot="tab">
          <a-icon type="project" />项目信息
        </span>
        <info-tab :data="model"></info-tab>
      </a-tab-pane>
      <a-tab-pane key="1" forceRender>
        <span slot="tab">
          <a-icon type="home" />五方主体
        </span>
        <tab-one v-if="activeKey==1" :list="model.five"></tab-one>
      </a-tab-pane>
      <a-tab-pane key="2">
        <span slot="tab">
          <a-icon type="hdd" />分包信息
        </span>
        <tab-two v-if="activeKey==2" :list="model.sub"></tab-two>
      </a-tab-pane>
      <a-tab-pane key="3">
        <span slot="tab">
          <a-icon type="team" />班组信息
        </span>
        <TabThree v-if="activeKey==3" :projectId="model.id" />
      </a-tab-pane>
      <a-tab-pane key="4">
        <span slot="tab">
          <a-icon type="cluster" />管理人员
        </span>
        <tab-four v-if="activeKey==4" :projectId="model.id"></tab-four>
      </a-tab-pane>
      <a-tab-pane key="5">
        <span slot="tab">
          <a-icon type="user" />劳务人员
        </span>
        <TabFive v-if="activeKey==5" :projectId="model.id" />
      </a-tab-pane>
      <a-tab-pane key="6">
        <span slot="tab">
          <a-icon type="robot" />人员考勤
        </span>
        <TabSix v-if="activeKey==6" :projectId="model.id" />
      </a-tab-pane>
      <a-tab-pane key="7">
        <span slot="tab">
          <a-icon type="money-collect" />工资发放
        </span>
        <TabSeven v-if="activeKey==7" :projectId="model.id" />
      </a-tab-pane>
      <a-tab-pane key="8">
        <span slot="tab">
          <a-icon type="money-collect" />劳动维权告示牌
        </span>
        <TabEight v-if="activeKey==8" :projectId="model.id" />
      </a-tab-pane>
    </a-tabs>
  </a-card>
</template>

<script>
import modalMixin from '@/components/Mixins/modal'
import indexMixin from './modules/index'
import Viewer from '@/views/modules/Viewer'
import InfoTab from './modules/InfoTab/index'
import TabOne from './modules/TabOne/index'
import TabTwo from './modules/TabTwo/index'
import TabThree from './modules/TabThree/index'

import TabFour from './modules/TabFour/index'
import TabFive from './modules/TabFive/index'
import TabSix from './modules/TabSix/index'
import TabSeven from './modules/TabSeven/index'
import TabEight from './modules/TabEight/index'

export default {
  name: 'ProjectDetail',
  mixins: [modalMixin, indexMixin],
  components: {
    Viewer,
    InfoTab,
    TabOne,
    TabTwo,
    TabThree,
    TabFour,
    TabFive,
    TabSix,
    TabSeven,
    TabEight
  }
}
</script>
