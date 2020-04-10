<template>
  <div>
    <!-- 搜索 -->
    <a-card :bordered="false" class="search-card">
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="15">
            <a-col :md="8" :sm="24">
              <a-form-item>
                <a-input v-model="listQuery.condition.name" placeholder="项目名称" />
              </a-form-item>
            </a-col>
            <!-- <a-col :md="6" :sm="24">
              <a-form-item>
                <a-select
                  allowClear
                  showSearch
                  optionFilterProp="children"
                  v-model="listQuery.condition.district"
                  placeholder="所在地区"
                >
                  <a-select-option
                    v-for="(item,index) in districtList"
                    :key="index"
                    :value="item.name"
                  >{{item.name}}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>-->
            <a-col :md="4" :sm="24">
              <a-form-item>
                <a-select allowClear v-model="listQuery.condition.projectStatus" placeholder="项目节点">
                  <a-select-option
                    v-for="(item,index) in projectStatusList"
                    :key="index"
                    :value="item.value"
                  >{{item.name}}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="9" :sm="24">
              <a-form-item label="发起时间" class="date-picker-box">
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
        rowKey="id"
        :pagination="pagination"
        size="middle"
        bordered
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange, fixed: true}"
      >
        <span slot="action" slot-scope="text, record">
          <a-button
            type="dashed"
            size="small"
            shape="circle"
            icon="eye"
            title="详情"
            @click.native="handleDetail(record)"
          ></a-button>
        </span>
        <span slot="addr" slot-scope="text, record">{{record.areaName}} {{record.address}}</span>
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
    <form-drawer ref="detailForm"></form-drawer>
  </div>
</template>

<script>
import baseMixin from '@/components/Mixins/base'
import indexMixin from './modules/index'
import formDrawer from './modules/formDrawer'
import JDate from '@/components/JDate/index'

export default {
  name: 'contract',
  mixins: [baseMixin, indexMixin],
  components: {
    formDrawer,
    JDate
  }
}
</script>
