import {
  axios
} from '@/utils/request'
import pick from 'lodash.pick'
import moment from 'moment'

var indexMixin = {
  data() {
    return {
      Urls: {
        editUrl: '/ida/api/enterprise/complete',
        getByIdUrl: '/ida/api/enterprise/get/',
        typeUserUrl: '/auth/api/account/biz/query',
        assignUserUrl: '/ida/api/enterprise/master/assign'
      },
      labelCol: {
        xl: {
          span: 4
        },
        lg: {
          span: 5
        },
        md: {
          span: 24
        }
      },
      wrapperCol: {
        xl: {
          span: 20
        },

        lg: {
          span: 19
        },
        md: {
          span: 24
        }
      },
      validatorRules: {
        must: {
          rules: [{
            required: true,
            message: '此字段为必填!'
          }]
        }
      },
      fileList: [],
      model: {},
      singleFile: true,
      model: {
        qualifications: []
      },
      typeUserList: []
    }
  },
  created() {},
  mounted() {
    let params = this.$route.query;
    this.fillForm(params);
    this.getTypeUser();
  },
  methods: {
    setForm(data) {
      this.model = data
      let ids = []
      ids.push(data.licenseUrl)
      if (data.safetyLicenceUrl) {
        ids.push(data.safetyLicenceUrl)
      }
      this.model.qualifications.map((item, index) => {
        ids.push(item.qualificationContent)
      })
      this.getImg(ids.join())

    },
    afterGetImg() {
      /* this.fileList.map((item, index) => {
        item.title = '资质证书'
      })
      this.fileList[0]['title'] = '营业执照'
      this.fileList[1]['title'] = '安全生产许可证' */
    },
    // 审核
    handleSubmit(flag, e) {
      e.preventDefault();
      const {
        form: {
          validateFields
        }
      } = this
      this.confirmLoading = true
      validateFields((errors, values) => {
        if (!errors) {
          let formData = {
            flow: {
              flag: flag,
              comment: values.comment,
            },
            procInsId: this.$route.query.procInsId,
            mark: this.roleMark
          }
          axios({
            url: this.Urls.editUrl,
            method: 'post',
            data: formData
          }).then(res => {
            this.confirmLoading = false
            if (res.code == 0) {
              this.$notification.success({
                message: '审核成功'
              })
              this.afterSubmit()
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
    // 分配人员
    handleNext(e) {
      e.preventDefault();
      const {
        form: {
          validateFields
        }
      } = this
      this.confirmLoading = true
      validateFields((errors, values) => {
        if (!errors) {
          console.log('form values...', values)
          let formData = {
            id: this.model.id,
            supervisorId: values.supervisorId ? values.supervisorId.key : null,
            supervisorName: values.supervisorId ? values.supervisorId.label : null,
            qualityId: values.qualityId ? values.qualityId.key : null,
            qualityName: values.qualityId ? values.qualityId.label : null
          }
          axios({
            url: this.Urls.assignUserUrl,
            method: 'post',
            data: formData
          }).then(res => {
            this.confirmLoading = false
            if (res.code == 0) {
              this.$notification.success({
                message: '分配成功'
              })
              this.afterSubmit()
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
    afterSubmit() {
      this.$router.push({
        path: '/workplace/index'
      })
    },
    getTypeUser() {
      let role = ""
      if (this.roleMark.split(',').includes('SupervisorMaster')) {
        if (!this.model.supervisorId) {
          role = 'Supervisor'
        }
      } else if (this.roleMark.split(',').includes('QualityMaster')) {
        if (!this.model.qualityId) {
          role = 'Quality'
        }
      }
      axios({
        url: this.Urls.typeUserUrl,
        method: 'get',
        params: {
          orgId: localStorage.getItem('in-orgId'),
          role: role,
          uniCode: '',
          areaId: ''
        }
      }).then(res => {
        if (res.code == 0) {
          this.typeUserList = res.data
        } else {
          this.$notification.error({
            message: res.msg
          })
        }
      }).catch(() => {})
    },
    handleCancel() {
      this.close()
    },
    close() {
      this.$emit('close');
      this.afterSubmit()
    },
  }
}
export default indexMixin