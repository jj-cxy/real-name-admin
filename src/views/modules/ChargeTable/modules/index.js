import {
  axios
} from '@/utils/request'
import moment from 'moment'

var indexMixin = {
  props: {
    paging: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      // 表头
      columns: [{
        title: '项目名称',
        dataIndex: 'projectName'
      }, {
        title: '收费类型',
        align: 'center',
        dataIndex: 'typeDesc'
      }, {
        title: '缴费方',
        align: 'center',
        dataIndex: 'userName'
      }, {
        title: '缴费金额',
        align: 'center',
        dataIndex: 'amount',
        customRender: (text, record, index) => `${text}元`,
      }, {
        title: '缴费情况',
        align: 'center',
        dataIndex: 'payStatusDesc'
      }, {
        title: '缴费时间',
        align: 'center',
        dataIndex: 'payTime'
      }, {
        title: '操作',
        dataIndex: 'action',
        align: 'center',
        fixed: 'right',
        width: '110px',
        scopedSlots: {
          customRender: 'action'
        }
      }],
      Urls: {
        listUrl: '/biz/oaCharges/page'
      },
      listData: [],
      chargeTypeList: [{
          name: '租赁服务费',
          value: 'RENT_SERV'
        },
        {
          name: '挂牌费',
          value: 'LISTING'
        },
        {
          name: '公开遴选服务费',
          value: 'OPEN_SEL'
        },
        {
          name: '保证金',
          value: 'BOND'
        },
        {
          name: '其他',
          value: 'OTHER'
        },
      ],
      payStatusList: [{
          name: '未支付',
          value: 'WAIT'
        },
        {
          name: '已支付',
          value: 'PAYED'
        },
      ]
    }
  },
  filters: {},
  created() {
    this.getList();
  },
  methods: {}
}
export default indexMixin