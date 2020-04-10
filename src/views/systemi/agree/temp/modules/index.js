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
        title: '模板名称',
        dataIndex: 'name'
      }, {
        title: '修改时间',
        align: 'center',
        dataIndex: 'modifyTime'
      }, {
        dataIndex: 'action',
        align: 'center',
        fixed: 'right',
        width: '110px',
        scopedSlots: {
          customRender: 'action'
        }
      }],
      listData: [{
        name: '《租赁服务费收费标准》',
        modifyTime: '2019-08-01 16:20:00'
      }],
      Urls: {
        listUrl: '/biz/oaAgreement/list'
      }
    }
  },
  filters: {},
  created() {
    this.getData();
  },
  methods: {
    afterList() {
      this.listData = this.listData.filter((obj) => {
        return 'entrust_agreement' !== obj.id;
      });
    },
    afterSubmit() {
      this.getData()
    }
  }
}
export default indexMixin