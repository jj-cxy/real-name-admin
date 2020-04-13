<template>
  <div>
    <!-- 表格 -->
    <a-table
      :columns="columns"
      :dataSource="listData"
      :loading="localLoading"
      :rowKey="(record,index)=> index"
      :pagination="false"
      size="middle"
    ></a-table>
  </div>
</template>

<script>
import baseMixin from '@/components/Mixins/base'
import { axios } from '@/utils/request'

export default {
  name: 'ProjectLog',
  mixins: [baseMixin],
  props: {
    procInsId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      Urls: {
        listUrl: '/biz/api/task/flowHistory'
      },
      columns: [
        {
          title: '项目过程名目',
          dataIndex: 'taskName',
          customRender: (text, record, index) => `${record.task.taskName}`
        },
        {
          title: '处理结果及信息',
          dataIndex: 'comment'
        },
        {
          title: '处理时间',
          align: 'center',
          dataIndex: 'completeTime'
        }
      ]
    }
  },
  watch: {
    procInsId: function(val, oldVal) {
      this.getList(val)
    }
  },
  created() {
    this.getList(this.procInsId)
  },
  methods: {
    getList(id) {
      this.localLoading = true
      axios({
        url: this.Urls.listUrl,
        method: 'get',
        params: { procInsId: id }
      }).then(res => {
        this.listData = []
        this.localLoading = false
        if (res.code == 0) {
          this.listData = res.data.records
        } else {
          this.$notification.error({
            message: res.msg
          })
        }
      })
    }
  }
}
</script>
