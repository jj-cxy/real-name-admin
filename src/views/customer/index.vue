<template>
  <div>
    <!-- 搜索 -->
    <a-card :bordered="false" class="search-card">
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="15">
            <a-col :md="10" :sm="24">
              <a-form-item>
                <a-input v-model="listQuery.condition.name" placeholder="客户名称" />
              </a-form-item>
            </a-col>
            <a-col :md="5" :sm="24">
              <a-form-item>
                <a-select allowClear v-model="listQuery.condition.role" placeholder="客户角色">
                  <a-select-option v-for="item in roleList" :key="item.value">{{item.name}}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="5" :sm="24">
              <a-form-item>
                <a-select allowClear v-model="listQuery.condition.type" placeholder="客户类型">
                  <a-select-option v-for="item in customerTypeList" :key="item.value">{{item.name}}</a-select-option>
                </a-select>
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

    <!-- 表格 -->
    <a-card :bordered="false">
      <div class="table-operator" v-if="this.mark != 'monitor'">
        <a-button type="primary" icon="plus" @click="handleAdd">增加招租用户</a-button>
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
            icon="eye"
            title="详情"
            @click.native="handleDetail(record)"
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
          </a-menu>
        </a-dropdown-button>
      </div>
    </a-card>

    <!-- 表单 -->
    <form-modal ref="modalForm" @ok="afterSubmit"></form-modal>
    <form-drawer ref="detailForm"></form-drawer>
  </div>
</template>

<script>
import baseMixin from '@/components/Mixins/base'
import indexMixin from './modules/index'
import formDrawer from './modules/formDrawer'
import formModal from './modules/formModal'

export default {
  name: 'contract',
  mixins: [baseMixin, indexMixin],
  components: {
    formDrawer,
    formModal
  }
}
</script>
