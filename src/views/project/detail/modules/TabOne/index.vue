<template>
  <a-table
    :columns="columns"
    :dataSource="listData"
    :loading="localLoading"
    :rowKey="(text,index)=>index"
    :pagination="pagination"
    size="middle"
  >
    <span slot="action" slot-scope="text, record">
      <a href="javascript:;" @click="handleDetail(record)">查看</a>
    </span>
  </a-table>
</template>

<script>
import baseMixin from '@/components/Mixins/base'
import indexMixin from './modules/index'

export default {
  name: 'FiveList',
  mixins: [baseMixin, indexMixin],
  components: {}
}
</script>
