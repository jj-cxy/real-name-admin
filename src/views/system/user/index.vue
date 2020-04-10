<template>
  <div>
    <a-card :bordered="false" class="search-card">
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="15">
            <a-col :md="8" :sm="24">
              <a-form-item>
                <a-input v-model="listQuery.condition.keyWord" placeholder="用户名/手机号" />
              </a-form-item>
            </a-col>
            <a-col :md="4" :sm="24">
              <a-form-item>
                <a-select
                  placeholder="部门"
                  allowClear
                  showSearch
                  optionFilterProp="children"
                  v-model="listQuery.condition.orgId"
                >
                  <a-select-option
                    v-for="(item,index) in orgList"
                    :key="index"
                    :value="item.id"
                  >{{item.name}}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="4" :sm="24">
              <a-form-item>
                <a-select
                  placeholder="职务"
                  allowClear
                  showSearch
                  optionFilterProp="children"
                  v-model="listQuery.condition.roleId"
                >
                  <a-select-option
                    v-for="(item,index) in roleList"
                    :key="index"
                    :value="item.id"
                  >{{item.name}}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="3" :sm="24">
              <a-form-item>
                <a-select
                  allowClear
                  showSearch
                  placeholder="账号状态"
                  optionFilterProp="children"
                  v-model="listQuery.condition.accountStatus"
                >
                  <a-select-option value="ENABLED">启用</a-select-option>
                  <a-select-option value="DISABLE">停用</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="!advanced && 4 || 24" :sm="24">
              <span
                class="table-page-search-submitButtons"
                :style="advanced && { float: 'right', overflow: 'hidden' } || {} "
              >
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
        <a-button type="primary" icon="plus" @click="handleAdd">增加</a-button>
        <a-upload
          name="file"
          :beforeUpload="beforeUpload"
          :showUploadList="false"
          style="display: inline-block"
        >
          <a-button :loading="uploading">
            <a-icon type="upload" />导 入
          </a-button>
        </a-upload>
        <a href="javascript:;" @click="handleOutput">下载导入模板</a>
      </div>
      <!-- 表格 -->
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
            icon="edit"
            title="修改"
            @click.native="handleEdit(record)"
          ></a-button>
          <a-divider type="vertical" />
          <a-button
            type="dashed"
            size="small"
            shape="circle"
            icon="key"
            title="初始化密码"
            @click.native="handleInitPass(record)"
          ></a-button>
          <a-divider type="vertical" />
          <a-button
            type="dashed"
            size="small"
            shape="circle"
            :icon="record.accountStatus=='DISABLE'?'unlock':'lock'"
            :title="record.accountStatus=='DISABLE'?'启用':'禁用'"
            @click.native="handleLock(record)"
          ></a-button>
          <a-divider type="vertical" />
          <a-button
            type="dashed"
            size="small"
            shape="circle"
            icon="delete"
            title="删除"
            @click.native="handleDel(record)"
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
            <a-menu-item key="1">重置密码</a-menu-item>
            <a-menu-item key="2">停用账号</a-menu-item>
            <a-menu-item key="3">启用账号</a-menu-item>
            <a-menu-item key="del">删除账号</a-menu-item>
          </a-menu>
        </a-dropdown-button>
      </div>
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
