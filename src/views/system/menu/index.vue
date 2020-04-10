<template>
  <div>
    <a-card :bordered="false" class="search-card">
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="15">
            <a-col :md="8" :sm="24">
              <a-form-item>
                <a-input v-model="listQuery.condition.name" placeholder="菜单名称" />
              </a-form-item>
            </a-col>
            <a-col :md="4" :sm="24">
              <a-form-item>
                <a-select allowClear v-model="listQuery.condition.type" placeholder="菜单类型">
                  <a-select-option v-for="item in typeArr" :key="item.value">{{item.name}}</a-select-option>
                </a-select>
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
                  @click="() => listQuery.condition = {parentId: 0}"
                >重置</a-button>
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
        <span slot="iconBox" slot-scope="text">
          <a-icon :type="text || 'smile'" />
        </span>
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
        :width="760"
        :visible="visible"
        :confirmLoading="confirmLoading"
        @ok="handleSubmit"
        @cancel="visible = false"
        :maskClosable="false"
      >
        <a-form :form="form">
          <a-form-item :labelCol="labelRowCol" :wrapperCol="wrapperRowCol" label="上级目录">
            <a-tree-select
              allowClear
              :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
              :treeData="treeData"
              placeholder="请选择，默认根目录"
              treeDefaultExpandAll
              v-decorator="['parentId']"
              :disabled="isDisabledd"
            ></a-tree-select>
          </a-form-item>
          <a-form-item :labelCol="labelRowCol" :wrapperCol="wrapperRowCol" label="类型">
            <a-radio-group v-decorator="['type', {initialValue: 'MENU'}]">
              <a-radio value="MENU">菜单</a-radio>
              <a-radio value="BUTTON">按钮</a-radio>
            </a-radio-group>
          </a-form-item>
          <a-form-item :labelCol="labelRowCol" :wrapperCol="wrapperRowCol" label="名称">
            <a-input placeholder="请输入名称" v-decorator="['name', {rules: [{required: true, message: '此字段为必填'}]}]" />
          </a-form-item>
          <a-row :gutter="15">
            <a-col :md="12" :sm="24">
              <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="前端路径">
                <a-input placeholder="请输入前端路径" v-decorator="['url']" />
              </a-form-item>
            </a-col>
            <a-col :md="12" :sm="24">
              <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="图标class">
                <a-input placeholder="请输入图标class" v-decorator="['icon']" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="15">
            <a-col :md="12" :sm="24">
              <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="后端路径">
                <a-input placeholder="请输入后端路径"
                  v-decorator="['path', {rules: [{required: true, message: '此字段为必填'}],initialValue:'/**'}]"
                />
              </a-form-item>
            </a-col>
            <a-col :md="12" :sm="24">
              <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="排序">
                <a-input v-decorator="['sort']" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-form-item :labelCol="labelRowCol" :wrapperCol="wrapperRowCol" label="权限标识">
            <a-select
              mode="multiple"
              showSearch
              optionFilterProp="children"
              v-decorator="['mark', {rules: [{required: true, message: '此字段为必填'}]}]"
              placeholder="请选择，此处为多选"
            >
              <a-select-option value="NONE">无需认证</a-select-option>
              <a-select-option value="LOGIN">登录</a-select-option>
              <a-select-option value="USER">平台用户</a-select-option>
              <a-select-option value="AUTH">第三方</a-select-option>
              <a-select-option value="ADMIN">管理员</a-select-option>
            </a-select>
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
  name: 'menuList',
  mixins: [baseMixin, indexMixin]
}
</script>