import {
  axios
} from '@/utils/request'
import pick from 'lodash.pick'
import moment from 'moment'
import BMap from 'BMap'

var indexMixin = {
  data() {
    return {
      Urls: {
        editUrl: '/ida/api/project/master/record/examine',
        getByIdUrl: '/ida/api/project/get/',
        typeUserUrl: '/auth/api/account/biz/query',
        assignUserUrl: '/api/project/master/record/assign'
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
      typeUserList: []
    }
  },
  mounted() {
    let params = this.$route.query;
    this.fillForm(params);

    this.initMap();
    this.getTypeUser();
  },
  created() {},
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
    initMap() {
      var map = new BMap.Map("allmap");
      var point = new BMap.Point(106.709177, 26.629907);
      map.centerAndZoom(point, 16);
      var marker = new BMap.Marker(point);
      map.addOverlay(marker);

      var city = "贵阳市观山湖区北京西路38号世纪金源购物中心金阳建设大厦26楼"
      var myGeo = new BMap.Geocoder();
      myGeo.getPoint(city, function (point) {
        if (point) {
          map.clearOverlays();
          map.centerAndZoom(point, 16);
          map.addOverlay(new BMap.Marker(point));
          map.panTo(point);
        } else {
          alert("您选择地址没有解析到结果!");
        }
      }, "贵州省");
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
      axios({
        url: this.Urls.typeUserUrl,
        method: 'get',
        params: {
          orgId: localStorage.getItem('in-orgId'),
          role: this.roleMak == "SupervisorMaster" ? 'Supervisor' : 'Quality',
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