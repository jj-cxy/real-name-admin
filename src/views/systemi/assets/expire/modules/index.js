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
        title: '资产名称',
        dataIndex: 'name'
      }, {
        title: '所属企业',
        dataIndex: 'userName'
      }, {
        title: '资产类型',
        align: 'center',
        dataIndex: 'assetsStatusDesc'
      }, {
        title: '总面积',
        align: 'center',
        dataIndex: 'totalArea',
        customRender: (text, record, index) => text + 'm²'
      }, {
        title: '到期时间',
        align: 'center',
        dataIndex: 'leaseExpirationTime'
      }, {
        title: '操作',
        dataIndex: 'action',
        align: 'center',
        fixed: 'right',
        width: '70px',
        scopedSlots: {
          customRender: 'action'
        }
      }],
      Urls: {
        listUrl: '/biz/oaAssets/expireAssets'
      },
      districtList: [],
      assetsStatusList: [{
        name: '已出租',
        value: 'IN_RENT'
      }, {
        name: '招租中',
        value: 'RENTING'
      }, {
        name: '待出租',
        value: 'FREE'
      }],
    }
  },
  filters: {},
  created() {
    this.getList()
    this.getArea('520100', 'districtList')
  },
  methods: {}
}
export default indexMixin