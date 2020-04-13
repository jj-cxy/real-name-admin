<template>
  <div>
    <a-row :gutter="24">
      <a-col :xs="2" :sm="24" :md="24" :lg="12" :xl="14">
        <a-card
          title="待办事项"
          :headStyle="{marginBottom: 0}"
          :bodyStyle="{padding: 0, height: '310px'}"
        >
          <a href="#" slot="extra" @click="$router.push('/order/overdue')">查看更多</a>
          <!-- 表格 -->
          <todo :paging="false"></todo>
        </a-card>
      </a-col>
      <a-col :xs="20" :sm="24" :md="24" :lg="12" :xl="10">
        <a-card title="预警事项" :bodyStyle="{padding: '0',margin: '-1px 0 0 -1px'}">
          <a-row>
            <a-col :xs="2" :sm="24" :md="12" :lg="12" :xl="8">
              <div class="grid-list">
                <router-link :to="{path:'/home'}">
                  <a-badge :count="3" :offset="[-5,10]">
                    <a-icon type="android" class="gridIcon" style="color: #90afff" />
                  </a-badge>
                </router-link>
                <div class="gridSpan">前端设备预警</div>
              </div>
            </a-col>
            <a-col :xs="2" :sm="24" :md="12" :lg="12" :xl="8">
              <div class="grid-list">
                <a-badge :count="0" :offset="[-5,10]">
                  <a-icon type="audit" class="gridIcon" style="color: #b579cc" />
                </a-badge>
                <div class="gridSpan">管理人员数据异常</div>
              </div>
            </a-col>
            <a-col :xs="2" :sm="24" :md="12" :lg="12" :xl="8">
              <div class="grid-list">
                <a-badge :count="2" :offset="[-5,10]">
                  <a-icon type="audit" class="gridIcon" style="color: #00bcd4" />
                </a-badge>
                <div class="gridSpan">劳务人员数据异常</div>
              </div>
            </a-col>
            <a-col :xs="2" :sm="24" :md="12" :lg="12" :xl="8">
              <div class="grid-list">
                <a-badge :count="2" :offset="[-5,10]">
                  <a-icon type="audit" class="gridIcon" style="color: #93DD9B" />
                </a-badge>
                <div class="gridSpan">考勤数据异常</div>
              </div>
            </a-col>
            <a-col :xs="2" :sm="24" :md="12" :lg="12" :xl="8">
              <div class="grid-list">
                <a-badge :count="2" :offset="[-5,10]">
                  <a-icon type="audit" class="gridIcon" style="color: #ff8a80" />
                </a-badge>
                <div class="gridSpan">工资数据异常</div>
              </div>
            </a-col>
            <a-col :xs="2" :sm="24" :md="12" :lg="12" :xl="8">
              <div class="grid-list">
                <a-badge :count="2" :offset="[-5,10]">
                  <a-icon type="audit" class="gridIcon" style="color: #1890FF" />
                </a-badge>
                <div class="gridSpan">项目备案</div>
              </div>
            </a-col>
          </a-row>
        </a-card>
      </a-col>
    </a-row>

    <a-card
      :bordered="false"
      title="通知通告"
      :headStyle="{marginBottom: 0}"
      :bodyStyle="{padding: '0 32px'}"
      :style="{ marginTop: '24px' }"
    >
      <a href="javascript:;" slot="extra" @click="$router.push('/order/history')">查看更多</a>
      <!-- list -->
      <a-list itemLayout="horizontal" :dataSource="noticeData">
        <a-list-item slot="renderItem" slot-scope="item, index">
          <a-list-item-meta>
            <a slot="title" href="https://www.antdv.com/">{{ item.title }}</a>
          </a-list-item-meta>
          <div>2020-04-12</div>
        </a-list-item>
      </a-list>
    </a-card>
    <a-card title="常用业务" :headStyle="{'background-color': '#fff'}" style="margin-top: 24px">
      <a href="#" slot="extra">
        <a-button type="primary" icon="plus">添加更多</a-button>
      </a>
      <a-card-grid style="width:25%;">
        <a-icon type="audit" class="bsIcon" />
        <span class="bsSpan">项目备案</span>
      </a-card-grid>
      <a-card-grid style="width:25%;">
        <a-icon type="audit" class="bsIcon" />
        <span class="bsSpan">发整改通知</span>
      </a-card-grid>
      <a-card-grid style="width:25%;">
        <a-icon type="audit" class="bsIcon" />
        <span class="bsSpan">已办记录</span>
      </a-card-grid>
      <a-card-grid style="width:25%;">
        <a-icon type="audit" class="bsIcon" />
        <span class="bsSpan">数据统计</span>
      </a-card-grid>
      <a-card-grid style="width:25%;">
        <a-icon type="audit" class="bsIcon" />
        <span class="bsSpan">预警历史</span>
      </a-card-grid>
      <a-card-grid style="width:25%;">
        <a-icon type="audit" class="bsIcon" />
        <span class="bsSpan">预警率查看</span>
      </a-card-grid>
      <a-card-grid style="width:25%;">
        <a-icon type="audit" class="bsIcon" />
        <span class="bsSpan">超期率查看</span>
      </a-card-grid>
      <a-card-grid style="width:25%;">
        <a-icon type="audit" class="bsIcon" />
        <span class="bsSpan">前端考核情况</span>
      </a-card-grid>
    </a-card>
  </div>
</template>

<script>
import baseMixin from '@/components/Mixins/base'
import indexMixin from './modules/index'
import overdue from '@/views/modules/Order/overdue'
import history from '@/views/modules/Order/history'
import todo from '@/views/modules/Order/todo'

export default {
  name: 'Workplace',
  mixins: [baseMixin, indexMixin],
  components: {
    overdue,
    history,
    todo
  }
}
</script>
