<template>
  <div>
    <!-- 搜索 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="15">
          <a-col :md="8" :sm="24">
            <a-form-item>
              <a-input allowClear v-model="listQuery.condition.name" placeholder="姓名/手机号" />
            </a-form-item>
          </a-col>
          <a-col :md="4" :sm="24">
            <a-form-item>
              <a-select allowClear v-model="listQuery.condition.workType" placeholder="工种">
                <a-select-option
                  v-for="(item,index) in teamTypeList"
                  :key="index"
                  :value="item.key"
                >{{item.value}}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="4" :sm="24">
            <a-form-item>
              <a-select allowClear v-model="listQuery.condition.teamId" placeholder="班组">
                <a-select-option
                  v-for="(item,index) in teamTypeList"
                  :key="index"
                  :value="item.key"
                >{{item.value}}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="4" :sm="24">
            <a-form-item>
              <a-select allowClear v-model="listQuery.condition.postType" placeholder="在职状态">
                <a-select-option
                  v-for="(item,index) in postTypeList"
                  :key="index"
                  :value="item.value"
                >{{item.name}}</a-select-option>
              </a-select>
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
    <a-table
      :columns="columns"
      :dataSource="listData"
      :loading="localLoading"
      rowKey="id"
      :pagination="pagination"
      size="middle"
    ></a-table>
  </div>
</template>

<script>
import baseMixin from '@/components/Mixins/base'
import indexMixin from './modules/index'

export default {
  name: 'WorkerList',
  mixins: [baseMixin, indexMixin],
  components: {}
}
</script>
