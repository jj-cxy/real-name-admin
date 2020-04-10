<template>
  <div>
    <!-- 表格 -->
    <a-table
      :columns="columns"
      :dataSource="listData"
      :loading="localLoading"
      rowKey="id"
      :pagination="pagination"
      size="middle"
    >
      <a
        slot="name"
        slot-scope="text,record"
        href="javascript:;"
        @click="handleTurn(record)"
      >{{text}}</a>
    </a-table>
  </div>
</template>

<script>
import baseMixin from '@/components/Mixins/base'

export default {
  name: 'enterprise',
  mixins: [baseMixin],
  props: {
    customerId: {
      type: String,
      default: ''
    }
  },
  watch: {
    customerId: function(val, oldVal) {
      this.listQuery.condition.parentId = val
      this.getList()
    }
  },
  data() {
    return {
      pagination: { pageSize: 30 },
      listQuery: { pageSize: 30, condition: { parentId: this.customerId } },
      columns: [
        {
          title: '企业名称',
          dataIndex: 'name',
          scopedSlots: { customRender: 'name' }
        },
        {
          title: '统一社会信用代码',
          align: 'center',
          dataIndex: 'unitCode'
        },
        {
          title: '账号状态',
          align: 'center',
          dataIndex: 'accountStatusDesc'
        },
        {
          title: '最后登录',
          align: 'center',
          dataIndex: 'lastLoginTime'
        }
      ],
      Urls: {
        listUrl: '/auth/api/company/page'
      }
    }
  },
  created() {
    console.log('id', this.customerId)
    this.getList()
  },
  methods: {
    //   跳转到公司信息
    handleTurn(record) {
      this.$emit('child', record)
    }
  }
}
</script>
