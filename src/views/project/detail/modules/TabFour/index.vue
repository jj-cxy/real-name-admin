<template>
  <div>
    <!-- 搜索 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="15">
          <a-col :md="6" :sm="24">
            <a-form-item>
              <a-input allowClear v-model="listQuery.condition.personName" placeholder="姓名" />
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="24">
            <a-form-item>
              <a-input allowClear v-model="listQuery.condition.personPhone" placeholder="手机号" />
            </a-form-item>
          </a-col>
          <a-col :md="4" :sm="24">
            <a-form-item>
              <a-select allowClear v-model="listQuery.condition.personType" placeholder="职务">
                <a-select-option
                  v-for="(item,index) in personTypeList"
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
  name: 'ManagerList',
  mixins: [baseMixin, indexMixin],
  components: {}
}
</script>
