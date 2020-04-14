import {
  axios
} from '@/utils/request'
import moment from 'moment'

var indexMixin = {
  data() {
    return {
      // 表头
      columns: [{
        title: '企业名称',
        dataIndex: 'userName'
      }, {
        title: '企业类型',
        align: 'center',
        dataIndex: 'assetsType'
      }, {
        title: '项目负责人信息',
        dataIndex: 'address',
        customRender: (text, record, index) => {
          return record.province + ' ' + record.city + ' ' + record.district + ' ' + record.address;
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
        listUrl: '/biz/oaAssets/page',
        delUrl: '/biz/oaAssets/remove/',
        downloadExcelUrl: '/biz/oaAssets/export/ids',
      },
      assetsStatusList: [{
        name: '在租',
        value: 'RENTING'
      }, {
        name: '招租中',
        value: 'IN_RENT'
      }, {
        name: '空闲',
        value: 'FREE'
      }],
      downloadFileName: '资产列表',
    }
  },
  filters: {},
  created() {
    this.getList()
    this.getArea("100000", 'proviceList')
  },
  methods: {}
}
export default indexMixin