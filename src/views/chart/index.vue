<template>
  <div class="page-header-index-wide">
    <a-row :gutter="24">
      <a-col :xl="8" :lg="12" :md="24" :sm="24">
        <a-card
          :loading="loading"
          :bordered="false"
          title="本市数据概况"
          class="card-chart data-statis"
          :bodyStyle="{padding: 0}"
        >
          <ul class="data-statis-top">
            <li>
              <span class="ico">
                <i class="iconfont">&#xe613;</i>
              </span>
              <h1 class="num">376</h1>
              <span class="tit">项目总数（个）</span>
            </li>
            <a-divider type="vertical" style="height: 30px" />
            <li>
              <span class="ico">
                <i class="iconfont">&#xe62a;</i>
              </span>
              <h1 class="num">376</h1>
              <span class="tit">在建项目（个）</span>
            </li>
            <a-divider type="vertical" style="height: 30px" />
            <li>
              <span class="ico">
                <i class="iconfont">&#xe688;</i>
              </span>
              <h1 class="num">376</h1>
              <span class="tit">竣工项目（个）</span>
            </li>
          </ul>
          <ul class="data-statis-top">
            <li>
              <h1 class="num">1100</h1>
              <span class="tit">从业总人数（人）</span>
            </li>
            <a-divider type="vertical" style="height: 30px" />
            <li>
              <h1 class="num">100</h1>
              <span class="tit">管理人员（人）</span>
            </li>
            <a-divider type="vertical" style="height: 30px" />
            <li>
              <h1 class="num">2000</h1>
              <span class="tit">劳务人员（人）</span>
            </li>
          </ul>
          <ul class="data-statis-top">
            <li>
              <h1 class="num">1100</h1>
              <span class="tit">今日入场（人）</span>
            </li>
            <a-divider type="vertical" style="height: 30px" />
            <li>
              <h1 class="num">100</h1>
              <span class="tit">今日出场（人）</span>
            </li>
            <a-divider type="vertical" style="height: 30px" />
            <li>
              <h1 class="num">2000</h1>
              <span class="tit">今日在场（人）</span>
            </li>
          </ul>
          <a-row :gutter="12" class="data-statis-bot">
            <a-col :xl="12" :lg="24" :sm="24">
              <div class="item">
                <div class="tit">持证管理人员</div>
                <div class="num">
                  600
                  <span class="unit">人</span>
                  <span class="per">占</span>60
                  <span class="unit">%</span>
                </div>
              </div>
            </a-col>
            <a-col :xl="12" :lg="24" :sm="24">
              <div class="item">
                <div class="tit">无证管理人员</div>
                <div class="num" style="color: red">
                  60
                  <span class="unit">人</span>
                  <span class="per">占</span>60
                  <span class="unit">%</span>
                </div>
              </div>
            </a-col>
            <a-col :xl="12" :lg="24" :sm="24">
              <div class="item">
                <div class="tit">持证劳务人员</div>
                <div class="num">
                  60
                  <span class="unit">人</span>
                  <span class="per">占</span>60
                  <span class="unit">%</span>
                </div>
              </div>
            </a-col>
            <a-col :xl="12" :lg="24" :sm="24">
              <div class="item">
                <div class="tit">无证劳务人员</div>
                <div class="num" style="color: red">
                  600
                  <span class="unit">人</span>
                  <span class="per">占</span>60
                  <span class="unit">%</span>
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
          title="各区项目占比"
          class="card-chart"
          :bodyStyle="{padding: 0}"
        >
          <ProjectRadio :chartData="projectRadioList" />
        </a-card>
      </a-col>
    </a-row>
    <a-row :gutter="24">
      <a-col :xl="8" :lg="24" :md="24" :sm="24">
        <!-- 从业人员、流出情况 -->
        <a-card
          :loading="loading"
          :bordered="false"
          title="本市从业人员新增、流出情况统计"
          class="card-chart"
          :bodyStyle="{padding: '24px 0'}"
          style="margin-top: 24px"
        >
          <OutRadio :chartData="inOutRadioList" />
          <OutNum style="margin-top: 48px" />
        </a-card>
      </a-col>
      <a-col :xl="8" :lg="24" :md="24" :sm="24">
        <a-card
          :loading="loading"
          :bordered="false"
          title="项目进度分布"
          class="card-chart"
          :bodyStyle="{padding: '24px 0'}"
          style="margin-top: 24px"
        >
          <ProjectPace />
        </a-card>
      </a-col>
      <a-col :xl="8" :lg="12" :md="24" :sm="24">
        <a-card
          :loading="loading"
          :bordered="false"
          title="各区预警情况"
          class="card-chart"
          :bodyStyle="{padding: '12px', height: '615px', 'overflow-y':'auto'}"
          style="margin-top: 24px"
        >
          <span slot="extra">
            当前预警总数：
            <b style="color: red; font-size: 16px">9</b>
          </span>
          <a-table
            :columns="warnColumns"
            :dataSource="warnData"
            bordered
            :rowKey="(text,index)=>index"
            :pagination="false"
            size="small"
          ></a-table>
        </a-card>
      </a-col>
    </a-row>
    <a-row :gutter="24">
      <a-col :xl="8" :lg="24" :md="24" :sm="24">
        <!-- 企业类型分布 -->
        <a-card
          :loading="loading"
          :bordered="false"
          title="企业类型分布"
          class="card-chart"
          :bodyStyle="{padding: '24px 0'}"
          style="margin-top: 24px"
        >
          <UnitType />
        </a-card>
      </a-col>
      <a-col :xl="16" :lg="24" :md="24" :sm="24">
        <!-- 各区监督站得分排名 -->
        <a-card
          :loading="loading"
          :bordered="false"
          title="各区监督站得分排名"
          class="card-chart"
          :bodyStyle="{padding: '24px 0'}"
          style="margin-top: 24px"
        >
          <ScoreRank />
        </a-card>
      </a-col>
    </a-row>
    <a-row :gutter="24">
      <a-col :xl="8" :lg="24" :md="24" :sm="24">
        <!-- 工种占比 -->
        <a-card
          :loading="loading"
          :bordered="false"
          title="工种占比"
          class="card-chart"
          :bodyStyle="{padding: 0}"
          style="margin-top: 24px"
        >
          <WorkTypeRadio />
        </a-card>
      </a-col>
      <a-col :xl="8" :lg="24" :md="24" :sm="24">
        <!-- 手续办理情况 -->
        <a-card
          :loading="loading"
          :bordered="false"
          title="手续办理情况"
          class="card-chart"
          :bodyStyle="{padding: '0'}"
          style="margin-top: 24px"
        >
          <HoldLeft />
          <HoldRight />
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
  </div>
</template>

<script>
import baseMixin from '@/components/Mixins/base'
import indexMixin from './modules/index'

import ProjectType from './components/ProjectType'
import ProjectPace from './components/ProjectPace'
// 流出人口
import OutRadio from './components/OutRadio'
import OutNum from './components/OutNum'

import UnitType from './components/UnitType'
import ProjectRadio from './components/ProjectRadio'
import ScoreRank from './components/ScoreRank'

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
    OutRadio,
    OutNum,
    UnitType,
    ProjectRadio,
    ScoreRank,
    WorkTypeRadio,

    HoldLeft,
    HoldRight
  }
}
</script>
