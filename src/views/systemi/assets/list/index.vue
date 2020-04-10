<template>
  <div>
    <!-- 搜索 -->
    <a-card :bordered="false" class="search-card">
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="15">
            <a-col :md="8" :sm="24">
              <a-form-item>
                <a-input allowClear v-model="listQuery.condition.name" placeholder="资产名称" />
              </a-form-item>
            </a-col>
            <a-col :md="8" :lg="6" :xl="4" :sm="24">
              <a-form-item>
                <a-select
                  allowClear
                  showSearch
                  optionFilterProp="children"
                  v-model="listQuery.condition.provCode"
                  @change="handleProviceChange"
                  placeholder="所在省"
                >
                  <a-select-option
                    v-for="(item,index) in proviceList"
                    :key="index"
                    :value="item.id"
                  >{{item.name}}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="8" :lg="6" :xl="4" :sm="24">
              <a-form-item>
                <a-select
                  allowClear
                  showSearch
                  optionFilterProp="children"
                  v-model="listQuery.condition.cityCode"
                  @change="handleCityChange"
                  placeholder="所在市"
                >
                  <a-select-option
                    v-for="(item,index) in cityList"
                    :key="index"
                    :value="item.id"
                  >{{item.name}}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="8" :lg="6" :xl="4" :sm="24">
              <a-form-item>
                <a-select
                  allowClear
                  showSearch
                  optionFilterProp="children"
                  v-model="listQuery.condition.distCode"
                  placeholder="所在区/县"
                >
                  <a-select-option
                    v-for="(item,index) in districtList"
                    :key="index"
                    :value="item.name"
                  >{{item.name}}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <template v-if="advanced">
              <a-col :md="4" :sm="24">
                <a-form-item>
                  <a-select
                    allowClear
                    v-model="listQuery.condition.assetsStatus"
                    placeholder="资产状态"
                  >
                    <a-select-option
                      v-for="(item,index) in assetsStatusList"
                      :key="index"
                      :value="item.value"
                    >{{item.name}}</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
            </template>
            <a-col :md="!advanced && 4 || 24" :sm="24">
              <span
                class="table-page-search-submitButtons"
                :style="advanced && { float: 'right', overflow: 'hidden' } || {} "
              >
                <a-button type="primary" @click="handleSearch">查询</a-button>
                <a-button style="margin-left: 8px" @click="searchReset">重置</a-button>
                <a @click="toggleAdvanced" style="margin-left: 8px">
                  {{ advanced ? '收起' : '展开' }}
                  <a-icon :type="advanced ? 'up' : 'down'" />
                </a>
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
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange, fixed: true}"
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
      <div class="table-operations" v-if="listData.length > 0">
        <a-button type="primary" @click="allSelect">全选</a-button>
        <a-button @click="reverseSelect">反选</a-button>
        <a-dropdown-button>
          更多操作
          <a-menu slot="overlay" @click="handleMenuClick">
            <a-menu-item key="download">批量导出</a-menu-item>
          </a-menu>
        </a-dropdown-button>
      </div>
    </a-card>

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
