<template>
  <div>
    <!-- 搜索 -->
    <a-card :bordered="false" class="search-card" v-if="paging">
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="15">
            <a-col :md="6" :sm="24">
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
                  v-model="listQuery.condition.type"
                  placeholder="收费类型"
                >
                  <a-select-option
                    v-for="(item,index) in chargeTypeList"
                    :value="item.value"
                    :key="index"
                  >{{item.name}}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="4" :sm="24">
              <a-form-item>
                <a-select allowClear v-model="listQuery.condition.payStatus" placeholder="缴费情况">
                  <a-select-option
                    v-for="(item,index) in payStatusList"
                    :value="item.value"
                    :key="index"
                  >{{item.name}}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="24">
              <a-form-item>
                <a-range-picker style="width: 100%" />
              </a-form-item>
            </a-col>
            <a-col :md="4 || 24" :sm="24">
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
      <div class="table-operator" v-if="paging">
        <a-button type="primary" icon="plus" @click="handleAdd">新增收费</a-button>
      </div>
      <a-table
        :columns="columns"
        :dataSource="listData"
        :loading="localLoading"
        :rowKey="(record,index)=> index"
        :pagination="paging?pagination:false"
        size="middle"
      >
        <span slot="action" slot-scope="text, record">
          <template v-if="record.canUpdate">
            <a-button
              type="dashed"
              size="small"
              shape="circle"
              icon="edit"
              @click.native="handleEdit(record)"
            ></a-button>
            <a-divider type="vertical" />
          </template>
          <a-button
            type="dashed"
            size="small"
            shape="circle"
            icon="eye"
            @click.native="handleDetail(record)"
          ></a-button>
        </span>
      </a-table>
    </a-card>

    <!-- 表单 -->
    <form-modal ref="modalForm" @ok="afterSubmit"></form-modal>
    <form-drawer ref="detailForm"></form-drawer>
  </div>
</template>

<script>
import baseMixin from '@/components/Mixins/base'
import indexMixin from './modules/index'
import formModal from './modules/formModal'
import formDrawer from '@/views/modules/ChargeDrawer'

export default {
  name: 'contract',
  mixins: [baseMixin, indexMixin],
  components: {
    formModal,
    formDrawer
  }
}
</script>
