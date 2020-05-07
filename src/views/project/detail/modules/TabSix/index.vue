<template>
  <div>
    <!-- 搜索 -->
    <div class="table-page-search-wrapper">
      <ul class="digit">
        <li>
          <a-statistic title="今日在场" :value="112893" style="margin-right: 50px" />
        </li>
        <li>
          <a-statistic title="今日入场" :value="112893" style="margin-right: 50px" />
        </li>
        <li>
          <a-statistic title="今日出场" :value="112893" style="margin-right: 50px" />
        </li>
      </ul>
      <a-form layout="inline">
        <a-row :gutter="15">
          <a-col :md="6" :sm="24">
            <a-form-item>
              <a-input allowClear v-model="listQuery.condition.personName" placeholder="姓名" />
            </a-form-item>
          </a-col>
          <a-col :md="4" :sm="24">
            <a-form-item>
              <a-date-picker placeholder="时间" style="width: 100%" />
            </a-form-item>
          </a-col>
          <a-col :md="4" :sm="24">
            <a-form-item>
              <a-select allowClear v-model="listQuery.condition.workType" placeholder="工种">
                <a-select-option
                  v-for="(item,index) in teamTypeList"
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
    >
      <span slot="action" slot-scope="text, record">
        <a href="javascript:;" @click="handleDetail(record)">查看</a>
      </span>
    </a-table>

    <form-drawer ref="detailForm"></form-drawer>
  </div>
</template>

<script>
import baseMixin from '@/components/Mixins/base'
import indexMixin from './modules/index'
import formDrawer from './modules/formDrawer'

export default {
  name: 'punchList',
  mixins: [baseMixin, indexMixin],
  components: {
    formDrawer
  }
}
</script>
<style scoped>
.digit {
  display: flex;
}
</style>
