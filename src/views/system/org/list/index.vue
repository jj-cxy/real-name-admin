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
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="上级机构">
            <a-tree-select
              allowClear
              :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
              :treeData="treeData"
              placeholder="请选择，默认是根节点"
              treeDefaultExpandAll
              v-decorator="['parentId']"
              :disabled="isDisabled"
            ></a-tree-select>
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="机构名称">
            <a-input v-decorator="['name', {rules: [{required: true, message: '此字段为必填'}]}]" />
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
                    disabled
                    @change="handleProvinceChange"
                    v-decorator="['proviceId',{ initialValue: '520000' }, {rules: [{required: true, message: '请选择'}]}]"
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
                    disabled
                    @change="handleCityChange"
                    v-decorator="['cityId',{ initialValue: '520100' },]"
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
                    placeholder="选择区/县"
                    v-decorator="['districtId']"
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
