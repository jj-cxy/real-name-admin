import {
  axios
} from '@/utils/request'
import pick from 'lodash.pick'

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
      treeData: [{
        title: '根节点',
        key: '0',
        value: '0',
        children: []
      }]
    }
  },
  filters: {},
  created() {
    this.getList()
  },
  methods: {
    resetForm() {
      this.getArea('100000', 'provinceList')
      this.getTreeData()
      this.isDisabled = false
    },
    getTreeData() {
      axios({
        url: this.Urls.treeListUrl,
        method: 'get'
      }).then(res => {
        let resData = res.data.records
        this.treeData = resData.map(item => this.mapTree(item))
        this.treeData.unshift({
          title: '根节点',
          key: '0',
          value: '0',
          children: []
        })
      })
    },
    setForm(data) {
      this.getArea(data.provinceId, 'cityList')
      this.getArea(data.cityId, 'districtList')
      this.$nextTick(() => {
        this.form.setFieldsValue(pick(data, 'parentId', 'name', 'proviceId', 'cityId', 'areaId', 'remark'))
      })
    },
    beforeSubmit(form) {
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
      this.getArea(val, 'cityList')
    },
    handleCityChange(val) {
      this.getArea(val, 'districtList')
    }
  }
}
export default indexMixin