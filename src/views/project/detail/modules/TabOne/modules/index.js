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
        title: '企业名称',
        dataIndex: 'enterpriseName'
      }, {
        title: '企业类型',
        align: 'center',
        dataIndex: 'roleTypeDesc'
      }, {
        title: '项目负责人信息',
        dataIndex: 'persons',
        customRender: (text, record, index) => {
          return `项目负责人：${record.persons[0].projectName}　　手机号：${record.persons[0].personPhone}`
        }
      }, {
        title: '操作',
        dataIndex: 'action',
        align: 'center',
        width: '70px',
        scopedSlots: {
          customRender: 'action'
        }
      }],
      Urls: {
        listUrl: '',
      },
      downloadFileName: '五方主体列表',
      assetsStatusList: []
    }
  },
  filters: {},
  created() {
    this.listData = this.list
  },
  methods: {}
}
export default indexMixin