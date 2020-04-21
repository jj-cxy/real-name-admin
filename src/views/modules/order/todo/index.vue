<template>
  <div>
    <!-- 搜索 -->
    <a-card :bordered="false" class="search-card" v-if="paging">
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="15">
            <a-col :md="10" :sm="24">
              <a-form-item>
                <a-input v-model="listQuery.condition.projectName" placeholder="事项名称" />
              </a-form-item>
            </a-col>
            <a-col :md="9" :sm="24">
              <a-form-item label="办理时间" class="date-picker-box">
                <j-date @start="handleStartTime" @end="handleEndTime" v-if="isShowDate"></j-date>
              </a-form-item>
            </a-col>
            <a-col :md="3 || 24" :sm="24">
              <span class="table-page-search-submitButtons">
                <a-button type="primary" @click="handleSearch">查询</a-button>
                <a-button style="margin-left: 8px" @click="searchReset">重置</a-button>
              </span>
            </a-col>
          </a-row>
        </a-form>
      </div>
    </a-card>

    <!-- 表格 -->
    <a-card :bordered="false">
      <a-table
        :columns="columns"
        :dataSource="listData"
        :loading="localLoading"
        :rowKey="(text,index)=>index"
        :pagination="paging?pagination:false"
        size="middle"
      >
        <span slot="action" slot-scope="text, record">
          <a href="javascript:;" @click="handleDetail(record)">处理</a>
        </span>
      </a-table>
    </a-card>
    <FormDrawer ref="detailForm" />
  </div>
</template>

<script>
import baseMixin from '@/components/Mixins/base'
import indexMixin from './modules/index'
import JDate from '@/components/JDate/index'
import FormDrawer from './modules/formDrawer'

export default {
  name: 'history',
  mixins: [baseMixin, indexMixin],
  components: {
    JDate,
    FormDrawer
  }
}
</script>
