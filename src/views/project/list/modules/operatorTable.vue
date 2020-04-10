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
    projectId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      Urls: {
        listUrl: '/biz/oaTask/flowHistory/'
      },
      columns: [
        {
          title: '项目过程名目',
          dataIndex: 'task'
        },
        {
          title: '处理结果及信息',
          dataIndex: 'status',
          customRender:(text,record,index)=>(record.assignee || "")+(record.status || "")
        },
        {
          title: '处理时间',
          align: 'center',
          dataIndex: 'time'
        }
      ]
    }
  },
  watch: {
    projectId: function(val, oldVal) {
      this.getList(val)
    }
  },
  created() {
    this.getList(this.projectId)
  },
  methods: {
    getList(id) {
      this.localLoading = true
      axios({
        url: this.Urls.listUrl + id,
        method: 'get'
      }).then(res => {
        this.listData = []
        this.localLoading = false
        if (res.code == 0) {
          this.listData = res.data
        } else {
          this.$notification.error({
            message: res.msg
          })
        }
      }).catch(()=>{
        this.localLoading = false
      })
    }
  }
}
</script>
