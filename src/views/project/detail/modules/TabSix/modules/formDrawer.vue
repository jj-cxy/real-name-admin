<template>
  <a-drawer
    title="考勤详情"
    :maskClosable="true"
    :width="800"
    placement="right"
    :closable="true"
    @close="visible=false"
    :visible="visible"
    style="height: calc(100% - 55px);overflow: auto;"
  >
    <a-spin :spinning="confirmLoading">
      <a-calendar class="calendar" @select="onSelect">
        <div slot="dateCellRender" slot-scope="value" class="events">
          <a-icon type="check" style="color: #52c41a;" />
          <!-- <a-icon type="close" style="color: #f5222d" /> -->
        </div>
        <template slot="monthCellRender" slot-scope="value"></template>
      </a-calendar>
      <a-table
        :columns="columns"
        :dataSource="listData"
        :loading="localLoading"
        :rowKey="(text,index)=>index"
        :pagination="false"
        size="small"
      ></a-table>
    </a-spin>
  </a-drawer>
</template>

<script>
import pick from 'lodash.pick'
import modalMixin from '@/components/Mixins/modal'
import moment from 'moment'

export default {
  name: 'formDrawer',
  mixins: [modalMixin],
  data() {
    return {
      Urls: { getByIdUrl: '/biz/oaAgreement/get/' },
      columns: [
        {
          title: '考勤时间',
          dataIndex: 'personName'
        },
        {
          title: '打卡类型',
          align: 'center',
          dataIndex: 'workerTypeDesc'
        },
        {
          title: '打卡方式',
          align: 'center',
          dataIndex: 'workTypeDesc'
        },
        {
          title: '对比结果',
          align: 'center',
          dataIndex: 'projectName'
        },
        {
          title: '相识度',
          align: 'center',
          dataIndex: 'punchDay'
        },
        {
          title: '考勤现场照片',
          align: 'center',
          dataIndex: 'createTime'
        }
      ],
      listData: [],
      localLoading: false
    }
  },
  computed: {},
  methods: {
    setForm(data) {
      this.model = data
    },
    onSelect(value) {
      console.log(moment(value).format('YYYY-MM-DD'))
    }
  }
}
</script>

<style lang="scss">
.calendar {
  .ant-fullcalendar-calendar-body {
    padding: 8px 0;
  }
  .ant-fullcalendar-date {
    height: 80px;
  }
}
.events {
  text-align: center;
  i {
    font-size: 26px;
  }
}
</style>