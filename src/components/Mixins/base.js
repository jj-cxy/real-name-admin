import {
  axios
} from '@/utils/request'
var baseMixin = {
  data() {
    return {
      // 高级搜索 展开/关闭
      advanced: false,
      listQuery: {
        pageIndex: 1,
        pageSize: 10,
        condition: {
          name: this.$route.query.name || null,
          projectName: this.$route.query.name || null
        },
        orderBy: [{
          desc: true,
          orderBy: 'createTime'
        }]
      },
      mustQuery: {
        name: this.$route.query.name || null,
        projectName: this.$route.query.name || null
      },
      pagination: {
        total: 0,
        showTotal: total => `共 ${total} 条`,
        size: 'small',
        onChange: (page, pageSize) => this.onChangePage(page, pageSize),
        showSizeChanger: true,
        onShowSizeChange: (page, pageSize) => this.onShowSizeChange(page, pageSize)
      },
      columns: [],
      listData: [],
      localLoading: false,
      tableShow: false,
      defaultExpandAllRows: false,
      Urls: {
        listUrl: '',
        delUrl: '',
        dictTypeUrl: '/ida/api/dict/typeList',
        batchDelUrl: '',
        downloadExcelUrl: '',
        outputTempUrl: '',
        importExcelUrl: '',
        areaListUrl: '/auth/api/area/children/',
        fileIdsUrl: '',
        batchFileIdsUrl: '',
        downloadFilelUrl: '/file/api/file/batchDownload',
      },
      roleMark: localStorage.getItem('in-mark') ? localStorage.getItem('in-mark') : '',
      auth: {},
      /* 菜单权限控制 */
      selectedRowKeys: [],
      selectionRows: [],
      downloadFileName: 'xx列表',
      fileExt: '.xlsx',
      uploading: false,
      isShowDate: true,
      proviceList: [],
      cityList: [],
      districtList: [],
    }
  },
  mounted() {
    // let curId = Cookies.get('curId')
    // this.getButton(curId)
  },
  created() {},
  methods: {
    getButton(menuId) {
      axios({
        url: 'resource/typeChildren/' + menuId,
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
            this.listData = res.data.list;
          } else {
            this.listData = []
          }
          this.afterList()
        } else {
          this.$notification.error({
            message: res.msg
          })
        }
      }).finally(() => {
        this.localLoading = false
      })
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
        url: this.Urls.dictTypeUrl,
        method: 'get',
        params: {
          type: type
        }
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
    handleSearch() {
      this.listQuery.pageIndex = 1
      this.defaultExpandAllRows = false
      this.getList()
    },
    searchReset() {
      this.isShowDate = false
      this.$nextTick(() => {
        this.isShowDate = true
      });
      this.listQuery.pageIndex = 1
      this.listQuery.condition = Object.assign({}, this.mustQuery)
      this.getList()
    },
    // 加载列表数据-无分页
    getData() {
      this.localLoading = true
      axios({
        url: this.Urls.listUrl,
        method: 'get'
      }).then(res => {
        this.localLoading = false
        if (res.code == 0) {
          this.listData = res.data.records
          this.afterList()
        } else {
          this.$notification.error({
            message: res.msg
          })
        }
      })
    },
    onChangePage(page, pageSize) {
      this.selectedRowKeys = []
      this.selectionRows = []
      this.listQuery.pageIndex = page
      this.listQuery.pageSize = pageSize
      this.getList()
    },
    onShowSizeChange(page, pageSize) {
      this.selectedRowKeys = []
      this.selectionRows = []
      this.listQuery.pageIndex = page
      this.listQuery.pageSize = pageSize
      this.getList()
    },
    // 打开表单
    handleAdd() {
      this.$refs.modalForm.add()
      this.$refs.modalForm.dialogStatus = 'add'
    },
    afterSubmit() {
      this.getList()
    },
    // 编辑表单
    handleEdit(record) {
      this.$refs.modalForm.edit(record)
      this.$refs.modalForm.dialogStatus = 'edit'
    },
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
        title: '确定要删除您选择的数据么？',
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
    // 详情
    handleDetail(record) {
      this.$refs.detailForm.detail(record)
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

    // 选中项选中时
    onSelectChange(selectedRowKeys, selectionRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectionRows = selectionRows
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
    // 批量导出
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
        let fileName = this.downloadFileName + this.fileExt
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

    // 文件下载
    handleFileDownload(record) {
      axios({
        url: this.Urls.fileIdsUrl + record.id,
        method: 'get'
      }).then(res => {
        if (res.code == 0) {
          let id = res.data
          this.downloadFilel(id)
        }
      })
    },
    // 批量文件下载
    handleFileBatchDownload() {
      axios({
        url: this.Urls.batchFileIdsUrl,
        method: 'post',
        data: this.selectedRowKeys,
      }).then(res => {
        if (res.code == 0) {
          let ids = res.data.join()
          this.downloadFilel(ids)
        }
      })
    },
    downloadFilel(ids) {
      window.open(process.env.VUE_APP_BASE_API + this.Urls.downloadFilelUrl + '?ids=' + ids)
    },

    // 地区
    getArea(id, data) {
      axios({
        url: this.Urls.areaListUrl + id,
        method: 'get'
      }).then(res => {
        if (res.code == 0) {
          this[data] = res.data.records
          this.afterGetArea()
        } else {

        }
      })
    },
    afterGetArea() {},
    handleProviceChange(val) {
      this.getArea(val, 'cityList')
    },

    handleCityChange(val) {
      this.getArea(val, 'districtList')
    },

    // 查询条件 时间
    handleStartTime(date) {
      this.listQuery.condition.startTime = date
    },
    handleEndTime(date) {
      this.listQuery.condition.endTime = date
    },

    // 表格点击行事件
    rowClick(record, index) {
      return {
        on: {
          click: () => {
            this.handleDetail(record)
          }
        }
      }
    },
  }
}
export default baseMixin