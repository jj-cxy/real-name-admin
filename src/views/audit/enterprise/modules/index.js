import {
  axios
} from '@/utils/request'
import pick from 'lodash.pick'
import moment from 'moment'

var indexMixin = {
  data() {
    return {
      Urls: {
        editUrl: '/ida/oaTask/complete',
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
      console.log('e', this.model)
      let ids = []
      ids.push(data.licenseUrl)
      this.model.qualifications.map((item, index) => {
        ids.push(item.qualificationContent)
      })
      this.getImg(ids.join())
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
            flag: flag,
            comment: values.comment,
            ins: {
              procInsId: this.$route.query.procInsId
            }
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
          debugger
          axios({
            url: this.Urls.assignUserUrl,
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
    getTypeUser() {
      axios({
        url: this.Urls.typeUserUrl,
        method: 'get',
        params: {
          orgId: localStorage.getItem('in-orgId'),
          role: 'Supervisor',
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
    handleCancel() {},
  }
}
export default indexMixin