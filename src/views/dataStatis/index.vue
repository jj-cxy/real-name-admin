<template>
  <div>
    <!-- 搜索 -->
    <a-card :bordered="false" class="search-card">
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="15">
            <a-col :md="7" :sm="24">
              <a-form-item>
                <a-input allowClear v-model="listQuery.assetsName" placeholder="资产名称" />
              </a-form-item>
            </a-col>
            <a-col :md="5" :sm="24">
              <a-form-item>
                <a-select
                  allowClear
                  showSearch
                  optionFilterProp="children"
                  v-model="listQuery.district"
                  placeholder="所在地区"
                >
                  <a-select-option
                    v-for="(item,index) in districtList"
                    :key="index"
                    :value="item.name"
                  >{{item.name}}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="4" :sm="24">
              <a-form-item>
                <a-select allowClear v-model="listQuery.assetsType" placeholder="资产类型">
                  <a-select-option
                    v-for="(item,index) in assetsTypeList"
                    :key="index"
                    :value="item"
                  >{{item}}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="4" :sm="24">
              <a-form-item>
                <a-select allowClear v-model="listQuery.assetsStatus" placeholder="资产状态">
                  <a-select-option
                    v-for="(item,index) in assetsStatusList"
                    :key="index"
                    :value="item.value"
                  >{{item.name}}</a-select-option>
                </a-select>
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

    <a-row :gutter="24">
      <a-col :sm="24" :md="24" :xl="12">
        <!-- 资产 -->
        <a-card :bordered="false" title="资产情况" class="small-card asset-card">
          <a-table
            :columns="columns"
            :dataSource="listData"
            :loading="localLoading"
            rowKey="assetsId"
            :pagination="false"
            size="middle"
            :rowClassName="setClassName"
            :customRow="rowClick"
            :scroll="{ y: 570 }"
          ></a-table>
        </a-card>
      </a-col>
      <a-col :sm="24" :md="24" :xl="12">
        <a-card :bordered="false" title="资产租赁历史" class="small-card">
          <a-table
            :columns="historyColumns"
            :dataSource="historyData"
            :loading="historyLoading"
            rowKey="projectNumber"
            :pagination="false"
            size="middle"
          ></a-table>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import indexMixin from './modules/index'

export default {
  name: 'assets',
  mixins: [indexMixin],
  components: {}
}
</script>
<style>
.small-card .ant-card-head-title {
  padding: 12px 0;
}
.asset-card .table-row-active {
  background-color: #edfcf7;
}
.asset-card .ant-table-row {
  cursor: pointer;
}
</style>
