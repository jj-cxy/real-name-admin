<template>
  <div>
    <!-- 搜索 -->
    <a-card :bordered="false" class="search-card">
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="15">
            <a-col :md="10" :sm="24">
              <a-form-item>
                <a-input v-model="listQuery.condition.name" placeholder="项目名称" />
              </a-form-item>
            </a-col>
            <a-col :md="5" :sm="24">
              <a-form-item>
                <a-select
                  allowClear
                  showSearch
                  optionFilterProp="children"
                  v-model="listQuery.condition.district"
                  placeholder="所在地区"
                >
                  <a-select-option
                    v-for="(item,index) in districtList"
                    :key="index"
                    :value="item.name"
                  >{{item.name}}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="5" :sm="24">
              <a-form-item>
                <a-tree-select
                  allowClear
                  :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
                  :treeData="orgList"
                  placeholder="管理机构"
                  treeDefaultExpandAll
                  v-model="listQuery.condition.orgId"
                ></a-tree-select>
              </a-form-item>
            </a-col>
            <template v-if="advanced">
              <a-col :md="4" :sm="24">
                <a-form-item>
                  <a-select
                    allowClear
                    v-model="listQuery.condition.projectStatus"
                    placeholder="项目类型"
                  >
                    <a-select-option
                      v-for="(item,index) in projectStatusList"
                      :key="index"
                      :value="item.value"
                    >{{item.name}}</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :md="4" :sm="24">
                <a-form-item>
                  <a-select
                    allowClear
                    v-model="listQuery.condition.projectStatus"
                    placeholder="项目状态"
                  >
                    <a-select-option
                      v-for="(item,index) in projectStatusList"
                      :key="index"
                      :value="item.value"
                    >{{item.name}}</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :md="6" :sm="24">
                <a-form-item>
                  <a-select
                    allowClear
                    v-model="listQuery.condition.projectStatus"
                    placeholder="前端软件公司"
                  >
                    <a-select-option
                      v-for="(item,index) in projectStatusList"
                      :key="index"
                      :value="item.value"
                    >{{item.name}}</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
            </template>
            <a-col :md="4" :sm="24">
              <span
                class="table-page-search-submitButtons"
                :style="advanced && { float: 'left', overflow: 'hidden' } || {} "
              >
                <a-button type="primary" @click="handleSearch">查询</a-button>
                <a-button style="margin-left: 8px" @click="searchReset">重置</a-button>
                <a @click="toggleAdvanced" style="margin-left: 8px">
                  {{ advanced ? '收起' : '展开' }}
                  <a-icon :type="advanced ? 'up' : 'down'" />
                </a>
              </span>
            </a-col>
          </a-row>
        </a-form>
      </div>
    </a-card>

    <!-- 表格 -->
    <a-card :bordered="false">
      <a-table
        :columns="columns"
        :dataSource="listData"
        :loading="localLoading"
        rowKey="id"
        :pagination="pagination"
        size="middle"
      >
        <span slot="action" slot-scope="text, record">
          <a href="javascript:;" @click="handleDetail(record)">查看</a>
          <a-divider type="vertical" />
          <a href="javascript:;" @click="handleSetMenu(record)">修改状态</a>
          <a-divider type="vertical" />
          <a href="javascript:;" @click="handleSetMenu(record)">发起修改工单</a>
        </span>
        <span slot="addr" slot-scope="text, record">{{record.areaName}} {{record.address}}</span>
      </a-table>
    </a-card>
    <form-drawer ref="detailForm"></form-drawer>
  </div>
</template>

<script>
import baseMixin from '@/components/Mixins/base'
import indexMixin from './modules/index'
import formDrawer from './modules/formDrawer'
import JDate from '@/components/JDate/index'

export default {
  name: 'project',
  mixins: [baseMixin, indexMixin],
  components: {
    formDrawer,
    JDate
  }
}
</script>
