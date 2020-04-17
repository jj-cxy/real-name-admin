<template>
  <div>
    <!-- 搜索 -->
    <a-card :bordered="false" class="search-card">
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="15">
            <a-col :md="9" :sm="24">
              <a-form-item>
                <a-input v-model="listQuery.condition.unitName" placeholder="单位名称" />
              </a-form-item>
            </a-col>
            <a-col :md="4" :sm="24">
              <a-form-item>
                <a-select
                  allowClear
                  showSearch
                  optionFilterProp="children"
                  v-model="listQuery.condition.districtId"
                  placeholder="所属地区"
                >
                  <a-select-option
                    v-for="(item,index) in districtList"
                    :key="index"
                    :value="item.id"
                  >{{item.name}}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="5" :sm="24">
              <a-form-item>
                <a-select
                  allowClear
                  showSearch
                  optionFilterProp="children"
                  v-model="listQuery.condition.unitType"
                  placeholder="主要业务类型"
                >
                  <a-select-option
                    v-for="(item,index) in unitTypeList"
                    :key="index"
                    :value="item.value"
                  >{{item.name}}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="3" :sm="24">
              <a-form-item>
                <a-select allowClear v-model="listQuery.condition.auditStatus" placeholder="审核状态">
                  <a-select-option
                    v-for="(item,index) in auditStatusList"
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

    <!-- 表格 -->
    <a-card :bordered="false">
      <a-table
        :columns="columns"
        :dataSource="listData"
        :loading="localLoading"
        rowKey="id"
        :pagination="pagination"
        size="middle"
      >
        <span slot="action" slot-scope="text, record">
          <a href="javascript:;" @click="handleDetail(record)">查看</a>
        </span>
        <span slot="addr" slot-scope="text, record">{{record.areaName}} {{record.address}}</span>
      </a-table>
    </a-card>
    <form-drawer ref="detailForm"></form-drawer>
  </div>
</template>

<script>
import baseMixin from '@/components/Mixins/base'
import indexMixin from './modules/index'
import formDrawer from './modules/formDrawer'

export default {
  name: 'enterprise',
  mixins: [baseMixin, indexMixin],
  components: {
    formDrawer
  }
}
</script>
