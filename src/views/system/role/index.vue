<template>
  <div>
    <a-card :bordered="false" class="search-card">
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="15">
            <a-col :md="10" :sm="24">
              <a-form-item>
                <a-input v-model="listQuery.condition.name" placeholder="角色名称" />
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
        @expand="handleExpand"
        :pagination="pagination"
        size="middle"
        @change="handleTableChange"
      >
        <span slot="action" slot-scope="text, record">
          <a href="javascript:;" @click="handleAddUser(record)">添加人员</a>
          <a-divider type="vertical" />
          <a href="javascript:;" @click="handleSetMenu(record)">设置权限</a>
          <a-divider type="vertical" />
          <a-button
            type="dashed"
            size="small"
            shape="circle"
            title="修改"
            icon="edit"
            @click.native="handleEdit(record)"
          ></a-button>
          <a-divider type="vertical" />
          <a-button
            type="dashed"
            size="small"
            shape="circle"
            :icon="record.roleStatus=='DISABLE'?'unlock':'lock'"
            :title="record.roleStatus=='DISABLE'?'启用':'禁用'"
            @click.native="handleLock(record)"
          ></a-button>
          <a-divider type="vertical" />
          <a-button
            type="dashed"
            size="small"
            shape="circle"
            title="删除"
            icon="delete"
            @click.native="handleDel(record)"
          ></a-button>
        </span>
      </a-table>
    </a-card>

    <add-user-modal ref="addUserModal" @ok="afterSubmit"></add-user-modal>
    <menu-modal ref="menuModal" @ok="afterSubmit"></menu-modal>

    <!-- 表单 -->
    <a-modal
      :title="textMap[dialogStatus]"
      centered
      :width="520"
      :visible="visible"
      :confirmLoading="confirmLoading"
      @ok="handleSubmit"
      @cancel="visible = false"
      :maskClosable="false"
    >
      <a-form :form="form">
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="角色名称">
          <a-input
            placeholder="请输入角色名称"
            v-decorator="['name', {rules: [{required: true, message: '此字段为必填'}]}]"
          />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="所属机构">
          <a-tree-select
            allowClear
            :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
            :treeData="orgList"
            placeholder="请选择"
            treeDefaultExpandAll
            v-decorator="['orgId', {rules: [{required: true, message: '此字段为必填'}]}]"
          ></a-tree-select>
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="角色标识">
          <a-input
            placeholder="请输入角色标识"
            v-decorator="['mark', {rules: [{required: true, message: '此字段为必填'}]}]"
          />
        </a-form-item>
        <a-form-item>
          <a-alert message="职务标识不能随意更改，如需更改请联系相关开发人员" type="warning" showIcon />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="角色描述">
          <a-textarea :rows="3" v-decorator="['remark']" placeholder="..." />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import baseMixin from '@/components/Mixins/common'
import indexMixin from './modules/index'
import addUserModal from './modules/addUserModal'
import menuModal from './modules/menuModal'

export default {
  name: 'roleList',
  mixins: [baseMixin, indexMixin],
  components: {
    addUserModal,
    menuModal
  }
}
</script>
