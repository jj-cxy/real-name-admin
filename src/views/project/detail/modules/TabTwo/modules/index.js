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
        dataIndex: 'projectName'
      }, {
        title: '分包企业名称',
        align: 'center',
        dataIndex: 'enterpriseName'
      }, {
        title: '分包类型',
        align: 'center',
        dataIndex: 'roleTypeDesc'
      }, {
        title: '分包负责人信息',
        dataIndex: 'persons',
        customRender: (text, record, index) => {
          if (text.persons && text.persons.length > 0) {
            return `项目负责人：${text[0].projectName || ''}　　手机号：${text[0].personPhone || ''}`
          } else {
            return ''
          }
        }
      }, {
        title: '在场情况',
        align: 'center',
        dataIndex: 'subsituationDesc'
      }, {
        title: '进场时间',
        align: 'center',
        dataIndex: 'subEntryTime'
      }, {
        title: '退场时间',
        align: 'center',
        dataIndex: 'subQuitTime'
      }],
      Urls: {
        listUrl: ''
      },
    }
  },
  filters: {},
  created() {
    this.listData = this.list
  },
  methods: {
    handleSearch() {
      this.listData.filter((item, index) => {
        return item.name.indexOf(this.listQuery.condition.name) != '-1'
      })
    }
  }
}
export default indexMixin