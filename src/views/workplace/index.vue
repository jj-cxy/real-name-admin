<template>
  <div>
    <a-row :gutter="24">
      <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="14">
        <a-card
          title="待办事项"
          :headStyle="{marginBottom: 0}"
          :bodyStyle="{padding: 0, height: '312px', 'overflow-y':'auto'}"
        >
          <a href="#" slot="extra" @click="$router.push('/order/todo')">查看更多</a>
          <!-- 表格 -->
          <todo :paging="false"></todo>
        </a-card>
      </a-col>
      <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="10">
        <a-card title="预警事项" :bodyStyle="{padding: '0',margin: '-1px 0 0 -1px'}">
          <a-row>
            <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="8">
              <div class="grid-list">
                <a-badge
                  :count="count.DEVICE"
                  :offset="[-5,10]"
                  @click="$router.push({path:'/warning/history',query:{warningType:'DEVICE'}})"
                >
                  <div class="gridIcon">
                    <i class="iconfont" style="color: #92a1fe">&#xe624;</i>
                  </div>
                </a-badge>
                <div class="gridSpan">前端设备预警</div>
              </div>
            </a-col>
            <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="8">
              <div class="grid-list">
                <a-badge
                  :count="count.MANAGER"
                  :offset="[-5,10]"
                  @click="$router.push({path:'/warning/history',query:{warningType:'MANAGER'}})"
                >
                  <div class="gridIcon">
                    <i class="iconfont" style="color: #b579cc">&#xe60d;</i>
                  </div>
                </a-badge>
                <div class="gridSpan">管理人员数据异常</div>
              </div>
            </a-col>
            <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="8">
              <div class="grid-list">
                <a-badge
                  :count="count.LABOR"
                  :offset="[-5,10]"
                  @click="$router.push({path:'/warning/history',query:{warningType:'LABOR'}})"
                >
                  <div class="gridIcon">
                    <i class="iconfont" style="color: #45dec5">&#xe68c;</i>
                  </div>
                </a-badge>
                <div class="gridSpan">劳务人员数据异常</div>
              </div>
            </a-col>
            <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="8">
              <div class="grid-list">
                <a-badge
                  :count="count.PUNCH"
                  :offset="[-5,10]"
                  @click="$router.push({path:'/warning/history',query:{warningType:'PUNCH'}})"
                >
                  <div class="gridIcon">
                    <i class="iconfont" style="color: #1890FF">&#xe647;</i>
                  </div>
                </a-badge>
                <div class="gridSpan">考勤数据异常</div>
              </div>
            </a-col>
            <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="8">
              <div class="grid-list">
                <a-badge
                  :count="count.SALARY"
                  :offset="[-5,10]"
                  @click="$router.push({path:'/warning/history',query:{warningType:'SALARY'}})"
                >
                  <div class="gridIcon">
                    <i class="iconfont" style="color: red">&#xe655;</i>
                  </div>
                </a-badge>
                <div class="gridSpan">工资数据异常</div>
              </div>
            </a-col>
            <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="8">
              <div class="grid-list">
                <a-badge
                  :count="count.CONTRACT"
                  :offset="[-5,10]"
                  @click="$router.push({path:'/warning/history',query:{warningType:'CONTRACT'}})"
                >
                  <div class="gridIcon">
                    <i class="iconfont" style="color: #4ecb73">&#xe617;</i>
                  </div>
                </a-badge>
                <div class="gridSpan">劳务合同异常</div>
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
        <a-list-item slot="renderItem" slot-scope="item">
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
