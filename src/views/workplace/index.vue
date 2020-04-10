<template>
  <div>
    <a-row :gutter="24">
      <a-col :xs="2" :sm="24" :md="24" :lg="12" :xl="16">
        <a-card title="待办事项" :headStyle="{marginBottom: 0}" :bodyStyle="{padding: 0}">
          <a href="#" slot="extra" @click="$router.push('/order/overdue')">查看更多</a>
          <!-- 表格 -->
          <overdue :paging="false"></overdue>
        </a-card>
      </a-col>
      <a-col :xs="20" :sm="24" :md="24" :lg="12" :xl="8">
        <a-card title="预警事项" :headStyle="{'background-color': '#eaeaea'}">
          <a-card-grid style="width:50%;">
            <a-badge :count="2" :offset="[0,10]">
              <a-icon type="audit" class="bsIcon" />
            </a-badge>
            <span class="bsSpan">前端设备预警</span>
          </a-card-grid>
          <a-card-grid style="width:50%;">
            <a-badge :count="2" :offset="[0,10]">
              <a-icon type="audit" class="bsIcon" />
            </a-badge>
            <span class="bsSpan">管理人员数据异常</span>
          </a-card-grid>
          <a-card-grid style="width:50%;">
            <a-badge :count="2" :offset="[0,10]">
              <a-icon type="audit" class="bsIcon" />
            </a-badge>
            <span class="bsSpan">劳务人员数据异常</span>
          </a-card-grid>
          <a-card-grid style="width:50%;">
            <a-badge :count="2" :offset="[0,10]">
              <a-icon type="audit" class="bsIcon" />
            </a-badge>
            <span class="bsSpan">考勤数据异常</span>
          </a-card-grid>
          <a-card-grid style="width:50%;">
            <a-badge :count="2" :offset="[0,10]">
              <a-icon type="audit" class="bsIcon" />
            </a-badge>
            <span class="bsSpan">工资数据异常</span>
          </a-card-grid>
          <a-card-grid style="width:50%;">
            <a-badge :count="2" :offset="[0,10]">
              <a-icon type="audit" class="bsIcon" />
            </a-badge>
            <span class="bsSpan">项目备案</span>
          </a-card-grid>
        </a-card>
      </a-col>
    </a-row>
    <a-card title="常用业务" :headStyle="{'background-color': '#eaeaea'}" style="margin-top: 24px">
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
      <a-card-grid style="width:25%;">
        <a-icon type="audit" class="bsIcon" />
        <span class="bsSpan">添加更多</span>
      </a-card-grid>
    </a-card>
    <a-card
      :bordered="false"
      title="通知通告"
      :headStyle="{marginBottom: 0}"
      :bodyStyle="{padding: 0}"
      :style="{ marginTop: '24px' }"
    >
      <a href="javascript:;" slot="extra" @click="$router.push('/order/history')">查看更多</a>
      <!-- 表格 -->
      <history :paging="false"></history>
    </a-card>
    <a-card
      title="超期工单"
      :headStyle="{marginBottom: 0}"
      :bodyStyle="{padding: 0}"
      style="margin-top: 24px"
    >
      <a href="#" slot="extra" @click="$router.push('/order/overdue')">查看更多</a>
      <!-- 表格 -->
      <overdue :paging="false"></overdue>
    </a-card>
  </div>
</template>

<script>
import baseMixin from '@/components/Mixins/base'
import indexMixin from './modules/index'
import overdue from '@/views/modules/order/overdue'
import history from '@/views/modules/order/history'

export default {
  name: 'Workplace',
  mixins: [baseMixin, indexMixin],
  components: {
    overdue,
    history
  }
}
</script>
