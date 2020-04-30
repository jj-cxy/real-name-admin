<template>
  <div>
    <!-- 柱状图 -->
    <a-card size="small" title="薪资概况" style="margin-bottom: 24px">
      <a href="#" slot="extra">
        <a-date-picker style="margin-right: 8px;" />
        <span class="table-page-search-submitButtons">
          <a-button type="primary">薪资模板下载</a-button>
          <a-button style="margin-left: 8px">薪资导入</a-button>
        </span>
      </a>
      <div>暂无数据</div>
    </a-card>
    <!-- 搜索 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="15">
          <a-col :md="6" :sm="24">
            <a-form-item>
              <a-input allowClear v-model="listQuery.condition.name" placeholder="姓名" />
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="24">
            <a-form-item>
              <a-date-picker placeholder="时间" />
            </a-form-item>
          </a-col>
          <a-col :md="4" :sm="24">
            <a-form-item>
              <a-select allowClear v-model="listQuery.condition.assetsStatus" placeholder="工种">
                <a-select-option
                  v-for="(item,index) in teamTypeList"
                  :key="index"
                  :value="item.value"
                >{{item.name}}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="4" :sm="24">
            <a-form-item>
              <a-select allowClear v-model="listQuery.condition.assetsStatus" placeholder="班组">
                <a-select-option
                  v-for="(item,index) in teamTypeList"
                  :key="index"
                  :value="item.value"
                >{{item.name}}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="4" :sm="24">
            <span class="table-page-search-submitButtons">
              <a-button type="primary" @click="handleSearch">查询</a-button>
              <a-button style="margin-left: 8px" @click="searchReset">重置</a-button>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <a-table
      :columns="columns"
      :dataSource="listData"
      :loading="localLoading"
      rowKey="id"
      :pagination="pagination"
      size="middle"
    ></a-table>
  </div>
</template>

<script>
import baseMixin from '@/components/Mixins/base'
import indexMixin from './modules/index'

export default {
  name: 'SalaryList',
  mixins: [baseMixin, indexMixin],
  components: {}
}
</script>
