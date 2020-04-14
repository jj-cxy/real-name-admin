<template>
  <div>
    <!-- 搜索 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="15">
          <a-col :md="8" :sm="24">
            <a-form-item>
              <a-input allowClear v-model="listQuery.condition.name" placeholder="企业名称" />
            </a-form-item>
          </a-col>
          <a-col :md="4" :sm="24">
            <a-form-item>
              <a-select allowClear v-model="listQuery.condition.assetsStatus" placeholder="企业类型">
                <a-select-option
                  v-for="(item,index) in assetsStatusList"
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
    >
      <span slot="action" slot-scope="text, record">
        <a-button
          type="dashed"
          size="small"
          shape="circle"
          icon="eye"
          @click.native="handleDetail(record)"
        ></a-button>
      </span>
    </a-table>

    <!-- 表单 -->
    <form-drawer ref="detailForm"></form-drawer>
  </div>
</template>

<script>
import baseMixin from '@/components/Mixins/base'
import indexMixin from './modules/index'
import formDrawer from './modules/formDrawer'

export default {
  name: 'assets',
  mixins: [baseMixin, indexMixin],
  components: {
    formDrawer
  }
}
</script>
