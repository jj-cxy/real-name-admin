import {
  axios
} from '@/utils/request'

var baseMixin = {
  data() {
    return {
      visible: false,
      confirmLoading: false,
      labelCol: {
        xs: {
          span: 24
        },
        sm: {
          span: 5
        }
      },
      wrapperCol: {
        xs: {
          span: 24
        },
        sm: {
          span: 19
        }
      },
      mdl: {},
      textMap: {
        add: '新增',
        edit: '编辑'
      },
      dialogStatus: 'add',
      form: this.$form.createForm(this),
      // 高级搜索 展开/关闭
      advanced: false,
      listQuery: {
        pageIndex: 1,
        pageSize: 10,
        condition: {}
      },
      listData: [],
      pagination: {
        total: 0,
        showTotal: total => `共 ${total} 条`,
        size: 'small',
        onChange: (page, pageSize) => this.onChangePage(page, pageSize),
        showSizeChanger: true,
        onShowSizeChange: (page, pageSize) => this.onShowSizeChange(page, pageSize)
      },
      localLoading: false,
      Urls: {
        listUrl: '',
        addUrl: '',
        editUrl: '',
        getByIdUrl: '',
        delUrl: '',
        dictTypeUrl: '/dict/typeList/',
        batchDelUrl: '',
        downloadExcelUrl: '',
        childrenMenusUrl: '/auth/api/resource/typeChildren/',
        areaListUrl: '/auth/api/area/children/'
      },
      auth: {},
      categorys: [],
      tableShow: true,
      defaultExpandAllRows: false,
      selectedRowKeys: [],
      downloadFileName: '',
      uploading: false,
      provinceList: [],
      cityList: [],
      districtList: [],
      isDisabled: false
    }
  },
  mounted() {
    /* console.log('菜单', Cookies.get('curId'))
    let curId = Cookies.get('curId') */
    // this.getButton(curId)
  },
  methods: {
    getButton(menuId) {
      axios({
        url: this.Urls.childrenMenusUrl + menuId,
        method: 'get',
        params: {
          type: 'BUTTON'
        }
      }).then(res => {
        if (res.code == 0) {
          let resData = res.data.records
          resData.map(item => {
            switch (item.path) {
              case 'insert':
                this.auth.insert = true
                break
              case 'update':
                this.auth.update = true
                break
              case 'delete':
                this.auth.delete = true
                break
              case 'reset':
                this.auth.reset = true
                break
              case 'forbid':
                this.auth.forbid = true
                break
            }
          })
          console.log('按钮', this.auth)
        }
      })
    },
    // 加载列表数据
    getList() {
      this.localLoading = true
      axios({
        url: this.Urls.listUrl,
        method: 'post',
        data: this.listQuery
      }).then(res => {
        this.localLoading = false
        if (res.code == 0) {
          this.pagination.total = res.data.total
          if (res.data.list) {
            let dataSource = res.data.list.map(item => {
              // 判断是否标记了带有子级
              if (item.isLeaf == 0) {
                if (item.children && item.children.length > 0) {
                  this.updateForce()
                  this.defaultExpandAllRows = true
                } else {
                  // 定义默认展开时显示的loading子级，实际子级数据只在展开时加载
                  let loadChild = {
                    id: `${item.id}_loadChild`,
                    name: 'loading...',
                    isLoading: true
                  }
                  item.children = [loadChild]
                }
              } else {
                item.children = null
              }
              return item
            })
            this.listData = dataSource
          } else {
            this.listData = res.data.list || []
          }
          this.afterList()
        } else {
          this.$notification.error({
            message: res.msg
          })
        }
      }).catch(() => {
        this.localLoading = false
      })
    },
    // 选中项选中时
    onSelectChange(selectedRowKeys, selectionRows) {
      console.log(selectedRowKeys, selectionRows)
      this.selectedRowKeys = selectedRowKeys
      this.selectionRows = selectionRows
    },
    // 表格字段排序
    handleTableChange(pagination, filters, sorter) {
      if (Object.keys(sorter).length > 0) {
        this.listQuery.orderBy[0].desc = (sorter.order == 'ascend') ? false : true
        this.listQuery.orderBy[0].orderBy = sorter.field
      }
      this.listQuery.pageIndex = pagination.current
      this.listQuery.pageSize = pagination.pageSize
      this.getList()
    },
    afterList() {
      if (this.listData.length == 0 && this.listQuery.pageIndex != 1) {
        this.listQuery.pageIndex -= 1
        this.getList()
      }
    },
    // 获取字典数据
    getDictData(type, data) {
      axios({
        url: this.Urls.dictTypeUrl + type,
        method: 'get'
      }).then(res => {
        if (res.code == 0) {
          this[data] = res.data.records
          this.afterGetDict()
        } else {
          this.$notification.error({
            message: res.msg
          })
        }
      })
    },
    afterGetDict() {},
    updateForce() {
      this.tableShow = false
      this.$nextTick(() => {
        this.tableShow = true
      })
    },
    handleSearch() {
      this.listQuery.pageIndex = 1
      this.defaultExpandAllRows = false
      this.updateForce()
      this.getList()
    },
    searchReset() {
      this.listQuery.condition = {
        userId: localStorage.getItem('in-userId') || ''
      }
      this.listQuery.pageIndex = 1
      this.updateForce()
      this.getList()
    },
    onChangePage(page, pageSize) {
      this.selectedRowKeys = []
      this.listQuery.pageIndex = page
      this.listQuery.pageSize = pageSize
      this.getList()
    },
    onShowSizeChange(page, pageSize) {
      this.selectedRowKeys = []
      this.listQuery.pageIndex = page
      this.listQuery.pageSize = pageSize
      this.getList()
    },
    // 打开表单
    handleAdd() {
      this.mdl = {}
      this.form.resetFields()
      this.resetForm()
      this.dialogStatus = 'add'
      this.visible = true
    },
    // 重置表单
    resetForm() {},
    // 编辑表单
    handleEdit(record) {
      this.mdl = {}
      this.form.resetFields()
      this.resetForm()
      this.dialogStatus = 'edit'
      this.visible = true
      this.fillForm(record)
    },
    // 提交表单
    handleSubmit(e) {
      e.preventDefault();
      const {
        form: {
          validateFields
        }
      } = this
      this.confirmLoading = true
      validateFields((errors, values) => {
        if (!errors) {
          this.beforeSubmit(values)
          axios({
            url: this.mdl.id ? (this.Urls.editUrl + this.mdl.id) : this.Urls.addUrl,
            method: 'post',
            data: values
          }).then(res => {
            this.confirmLoading = false
            if (res.code == 0) {
              this.$notification.success({
                message: this.mdl.id ? '编辑成功' : '新增成功'
              })
              this.visible = false
              this.updateForce()
              this.afterSubmit()
            } else {
              this.$notification.error({
                message: res.msg
              })
            }
          }).catch(() => {
            this.confirmLoading = false
          })
        } else {
          this.confirmLoading = false
        }
      })
    },
    // 表单提交之前执行
    beforeSubmit(form) {
      return form
    },
    // 表单提交完成后执行
    afterSubmit() {
      this.getList()
    },
    // 回填表单
    fillForm(record) {
      axios({
        url: this.Urls.getByIdUrl + record.id,
        method: 'get'
      }).then(res => {
        if (res.code == 0) {
          this.mdl = res.data
          this.setForm(res.data)
        } else {
          this.$notification.error({
            message: res.msg
          })
        }
      })
    },
    setForm(data) {},
    // 删除数据
    handleDel(record) {
      var _this = this
      _this.$confirm({
        title: '确定要删除该条数据么？',
        content: '删除不可恢复',
        centered: true,
        okType: 'danger',
        onOk() {
          axios({
            url: _this.Urls.delUrl + record.id,
            method: 'get'
          }).then(res => {
            if (res.code == 0) {
              _this.$notification.success({
                message: '删除成功'
              })
              _this.updateForce()
              _this.getList()
            } else {
              _this.$notification.error({
                message: res.msg
              })
            }
          })
        },
        class: 'test'
      })
    },
    // 批量删除
    handleBatchDel() {
      var _this = this
      _this.$confirm({
        title: '确定要批量删除您选择的数据么？',
        content: '删除不可恢复',
        centered: true,
        okType: 'danger',
        onOk() {
          axios({
            url: _this.Urls.batchDelUrl,
            method: 'post',
            data: {
              ids: _this.selectedRowKeys
            }
          }).then(res => {
            if (res.code == 0) {
              _this.$notification.success({
                message: '删除成功'
              })
              _this.getList()
            } else {
              _this.$notification.error({
                message: res.msg
              })
            }
          })
        },
        class: 'test'
      })
    },
    // 点击展开树图标
    handleExpand(expanded, record) {
      // 判断是否是展开状态
      if (expanded) {
        // 判断子级的首个项的标记是否是“正在加载中”，如果是就加载数据
        if (record.children[0].isLoading === true) {
          const id = record.id
          const data = this.listData
          axios({
            url: this.Urls.subListUrl + record.id,
            method: 'get'
          }).then(res => {
            if (res.code == 0) {
              const children = res.data.records || []
              const dataMap = (items) => {
                items.find((item) => {
                  if (item.id === id) {
                    item.children = children
                    for (let i = 0; i < item.children.length; i++) {
                      if (item.children[i].isLeaf == 0) {
                        let loadChild = {
                          id: `${item.children[i].id}_loadChild`,
                          name: 'loading...',
                          isLoading: true
                        }
                        item.children[i].children = [loadChild]
                      }
                    }
                    return items
                  }
                  if (item.children && item.children.length > 0) {
                    dataMap(item.children)
                  }
                })
              }
              dataMap(data || [])
            } else {
              this.$notification.error({
                message: res.msg
              })
            }
          })
        }
      }
    },
    // 格式化树结构
    mapTree(item) {
      const haveChildren = Array.isArray(item.children) && item.children.length > 0
      return {
        title: item.name,
        key: item.id,
        value: item.id,
        children: haveChildren ? item.children.map(i => this.mapTree(i)) : []
      }
    },
    // 展开
    toggleAdvanced() {
      this.advanced = !this.advanced
    },
    // 全选
    allSelect() {
      this.selectedRowKeys = this.listData.map(item => {
        return item.id
      })
    },
    // 反选
    reverseSelect() {
      let newArr = this.listData.filter(item => !this.selectedRowKeys.some(ele => ele === item.id))
      this.selectedRowKeys = newArr.map(item => item.id)
    },
    // 更多操作
    handleMenuClick(e) {
      if (this.selectedRowKeys.length == 0) {
        this.$notification.warning({
          message: '请至少选择一条数据'
        })
        return
      }
      switch (e.key) {
        case 'download':
          this.handleDownload()
          break;
        case 'del':
          this.handleBatchDel('DISABLE')
      }
      this.selfMenuClick(e)
    },
    selfMenuClick(e) {},
    // 批量导出excel
    handleDownload() {
      axios({
        url: this.Urls.downloadExcelUrl,
        method: 'post',
        data: {
          ids: this.selectedRowKeys
        },
        responseType: 'blob'
      }).then(res => {
        if (!res) {
          return
        }
        const blob = new Blob([res])
        let fileName = this.downloadFileName + '.xlsx'
        if ('download' in document.createElement('a')) {
          // 非IE下载
          const elink = document.createElement('a')
          elink.download = fileName
          elink.style.display = 'none'
          elink.href = URL.createObjectURL(blob)
          document.body.appendChild(elink)
          elink.click()
          URL.revokeObjectURL(elink.href) // 释放URL 对象
          document.body.removeChild(elink)
        } else {
          // IE10+下载
          navigator.msSaveBlob(blob, fileName)
        }
      })
    },
    // 上传excel数据
    beforeUpload(file, fileList) {

      // image/jpeg
      // image/png  
      // application/vnd.openxmlformats-officedocument.wordprocessingml.document
      // application/pdf
      // application/vnd.openxmlformats-officedocument.spreadsheetml.sheet

      const isXLSX = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
      if (!isXLSX) {
        this.$message.error('导入文件格式有误,只支持.xlsx格式')
        return false
      }

      this.handleImport(file)
      return false
    },
    // 导入
    handleImport(file) {
      var formData = new FormData()
      formData.append('file', file)
      this.uploading = true;
      axios({
        url: this.Urls.importExcelUrl,
        method: 'post',
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        timeout: 0,
        data: formData
      }).then(res => {
        this.uploading = false;
        if (res.code == 0) {
          this.$notification.success({
            message: '导入成功'
          })
          this.getList()
        } else {
          this.$notification.error({
            message: res.msg
          })
        }
      }).finally(() => {
        this.uploading = false;
      })
    },
    // 下载所有模板
    handleOutput() {
      window.open(process.env.VUE_APP_BASE_API + this.Urls.outputTempUrl)
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
  }
}
export default baseMixin