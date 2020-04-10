<template>
  <div>
    <!-- 表格 -->
    <a-table
      :columns="dataColumns"
      :dataSource="tableData"
      :loading="localLoading"
      :rowKey="(text,index)=>index"
      :pagination="false"
      size="small"
      :rowSelection="rowRadio?{selectedRowKeys: selectedRowKeys, type: 'radio', onChange: onSelectChange}:null"
      bordered
    ></a-table>
  </div>
</template>

<script>
import baseMixin from '@/components/Mixins/base'

export default {
  name: 'CTFTable',
  mixins: [baseMixin],
  props: {
    dataColumns: {
      type: Array,
      default: () => []
    },
    tableData: {
      type: Array,
      default: () => []
    },
    id: {
      type: String,
      default: ''
    },
    rowRadio: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      pagination: { pageSize: 30 },
      listQuery: { pageSize: 30, condition: { parentId: this.id } }
    }
  },
  methods: {
    onSelectChange(selectedRowKeys, selectionRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectionRows = selectionRows
      this.$emit('getId', this.selectionRows)
    }
  }
}
</script>
