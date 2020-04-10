import {
  axios
} from '@/utils/request'

var indexMixin = {
  data() {
    return {
      listQuery: {},
      // 表头
      columns: [{
        title: '资产名称',
        dataIndex: 'assetsName'
      }, {
        title: '资产地址',
        dataIndex: 'district'
      }, {
        title: '资产类型',
        align: 'center',
        dataIndex: 'assetsType'
      }, {
        title: '资产状态',
        align: 'center',
        dataIndex: 'assetsStatusDesc'
      }, {
        title: '总面积',
        align: 'center',
        dataIndex: 'totalArea',
        customRender: (text, record, index) => {
          return (text ? text : 0) + 'm²'
        }
      }],
      historyColumns: [{
        title: '项目名称',
        dataIndex: 'projectName'
      }, {
        title: '项目编号',
        dataIndex: 'projectNumber'
      }, {
        title: '项目登记时间',
        align: 'center',
        dataIndex: 'createDate'
      }, {
        title: '租赁期限',
        align: 'center',
        dataIndex: 'rentalLimit',
        customRender: (text, record, index) => {
          return text + '年'
        }
      }, {
        title: '租赁成交价',
        align: 'center',
        dataIndex: 'winningBidAmount',
        customRender: (text, record, index) => {
          return (text ? text : '-') + '元'
        }
      }],
      listData: [],
      historyData: [],
      localLoading: false,
      historyLoading: false,
      Urls: {
        listUrl: '/biz/oaAssets/assetsList',
        areaListUrl: '/auth/api/area/children/',
        historyListUrl: '/biz/oaAssets/getAboutAssetsProjectHistory/'
      },
      districtList: [],
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
      assetsTypeList: ['商业用房', '居住用房', '闲置土地使用权', '其他'],
      activeIndex: -1
    }
  },
  filters: {},
  created() {
    this.getList()
    this.getArea('520100', 'districtList')
  },
  methods: {
    // 资产列表
    getList() {
      this.localLoading = true
      axios({
        url: this.Urls.listUrl,
        method: 'post',
        data: this.listQuery
      }).then(res => {
        this.localLoading = false
        if (res.code == 0) {
          if (res.data && res.data.length > 0) {
            this.listData = res.data;
            this.activeIndex = 0
            this.getprojectHistory(res.data[0].assetsId)
          } else {
            this.listData = []
          }
        } else {
          this.$notification.error({
            message: res.msg
          })
        }
      }).catch(() => {
        this.localLoading = false
      })
    },
    rowClick(record, index) {
      return {
        on: {
          click: () => {
            this.activeIndex = index;
            this.getprojectHistory(record.assetsId)
          }
        }
      }
    },
    // 项目租赁历史
    getprojectHistory(id) {
      this.historyLoading = true
      axios({
        url: this.Urls.historyListUrl + id,
        method: 'get'
      }).then(res => {
        this.historyLoading = false
        if (res.code == 0) {
          this.historyData = res.data;
        } else {
          this.$notification.error({
            message: res.msg
          })
        }
      }).catch(function (error) {
        this.historyLoading = false
      });
    },
    // 地区
    getArea(id, data) {
      axios({
        url: this.Urls.areaListUrl + id,
        method: 'get'
      }).then(res => {
        this[data] = res.data.records
      })
    },
    // 搜索
    handleSearch() {
      this.getList()
    },
    searchReset() {
      this.listQuery.condition = {}
      this.getList()
    },
    setClassName(record, index) {
      return index === this.activeIndex ? "table-row-active" : "";
    },
  }
}
export default indexMixin