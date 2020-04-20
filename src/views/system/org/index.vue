<template>
  <div>
    <a-card :bordered="false" class="search-card">
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="15">
            <a-col :md="10" :sm="24">
              <a-form-item>
                <a-input v-model="listQuery.condition.name" placeholder="机构名称" />
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

          <template v-if="record.isLeaf == 1">
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
            <a-divider type="vertical" />
          </template>
          <a-tooltip placement="top">
            <template slot="title">
              <span>新增子机构</span>
            </template>
            <a-button
              type="dashed"
              size="small"
              shape="circle"
              icon="plus-square"
              @click.native="handleSub(record)"
            ></a-button>
          </a-tooltip>
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
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="上级机构">
            <a-tree-select
              allowClear
              :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
              :treeData="treeData"
              placeholder="请选择"
              treeDefaultExpandAll
              v-decorator="['parentId', {rules: [{required: true, message: '请选择上级机构'}]}]"
              :disabled="isDisabled"
            ></a-tree-select>
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="机构名称">
            <a-input v-decorator="['name', {rules: [{required: true, message: '请输入机构名称'}]}]" />
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="机构类型">
            <a-select
              placeholder="请选择"
              v-decorator="['orgType', {rules: [{required: true, message: '请选择机构类型'}]}]"
            >
              <a-select-option
                v-for="item in orgTypeList"
                :key="item.value"
                :value="item.value"
              >{{item.name}}</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="所属地区"
            required
            style="margin-bottom: 0"
          >
            <a-row :gutter="10">
              <a-col :md="8" :sm="24">
                <a-form-item>
                  <a-select
                    showSearch
                    optionFilterProp="children"
                    placeholder="选择省"
                    @change="handleProvinceChange"
                    v-decorator="['provinceId', {rules: [{required: true, message: '请选择省份'}]}]"
                  >
                    <a-select-option
                      v-for="item in provinceList"
                      :key="item.id"
                      :value="item.id"
                    >{{item.name}}</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item>
                  <a-select
                    showSearch
                    optionFilterProp="children"
                    placeholder="选择市"
                    @change="handleCityChange"
                    v-decorator="['cityId']"
                  >
                    <a-select-option
                      v-for="item in cityList"
                      :key="item.id"
                      :value="item.id"
                    >{{item.name}}</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item>
                  <a-select
                    showSearch
                    optionFilterProp="children"
                    placeholder="选择区县"
                    v-decorator="['areaId']"
                  >
                    <a-select-option
                      v-for="item in districtList"
                      :key="item.id"
                      :value="item.id"
                    >{{item.name}}</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
            </a-row>
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
  name: 'OrgList',
  mixins: [baseMixin, indexMixin]
}
</script>
