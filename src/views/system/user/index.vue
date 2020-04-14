<template>
  <div>
    <a-card :bordered="false" class="search-card">
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="15">
            <a-col :md="10" :sm="24">
              <a-form-item>
                <a-input v-model="listQuery.condition.keyWord" placeholder="用户名/手机号" />
              </a-form-item>
            </a-col>
            <a-col :md="5" :sm="24">
              <a-form-item>
                <a-tree-select
                  allowClear
                  :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
                  :treeData="orgList"
                  placeholder="选择机构"
                  treeDefaultExpandAll
                  v-model="listQuery.condition.orgId"
                ></a-tree-select>
              </a-form-item>
            </a-col>
            <a-col :md="4" :sm="24">
              <a-form-item>
                <a-select
                  allowClear
                  showSearch
                  placeholder="账号状态"
                  optionFilterProp="children"
                  v-model="listQuery.condition.userStatus"
                >
                  <a-select-option value="ENABLED">启用</a-select-option>
                  <a-select-option value="DISABLE">停用</a-select-option>
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
    <a-card :bordered="false">
      <div class="table-operator">
        <a-button type="primary" icon="plus" @click="handleAdd">新增</a-button>
      </div>
      <!-- 表格 -->
      <a-table
        :columns="columns"
        :dataSource="listData"
        :loading="localLoading"
        rowKey="id"
        :pagination="pagination"
        size="middle"
      >
        <span slot="action" slot-scope="text, record">
          <a-tooltip placement="top">
            <template slot="title">
              <span>编辑</span>
            </template>
            <a-button
              type="dashed"
              size="small"
              shape="circle"
              icon="edit"
              @click.native="handleEdit(record)"
            ></a-button>
          </a-tooltip>
          <a-divider type="vertical" />
          <a-tooltip placement="top">
            <template slot="title">
              <span>初始化密码</span>
            </template>
            <a-button
              type="dashed"
              size="small"
              shape="circle"
              icon="key"
              @click.native="handleInitPass(record)"
            ></a-button>
          </a-tooltip>
          <a-divider type="vertical" />
          <a-tooltip placement="top">
            <template slot="title">
              <span>{{record.accountStatus=='DISABLE'?'启用':'禁用'}}</span>
            </template>
            <a-button
              type="dashed"
              size="small"
              shape="circle"
              :icon="record.accountStatus=='DISABLE'?'unlock':'lock'"
              @click.native="handleLock(record)"
            ></a-button>
          </a-tooltip>
          <a-divider type="vertical" />
          <a-tooltip placement="top">
            <template slot="title">
              <span>删除</span>
            </template>
            <a-button
              type="dashed"
              size="small"
              shape="circle"
              icon="delete"
              @click.native="handleDel(record)"
            ></a-button>
          </a-tooltip>
        </span>
      </a-table>
    </a-card>
    <form-modal ref="modalForm" @ok="afterSubmit"></form-modal>
  </div>
</template>

<script>
import baseMixin from '@/components/Mixins/base'
import indexMixin from './modules/index'
import formModal from './modules/formModal'

export default {
  name: 'userList',
  mixins: [baseMixin, indexMixin],
  components: {
    formModal
  }
}
</script>
