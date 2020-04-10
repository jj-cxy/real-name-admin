import {
  axios
} from '@/utils/request'

var indexMixin = {
  data() {
    return {
      // 表头
      columns: [{
        title: '项目编号',
        dataIndex: 'number'
      }, {
        title: '项目名称',
        dataIndex: 'name'
      }, {
        title: '所在地区',
        dataIndex: 'district'
      }, {
        title: '项目节点',
        align: 'center',
        dataIndex: 'projectStatusDesc'
      }, {
        title: '项目经办人',
        align: 'center',
        dataIndex: 'buttName'
      }, {
        title: '项目开始时间',
        align: 'center',
        dataIndex: 'createTime'
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
        listUrl: '/biz/oaProject/page',
        delUrl: '/biz/oaProject/remove/',
        downloadExcelUrl: '/biz/oaProject/export/ids'
      },
      districtList: [],
      projectStatusList: [{
        name: '项目审核阶段',
        value: 'OA_EXAMINE'
      }, {
        name: '项目披露期',
        value: 'DISCLOSURE'
      }, {
        name: '组织交易阶段',
        value: '3'
      }, {
        name: '租赁合同签订阶段',
        value: '4'
      }, {
        name: '项目完成',
        value: 'FINISH'
      }],
      downloadFileName: '项目列表',
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