<template>
  <div>
    <!-- 表格 -->
    <a-table
      :columns="dataColumns"
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

export default {
  name: 'contract',
  mixins: [baseMixin],
  props: {
    dataColumns: {
      type: Array,
      default: []
    },
    url: {
      type: String,
      default: ''
    },
    customerId: {
      type: String,
      default: ''
    }
  },
  watch: {
    customerId: function(val, oldVal) {
      this.listQuery.condition.userId = val
      this.Urls.listUrl = this.url
      this.getList()
    }
  },
  data() {
    return {
      pagination: { pageSize: 30 },
      listQuery: { pageSize: 30, condition: { userId: this.customerId } },
      Urls: {
        listUrl: this.url
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    afterList() {
      this.$emit('total', this.pagination.total)
    }
  }
}
</script>
