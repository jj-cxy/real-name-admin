<template>
  <div>
    <a-card :bordered="false" class="search-card">
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="15">
            <a-col :md="10" :sm="24">
              <a-form-item>
                <a-input v-model="listQuery.condition.name" placeholder="第三方名称" />
              </a-form-item>
            </a-col>
            <a-col :md="4" :sm="24">
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
      <!-- 表格 -->
      <a-table
        :columns="columns"
        :dataSource="listData"
        :loading="localLoading"
        :rowKey="(record,index)=>`${index}`"
        @expand="handleExpand"
        :pagination="pagination"
        size="middle"
        @change="handleTableChange"
      >
        <div slot="expandedRowRender" slot-scope="record" class="row-render-box">
          <p>公钥：{{ record.publicKey }}</p>
          <p>私钥：{{ record.privateKey }}</p>
        </div>
      </a-table>

      <!-- 表单 -->
      <a-modal
        :title="textMap[dialogStatus]"
        centered
        :width="600"
        :visible="visible"
        :confirmLoading="confirmLoading"
        @ok="handleSubmit"
        @cancel="visible = false"
        :maskClosable="false"
      >
        <a-form :form="form">
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="第三方名称">
            <a-select
              placeholder="请选择"
              v-decorator="['enterpriseId', { rules: [{required: true, message: '此字段为必填'}]}]"
            >
              <a-select-option
                v-for="(item,index) in enterpriseList"
                :key="index"
                :value="item.id"
              >{{item.name}}</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="过期时间">
            <a-date-picker
              @change="dateChange"
              v-decorator="['expiredTime', {rules: [{required: true, message: '此字段为必填'}]}]"
            />
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="状态">
            <a-switch
              checkedChildren="开"
              unCheckedChildren="关"
              defaultChecked
              v-decorator="['keyStatus', {rules: [{required: true, message: '此字段为必填'}]}]"
            />
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
  name: 'OpenAuth',
  mixins: [baseMixin, indexMixin]
}
</script>
