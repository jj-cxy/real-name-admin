<template>
  <div>
    <!-- 搜索 -->
    <a-card :bordered="false" class="search-card">
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="15">
            <a-col :md="8" :sm="24">
              <a-form-item>
                <a-input v-model="listQuery.condition.projectName" placeholder="项目名称" />
              </a-form-item>
            </a-col>
            <a-col :md="5" :sm="24">
              <a-form-item>
                <a-tree-select
                  allowClear
                  :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
                  :treeData="orgList"
                  placeholder="管理机构"
                  treeDefaultExpandAll
                  v-model="listQuery.condition.managerOrgId"
                ></a-tree-select>
              </a-form-item>
            </a-col>
            <a-col :md="4" :sm="24">
              <a-form-item>
                <a-select allowClear v-model="listQuery.condition.projectType" placeholder="项目类型">
                  <a-select-option
                    v-for="(item,index) in projectTypeList"
                    :key="index"
                    :value="item.key"
                  >{{item.name}}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="4" :sm="24">
              <a-form-item>
                <a-select allowClear v-model="listQuery.condition.projectStatus" placeholder="异常类型">
                  <a-select-option
                    v-for="(item,index) in projectStatusList"
                    :key="index"
                    :value="item.key"
                  >{{item.name}}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="3" :sm="24">
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

    <form-modal ref="modalForm" @ok="afterSubmit"></form-modal>
  </div>
</template>

<script>
import baseMixin from '@/components/Mixins/base'
import indexMixin from './modules/index'
import formModal from './modules/formModal'
import JDate from '@/components/JDate/index'

export default {
  name: 'project',
  mixins: [baseMixin, indexMixin],
  components: {
    JDate,
    formModal
  }
}
</script>
