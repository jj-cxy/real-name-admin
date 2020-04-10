<template>
  <div>
    <!-- 搜索 -->
    <a-card :bordered="false" class="search-card" v-if="paging">
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="15">
            <a-col :md="7" :sm="24">
              <a-form-item>
                <a-input v-model="listQuery.condition.projectName" placeholder="项目名称" />
              </a-form-item>
            </a-col>
            <a-col :md="4" :sm="24">
              <a-form-item>
                <a-select
                  allowClear
                  showSearch
                  optionFilterProp="children"
                  v-model="listQuery.condition.taskType"
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
            <a-col :md="10" :sm="24">
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
        :rowKey="(text,index)=>index"
        :pagination="paging?pagination:false"
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
          <!-- <a-divider type="vertical" />
          <a-tooltip placement="topLeft">
            <template slot="title">
              <span>通过</span>
            </template>
            <a-button
              type="dashed"
              size="small"
              shape="circle"
              icon="check"
              @click.native="handlePass(record)"
            ></a-button>
          </a-tooltip>

          <template v-if="record.billType=='IN'">
            <a-divider type="vertical" />
            <a-tooltip placement="topLeft">
              <template slot="title">
                <span>不通过</span>
              </template>
              <a-button
                type="dashed"
                size="small"
                shape="circle"
                icon="close"
                @click.native="handleNoPass(record)"
              ></a-button>
            </a-tooltip>
          </template> -->

        </span>
      </a-table>
      <div class="table-operations" v-if="listData.length > 0 && paging">
        <a-button type="primary" @click="allSelect">全选</a-button>
        <a-button @click="reverseSelect">反选</a-button>
        <a-dropdown-button>
          更多操作
          <a-menu slot="overlay" @click="handleMenuClick">
            <a-menu-item key="1">审核通过</a-menu-item>
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
import JDate from '@/components/JDate/index'

export default {
  name: 'FinanceTodo',
  mixins: [baseMixin, indexMixin],
  components: {
    formDrawer,
    JDate
  }
}
</script>
