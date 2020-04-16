import {
  axios
} from '@/utils/request'
import moment from 'moment'

var modalMixin = {
  data() {
    return {
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
      labelMinCol: {
        xs: {
          span: 24
        },
        sm: {
          span: 6
        }
      },
      wrapperMInCol: {
        xs: {
          span: 24
        },
        sm: {
          span: 18
        }
      },
      Urls: {
        addUrl: '',
        editUrl: '',
        getByIdUrl: '',
        imgListUrl: '/file/api/file/batchSelect',
        uploadFileUrl: '/file/api/file/upload',
        delFileUrl: '/file/api/file/delete/',
        projectByIdUrl: '/biz/oaProject/get/'
      },
      form: this.$form.createForm(this),
      visible: false,
      confirmLoading: false,
      isDisabled: false,
      model: {},
      textMap: {
        add: '新增',
        edit: '编辑',
        detail: '详情'
      },
      dialogStatus: 'add',
      tips: {
        add: '新增成功',
        edit: '修改成功'
      },
      validatorRules: {
        must: {
          rules: [{
            required: true,
            message: '此字段为必填!'
          }]
        },
        name: {
          rules: [{
              required: true,
              message: '请输入角色名称!'
            },
            {
              min: 2,
              max: 30,
              message: '长度在 2 到 30 个字符',
              trigger: 'blur'
            }
          ]
        }
      },
      fileList: [],
      uploading: false,
      singleFile: false
    }
  },
  mounted() {},
  methods: {

    // 表单打开之前
    beforeOpen() {
      this.fileList = []
    },

    // 新增表单
    add() {
      this.edit({})
    },

    // 编辑表单
    edit(record) {
      this.beforeOpen(record)
      this.form.resetFields()
      this.model = Object.assign({}, record)
      this.visible = true
      this.setForm(this.model)
    },

    // 查看详情
    detail(record) {
      this.form.resetFields()
      this.beforeOpen(record)
      this.visible = true
      this.fillForm(record)
    },

    setForm(data) {},

    // 详情表单
    fillForm(record) {
      this.confirmLoading = true
      axios({
        url: this.Urls.getByIdUrl + record.id,
        method: 'get'
      }).then(res => {
        this.confirmLoading = false
        if (res.code == 0) {
          this.setForm(res.data)
        } else {
          this.afterFill()
          this.$notification.error({
            message: res.msg
          })
        }
      }).catch(() => {
        this.afterFill()
        this.confirmLoading = false
      })
    },
    afterFill() {},

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
            url: this.model.id ? (this.Urls.editUrl + this.model.id) : this.Urls.addUrl,
            method: 'post',
            data: values
          }).then(res => {
            this.confirmLoading = false
            if (res.code == 0) {
              this.$notification.success({
                message: this.model.id ? this.tips.edit : this.tips.add
              })
              this.visible = false
              this.afterSubmit()
              this.$emit('ok')
            } else {
              this.$notification.error({
                message: res.msg
              })
            }
          }).catch(() => {
            this.localLoading = false
          })
        } else {
          this.confirmLoading = false
        }
      })
    },
    afterSubmit() {},
    beforeSubmit(form) {},
    close() {
      this.$emit('close')
      this.visible = false
    },
    handleCancel() {
      this.close()
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

    // 获取图片列表
    getImg(ids) {
      axios({
        url: this.Urls.imgListUrl,
        method: 'get',
        params: {
          ids: ids
        }
      }).then(res => {
        let resData = []
        for (let i = 0; i < res.data.length; i++) {
          resData[i] = {
            uid: res.data[i].id,
            name: res.data[i].name,
            status: res.data[i].status,
            url: res.data[i].url,
            ext: res.data[i].ext,
          }
        }
        this.fileList = resData
      })
    },

    // 文件上传
    beforeUpload(file) {
      const isXLSX = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
      const isDOCX = file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
      const isPDF = file.type === 'application/pdf';
      const isJPG = file.type === 'image/jpeg';
      const isPNG = file.type === 'image/png';
      if (!isXLSX && !isDOCX && !isPDF && !isJPG && !isPNG) {
        this.$message.error('上传格式有误')
        return false
      }

      const isLt20M = file.size / 1024 / 1024 < 20
      if (!isLt20M) {
        this.$message.error('文件大小不能超过20M!')
        return false
      }
      if (this.fileList.length > 0 && !this.singleFile) {
        this.$message.error('上传文件数量只限制1个')
        // this.handleFileRemove(this.fileList[0])
        return false
      }
      this.uploadFile(file)
      return false
    },
    uploadFile(file) {
      let formData = new FormData()
      formData.append('file', file);
      this.uploading = true;
      axios({
        url: this.Urls.uploadFileUrl,
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
            message: '上传成功'
          })
          this.fileList.push({
            uid: res.data.id,
            name: res.data.name,
            status: res.data.status,
            url: res.data.url,
            ext: res.data.ext
          })
          this.afterUpload(res.data)
        } else {
          this.$notification.error({
            message: res.msg
          })
        }
      }).finally(() => {
        this.uploading = false;
      })
    },
    afterUpload() {},

    handlePreview(file) {
      if (file.ext == 'jpg' || file.ext == 'jpeg' || file.ext == 'png') {
        this.$refs.viewModal.handleView(file.url)
      } else if (file.ext == 'docx' || file.ext == 'pdf' || file.ext == 'xlsx') {
        this.$refs.viewModal.handleFile(file.url)
      }

    },
    handleFileRemove(file) {
      axios({
        url: this.Urls.delFileUrl + file.uid,
        method: 'get'
      }).then(res => {
        if (res.code == 0) {
          this.$notification.success({
            message: '删除成功'
          })
          const index = this.fileList.indexOf(file);
          const newFileList = this.fileList.slice();
          newFileList.splice(index, 1);
          this.fileList = newFileList;
        } else {
          this.$notification.error({
            message: res.msg
          })
        }
      })
    },
    // 不可选择的时间
    disabledDate(current) {
      // Can not select days before today and today
      // return current && current < moment().endOf('day');
      return current && current < moment().subtract(1, "days");
    },
  }
}
export default modalMixin