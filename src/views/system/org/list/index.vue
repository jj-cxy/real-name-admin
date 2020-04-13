<template>
  <div>
    <a-card :bordered="false" class="search-card">
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="15">
            <a-col :md="8" :sm="24">
              <a-form-item>
                <a-input v-model="listQuery.condition.name" placeholder="机构名称" />
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
            :icon="record.orgStatus=='DISABLE'?'unlock':'lock'"
            :title="record.orgStatus=='DISABLE'?'启用':'禁用'"
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
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="机构名称">
            <a-input
              placeholder="请输入机构名称"
              v-decorator="['name', {rules: [{required: true, message: '此字段为必填'}]}]"
            />
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="机构描述">
            <a-textarea :rows="3" v-decorator="['remark']" placeholder="..." />
          </a-form-item>
        </a-form>
      </a-modal>
    </a-card>
  </div>
</template>

<script>
import baseMixin from '@/components/Mixins/common'
import indexMixin from './modules/index'

export default {
  name: 'partList',
  mixins: [baseMixin, indexMixin]
}
</script>
