<template>
  <div class="page-header-index-wide">
    <a-row :gutter="24">
      <a-col :xl="8" :lg="12" :md="24" :sm="24">
        <a-card
          :loading="loading"
          :bordered="false"
          title="本区数据概况"
          class="card-chart data-statis"
          :bodyStyle="{padding: 0}"
        >
          <ul class="data-statis-top">
            <li>
              <span class="ico">
                <i class="iconfont">&#xe613;</i>
              </span>
              <h1 class="num">{{projectCount.total}}</h1>
              <span class="tit">项目总数（个）</span>
            </li>
            <a-divider type="vertical" style="height: 30px" />
            <li>
              <span class="ico">
                <i class="iconfont">&#xe62a;</i>
              </span>
              <h1 class="num">{{projectCount.construct}}</h1>
              <span class="tit">在建项目（个）</span>
            </li>
            <a-divider type="vertical" style="height: 30px" />
            <li>
              <span class="ico">
                <i class="iconfont">&#xe688;</i>
              </span>
              <h1 class="num">{{projectCount.complete}}</h1>
              <span class="tit">竣工项目（个）</span>
            </li>
          </ul>
          <ul class="data-statis-top">
            <li>
              <h1 class="num">
                <a-statistic :value="personCount.total" :valueStyle="{ color: '#1890FF' }" />
              </h1>
              <span class="tit">从业总人数（人）</span>
            </li>
            <a-divider type="vertical" style="height: 30px" />
            <li>
              <h1 class="num">
                <a-statistic :value="personCount.manager" :valueStyle="{ color: '#1890FF' }" />
              </h1>
              <span class="tit">管理人员（人）</span>
            </li>
            <a-divider type="vertical" style="height: 30px" />
            <li>
              <h1 class="num">
                <a-statistic :value="personCount.worker" :valueStyle="{ color: '#1890FF' }" />
              </h1>
              <span class="tit">劳务人员（人）</span>
            </li>
          </ul>
          <ul class="data-statis-top">
            <li>
              <h1 class="num">
                <a-statistic :value="punchCount.in" :valueStyle="{ color: '#1890FF' }" />
              </h1>
              <span class="tit">今日入场（人）</span>
            </li>
            <a-divider type="vertical" style="height: 30px" />
            <li>
              <h1 class="num">
                <a-statistic :value="punchCount.out" :valueStyle="{ color: '#1890FF' }" />
              </h1>
              <span class="tit">今日出场（人）</span>
            </li>
            <a-divider type="vertical" style="height: 30px" />
            <li>
              <h1 class="num">
                <a-statistic :value="punchCount.today" :valueStyle="{ color: '#1890FF' }" />
              </h1>
              <span class="tit">今日在场（人）</span>
            </li>
          </ul>
          <a-row :gutter="12" class="data-statis-bot">
            <a-col :xl="12" :lg="24" :sm="24">
              <div class="item">
                <div class="tit">持证管理人员</div>
                <div class="num">
                  {{qaCount.handleManager}}
                  <span class="unit">人</span>
                  <span class="per">占</span>
                  {{qaCount.handleManager | percentFilter(personCount.manager)}}
                  <span
                    class="unit"
                  >%</span>
                </div>
              </div>
            </a-col>
            <a-col :xl="12" :lg="24" :sm="24">
              <div class="item">
                <div class="tit">无证管理人员</div>
                <div class="num" style="color: red">
                  {{qaCount.noHandleManager}}
                  <span class="unit">人</span>
                  <span class="per">占</span>
                  {{qaCount.noHandleManager | percentFilter(personCount.manager)}}
                  <span
                    class="unit"
                  >%</span>
                </div>
              </div>
            </a-col>
            <a-col :xl="12" :lg="24" :sm="24">
              <div class="item">
                <div class="tit">持证劳务人员</div>
                <div class="num">
                  {{qaCount.handleWorker}}
                  <span class="unit">人</span>
                  <span class="per">占</span>
                  {{qaCount.handleWorker | percentFilter(personCount.worker)}}
                  <span
                    class="unit"
                  >%</span>
                </div>
              </div>
            </a-col>
            <a-col :xl="12" :lg="24" :sm="24">
              <div class="item">
                <div class="tit">无证劳务人员</div>
                <div class="num" style="color: red">
                  {{qaCount.noHandleWorker}}
                  <span class="unit">人</span>
                  <span class="per">占</span>
                  {{qaCount.noHandleWorker | percentFilter(personCount.worker)}}
                  <span
                    class="unit"
                  >%</span>
                </div>
              </div>
            </a-col>
          </a-row>
        </a-card>
      </a-col>

      <a-col :xl="8" :lg="12" :md="24" :sm="24">
        <a-card
          :loading="loading"
          :bordered="false"
          title="项目类型分布"
          class="card-chart"
          :bodyStyle="{padding: 0}"
        >
          <ProjectType :chart-data="projectTypeList" />
        </a-card>
      </a-col>

      <a-col :xl="8" :lg="12" :md="24" :sm="24">
        <a-card
          :loading="loading"
          :bordered="false"
          title="预警情况"
          class="card-chart"
          :bodyStyle="{padding: '12px', height: '390px', 'overflow-y':'auto'}"
        >
          <span slot="extra">
            当前预警总数：
            <b style="color: red; font-size: 16px">{{warnTotal}}</b>
          </span>
          <a-table
            :columns="warnColumns"
            :dataSource="warnData"
            bordered
            :rowKey="(text,index)=>index"
            :pagination="false"
            size="small"
          >
            <span slot="today" slot-scope="text, record">
              <a href="javascript:;" @click="handleWarnModal(record,'最新预警',text)">{{text}}</a>
            </span>
            <span slot="delay" slot-scope="text, record">
              <a href="javascript:;" @click="handleWarnModal(record,'超期预警',text)">{{text}}</a>
            </span>
            <span slot="all" slot-scope="text, record">
              <a href="javascript:;" @click="handleWarnModal(record,'预警总计',text)">{{text}}</a>
            </span>
          </a-table>
        </a-card>
      </a-col>
    </a-row>
    <a-row :gutter="24">
      <a-col :xl="8" :lg="24" :md="24" :sm="24">
        <!-- 工种占比 -->
        <a-card
          :loading="loading"
          :bordered="false"
          title="工种占比情况"
          class="card-chart"
          :bodyStyle="{padding: 0}"
          style="margin-top: 24px"
        >
          <WorkTypeRadio :chart-data="workerTypeList" v-if="workerTypeShow" />
        </a-card>
        <!-- 手续办理情况 -->
        <a-card
          :loading="loading"
          :bordered="false"
          title="手续办理情况"
          class="card-chart"
          :bodyStyle="{padding: '0'}"
          style="margin-top: 24px"
        >
          <HoldLeft :chart-data="handleData" />
          <HoldRight :chart-data="nohandleData" />
        </a-card>
      </a-col>
      <a-col :xl="8" :lg="24" :md="24" :sm="24">
        <a-card
          :loading="loading"
          :bordered="false"
          title="项目进度分布"
          class="card-chart"
          :bodyStyle="{padding: '0',}"
          style="margin-top: 24px"
        >
          <ProjectPace :chart-data="projectPaceList" />
        </a-card>
      </a-col>
      <a-col :xl="8" :lg="24" :md="24" :sm="24">
        <!-- 保障履约 -->
        <a-card
          :loading="loading"
          :bordered="false"
          title="保障履约"
          class="card-chart"
          :bodyStyle="{padding: '12px'}"
          style="margin-top: 24px"
        >
          <a-table
            :columns="contractColumns"
            :dataSource="contractData"
            bordered
            :rowKey="(text,index)=>index"
            :pagination="false"
            size="small"
          ></a-table>
          <a-table
            :columns="wagesColumns"
            :dataSource="wagesData"
            bordered
            :rowKey="(text,index)=>index"
            :pagination="false"
            size="small"
            style="margin-top: 12px"
          ></a-table>
        </a-card>
      </a-col>
    </a-row>
    <a-drawer
      width="640"
      :title="warnTitle"
      placement="right"
      :maskClosable="false"
      :mask="false"
      @close="onWarnClose"
      :visible="warnVisible"
    >
      <a-descriptions :column="2" v-for="item in warnModal" :key="item.id">
        <a-descriptions-item label="项目名称" span="2">{{item.projectName}}</a-descriptions-item>
        <a-descriptions-item label="预警类型">{{item.warningTypeDesc}}</a-descriptions-item>
        <a-descriptions-item label="预警时间">{{item.createTime}}</a-descriptions-item>
        <a-descriptions-item label="预警说明" span="2">{{item.warningContent}}</a-descriptions-item>
        <a-descriptions-item label="预警原因" span="2" style="color: red">{{item.warningReason}}</a-descriptions-item>
        <a-descriptions-item label="管理机构">{{item.managerOrgName}}</a-descriptions-item>
        <a-descriptions-item label="监督员">{{item.personName}}</a-descriptions-item>
        <a-divider />
      </a-descriptions>
    </a-drawer>
  </div>
</template>

<script>
import baseMixin from '@/components/Mixins/base'
import indexMixin from './modules/index'

import ProjectType from './components/ProjectType'
import ProjectPace from './components/ProjectPace'
import ProjectRadio from './components/ProjectRadio'

import WorkTypeRadio from './components/WorkTypeRadio'

import HoldLeft from './components/HoldLeft'
import HoldRight from './components/HoldRight'

import { mixinDevice } from '@/utils/mixin'

export default {
  name: 'userList',
  mixins: [baseMixin, indexMixin, mixinDevice],
  components: {
    ProjectType,
    ProjectPace,
    ProjectRadio,

    WorkTypeRadio,
    HoldLeft,
    HoldRight
  }
}
</script>
