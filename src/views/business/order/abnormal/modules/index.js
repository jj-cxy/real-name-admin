import {
  axios
} from '@/utils/request'
import moment from 'moment'

var indexMixin = {
  props: {
    activeKey: {
      type: String,
      default: '1'
    }
  },
  data() {
    return {
      // 表头
      columns: [{
        title: '交易单号',
        dataIndex: 'orderNo'
      }, {
        title: '交易客户',
        dataIndex: 'accountName'
      }, {
        title: '交易类型',
        align: 'center',
        dataIndex: 'billTypeDesc'
      }, {
        title: '涉及金额',
        align: 'center',
        dataIndex: 'amount'
      }, {
        title: '异常时间',
        align: 'center',
        dataIndex: 'createTime'
      }],
      Urls: {
        listUrl: '/biz/errorStatements/page'
      }
    }
  },
  filters: {},
  created() {
    this.getList()
  },
  methods: {}
}
export default indexMixin