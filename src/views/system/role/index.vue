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
          <a href="javascript:;" @click="handleSetMenu(record)">设置权限</a>
          <a-divider type="vertical" />
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
import menuModal from './modules/menuModal'

export default {
  name: 'roleList',
  mixins: [baseMixin, indexMixin],
  components: {
    menuModal
  }
}
</script>
