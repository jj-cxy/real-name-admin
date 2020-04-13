<template>
  <div>
    <a-card :bordered="false" class="search-card">
      <!-- 搜索 -->
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="15">
            <a-col :md="10" :sm="24">
              <a-form-item>
                <a-input v-model="listQuery.condition.name" placeholder="字典名称" />
              </a-form-item>
            </a-col>
            <a-col :md="!advanced && 5 || 24" :sm="24">
              <span
                class="table-page-search-submitButtons"
                :style="advanced && { float: 'right', overflow: 'hidden' } || {} "
              >
                <a-button type="primary" @click="handleSearch">查询</a-button>
                <a-button
                  style="margin-left: 8px"
                  @click="() => listQuery.condition = {parentId: '0'}"
                >重置</a-button>
              </span>
            </a-col>
          </a-row>
        </a-form>
      </div>
    </a-card>
    <a-card :bordered="false">
      <!-- 表格操作 -->
      <div class="table-operator">
        <a-button type="primary" icon="plus" @click="handleAdd">新增</a-button>
      </div>

      <!-- 表格 -->
      <a-table
        :columns="columns"
        v-if="tableShow"
        :defaultExpandAllRows="defaultExpandAllRows"
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
            @click.native="handleEdit(record)"
          ></a-button>
          <a-divider type="vertical" />
          <template v-if="record.isLeaf == 1">
            <a-button
              type="dashed"
              size="small"
              shape="circle"
              icon="delete"
              @click.native="handleDel(record)"
            ></a-button>
            <a-divider type="vertical" />
          </template>
          <a-button
            v-if="record.category=='tree'"
            type="dashed"
            size="small"
            shape="circle"
            icon="plus-square"
            @click.native="handleSub(record)"
          ></a-button>
        </span>
      </a-table>

      <!-- 表单 -->
      <a-modal
        :title="textMap[dialogStatus]"
        centered
        :width="800"
        :visible="visible"
        :confirmLoading="confirmLoading"
        @ok="handleSubmit"
        @cancel="visible = false"
        :maskClosable="false"
      >
        <a-form :form="form">
          <a-form-item :labelCol="labelRowCol" :wrapperCol="wrapperRowCol" label="上级字典">
            <a-tree-select
              allowClear
              :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
              :treeData="treeData"
              placeholder="请选择，默认根节点"
              treeDefaultExpandAll
              v-decorator="['parentId']"
              :disabled="isDisabled"
            ></a-tree-select>
          </a-form-item>
          <a-row :gutter="15">
            <a-col :md="12" :sm="24">
              <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="键名">
                <a-input v-decorator="['key']" />
              </a-form-item>
            </a-col>
            <a-col :md="12" :sm="24">
              <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="键值">
                <a-input v-decorator="['value']" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-form-item :labelCol="labelRowCol" :wrapperCol="wrapperRowCol" label="字典名称">
            <a-input v-decorator="['name', {rules: [{required: true, message: '此字段为必填'}]}]" />
          </a-form-item>
          <a-row :gutter="15">
            <a-col :md="12" :sm="24">
              <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="字典类型">
                <a-select
                  v-decorator="['category', {rules: [{required: true, message: '此字段为必填'}]}]"
                  placeholder="请选择"
                >
                  <a-select-option value="dict">字典</a-select-option>
                  <a-select-option value="tree">树</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="12" :sm="24">
              <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="分类">
                <a-input v-decorator="['type', {rules: [{required: true, message: '此字段为必填'}]}]" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-form-item :labelCol="labelRowCol" :wrapperCol="wrapperRowCol" label="排序">
            <a-input v-decorator="['sort', {rules: [{required: true, message: '此字段为必填'}]}]" />
          </a-form-item>
          <a-form-item :labelCol="labelRowCol" :wrapperCol="wrapperRowCol" label="备注">
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
  name: 'dictList',
  mixins: [baseMixin, indexMixin]
}
</script>
