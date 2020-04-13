import {
  axios
} from '@/utils/request'
import moment from 'moment'

var indexMixin = {
  data() {
    return {
      textMap: {
        add: '新增机构',
        edit: '编辑机构'
      },
      // 查询参数
      listQuery: {
        condition: {
          parentId: '0'
        }
      },
      // 表头
      columns: [{
        title: '机构名称',
        dataIndex: 'name'
      }, {
        title: '成员数量',
        dataIndex: 'userCount',
        align: 'center'
      }, {
        title: '所属地区',
        dataIndex: 'areaName',
        align: 'center'
      }, {
        title: '操作',
        dataIndex: 'action',
        align: 'center',
        width: '140px',
        fixed: 'right',
        scopedSlots: {
          customRender: 'action'
        }
      }],
      labelCol: {
        xs: {
          span: 24
        },
        sm: {
          span: 3
        }
      },
      wrapperCol: {
        xs: {
          span: 24
        },
        sm: {
          span: 21
        }
      },
      Urls: {
        listUrl: '/auth/api/org/page',
        addUrl: '/auth/api/org/insert',
        editUrl: '/auth/api/org/update/',
        getByIdUrl: '/auth/api/org/get/',
        delUrl: '/auth/api/org/delete/',
        subListUrl: '/auth/api/org/children/',
        treeListUrl: '/auth/api/org/tree'
      },
      provinceList: [],
      cityList: [],
      districtList: [],
      orgTypeList: [],
      treeData: [],
      isDisabled: false
    }
  },
  filters: {},
  created() {
    this.getList()
  },
  methods: {
    resetForm() {
      this.getArea('100000', 'provinceList')
      this.getArea('520000', 'cityList')
      this.getArea('520100', 'districtList')
      this.isDisabled = false
      this.getTreeData()
      this.cityList = []
      this.districtList = []
    },
    getTreeData() {
      axios({
        url: this.Urls.treeListUrl,
        method: 'get'
      }).then(res => {
        let resData = res.data.records
        this.treeData = resData.map(item => this.mapTree(item))
      })
    },
    setForm(res) {
      this.mdl.id = res.data.id
      let areaArr = res.data.area.parentIds.split(',')
      if (areaArr[2]) {
        this.getArea(areaArr[1], 1)
        this.getArea(areaArr[2], 2)
      } else {
        this.getArea(areaArr[1], 1)
      }
      this.$nextTick(() => {
        this.form.setFieldsValue({
          parentId: res.data.parentId,
          name: res.data.name,
          level: res.data.level.toString(),
          type: res.data.type,
          proviceId: areaArr[1],
          cityId: (areaArr[1] && !areaArr[2]) ? res.data.area.id : areaArr[2],
          districtId: areaArr[2] ? res.data.area.id : ''
        })
      })
    },
    beforeSubmit(form) {
      /* if (form.proviceId && !form.cityId) {
        form.areaId = form.proviceId
      } else if (form.cityId && !form.districtId) {
        form.areaId = form.cityId
      } else {
        form.areaId = form.districtId
      } */
      form.orgStatus = "ENABLED"
      if (!form.parentId || form.parentId == '') {
        form.parentId = 0
      }
      return form
    },
    handleSub(record) {
      this.mdl = {}
      this.form.resetFields()
      this.resetForm()
      this.visible = true
      this.dialogStatus = 'add'
      this.isDisabled = true
      this.$nextTick(() => {
        this.form.setFieldsValue({
          parentId: record.id
        })
      })
    },
    // 省市区级联
    handleProvinceChange(val) {
      this.form.resetFields('cityId', '')
      this.form.resetFields('districtId', '')
      this.cityList = []
      this.districtList = []
      this.getArea(val, 'cityList')
    },
    handleCityChange(val) {
      this.form.resetFields('districtId', '')
      this.districtList = []
      this.getArea(val, 'districtList')
    }
  }
}
export default indexMixin