import {
  axios
} from '@/utils/request'

var indexMixin = {
  props: {
    list: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      // 表头
      columns: [{
        title: '分包项目名称',
        dataIndex: 'enterpriseName'
      }, {
        title: '分包企业类型',
        align: 'center',
        dataIndex: 'roleTypeDesc'
      }, {
        title: '分包类型',
        align: 'center',
        dataIndex: 'roleTypeDesc'
      }, {
        title: '分包负责人信息',
        dataIndex: 'projectManagerName',
        customRender: (text, record, index) => {
          return `项目负责人：${text}　　手机号：${record.projectManagerPhone}`
        }
      }, {
        title: '在场情况',
        align: 'center',
        dataIndex: 'roleTypeDesc'
      }, {
        title: '进场时间',
        align: 'center',
        dataIndex: 'roleTypeDesc'
      }, {
        title: '退出时间',
        align: 'center',
        dataIndex: 'roleTypeDesc'
      }],
      Urls: {
        listUrl: '/biz/oaAssets/page'
      },
    }
  },
  filters: {},
  created() {
    console.log('表格数据', this.list)
    this.listData = this.list
    /* this.getList()
    this.getArea("100000", 'proviceList') */
  },
  methods: {}
}
export default indexMixin