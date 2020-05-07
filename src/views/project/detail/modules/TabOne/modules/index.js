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
          if (text.persons && text.persons.length > 0) {
            return `项目负责人：${text[0].projectName || ''}　　手机号：${text[0].personPhone || ''}`
          } else {
            return ''
          }
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
      }
    }
  },
  filters: {},
  created() {
    this.listData = this.list
  },
  computed: {
    keyWord: function () {
      var _this = this
      console.log(_this.listData)
      return _this.listData.filter(function (item, index) {
        return item.enterpriseName.indexOf(_this.keyWord) > -1
      })
    }
  },
  methods: {
    handleDetail(record) {
      this.$router.push({
        path: '/enterprise/detail',
        query: {
          id: record.enterpriseId
        }
      })
    }
  }
}
export default indexMixin