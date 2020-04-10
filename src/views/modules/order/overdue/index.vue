<template>
  <div>
    <!-- 搜索 -->
    <a-card :bordered="false" class="search-card" v-if="paging">
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="15">
            <a-col :md="8" :sm="24">
              <a-form-item>
                <a-input v-model="listQuery.condition.keyWord" placeholder="项目名称/企业名称" />
              </a-form-item>
            </a-col>
            <a-col :md="4" :sm="24">
              <a-form-item>
                <a-select
                  allowClear
                  showSearch
                  optionFilterProp="children"
                  v-model="listQuery.condition.oaType"
                  placeholder="工单类型"
                >
                  <a-select-option
                    v-for="(item,index) in taskTypeList"
                    :key="index"
                    :value="item.key"
                  >{{item.name}}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="9" :sm="24">
              <a-form-item label="工单发起时间" class="date-picker-box">
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
        @change="handleTableChange"
        size="middle"
      >
        <span slot="action" slot-scope="text, record">
          <a href="javascript:;" @click="handleDeal(record)">处理工单</a>
        </span>
        <span slot="timeDelay" slot-scope="text">
          <span style="color: red">{{text}}</span>
        </span>
      </a-table>
    </a-card>
  </div>
</template>

<script>
import baseMixin from '@/components/Mixins/base'
import indexMixin from './modules/index'
import JDate from '@/components/JDate/index'

export default {
  name: 'overdue',
  mixins: [baseMixin, indexMixin],
  components: {
    JDate
  }
}
</script>
