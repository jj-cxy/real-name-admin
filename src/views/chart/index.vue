<template>
  <div class="page-header-index-wide" style="margin-top: -24px;">
    <a-row :gutter="24">
      <a-col :xl="12" :lg="12" :md="24" :sm="24" :xs="24">
        <a-card
          :loading="loading"
          :bordered="false"
          title="项目交易统计"
          :style="{ marginTop: '24px', minHeight: '350px' }"
        >
          <a-row>
            <a-col :xl="8" :lg="24" :md="24" :sm="24" :xs="24">
              <div class="chart-digit">
                <h4>累计交易项目(个)</h4>
                <div class="circle green">
                  <div>
                    <a-icon type="deployment-unit" class="icon" />
                    <p>{{perject.count}}</p>
                  </div>
                </div>
              </div>
            </a-col>
            <a-col :xl="8" :lg="24" :md="24" :sm="24" :xs="24">
              <div class="chart-digit">
                <h4>累计交易金额(万)</h4>
                <div class="circle red">
                  <div>
                    <a-icon type="money-collect" class="icon" />
                    <p>{{perject.amount | totalFilter}}</p>
                  </div>
                </div>
              </div>
            </a-col>
            <a-col :xl="8" :lg="24" :md="24" :sm="24" :xs="24">
              <div class="chart-digit" style="border: none">
                <h4>成交与评估均价比</h4>
                <div class="circle blue">
                  <div>
                    <a-icon :type="Number(perject.percent)>0?'rise':'fall'" class="icon" />
                    <p>
                      {{Number(perject.percent)>0?'+':""}}{{perject.percent}}
                      <span
                        class="unit"
                      >%</span>
                    </p>
                  </div>
                </div>
              </div>
            </a-col>
          </a-row>
        </a-card>
      </a-col>
      <a-col :xl="12" :lg="12" :md="24" :sm="24" :xs="24">
        <a-card
          :loading="loading"
          :bordered="false"
          title="近4个季度交易趋势"
          :style="{ marginTop: '24px', minHeight: '350px' }"
        >
          <line-chart :chart-data="lineChartData"></line-chart>
        </a-card>
      </a-col>
    </a-row>

    <a-card
      :loading="loading"
      :bordered="false"
      title="项目出租情况"
      :style="{ marginTop: '24px', minHeight: '440px' }"
    >
      <a-row>
        <a-col :xl="12" :lg="12" :md="24" :sm="24" :xs="24">
          <left-bar-chart :chart-data="leftBarChartData"></left-bar-chart>
        </a-col>
        <a-col :xl="12" :lg="12" :md="24" :sm="24" :xs="24">
          <right-bar-chart :chart-data="rightBarChartData"></right-bar-chart>
        </a-col>
      </a-row>
    </a-card>
  </div>
</template>

<script>
import baseMixin from '@/components/Mixins/base'
import indexMixin from './modules/index'
import LineChart from './modules/LineChart'
import LeftBarChart from './modules/LeftBarChart'
import RightBarChart from './modules/RightBarChart'
import { mixinDevice } from '@/utils/mixin'

export default {
  name: 'userList',
  mixins: [baseMixin, indexMixin, mixinDevice],
  components: {
    LineChart,
    LeftBarChart,
    RightBarChart
  }
}
</script>
