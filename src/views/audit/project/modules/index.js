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
        auditUrl: '/ida/api/project/examine/',
        editUrl: '/ida/api/project/supervisor/modify/',
        getByIdUrl: '/ida/api/project/get/',
        typeUserUrl: '/auth/api/account/biz/query',
        assignUserUrl: '/ida/api/project/master/record/assign'
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
      model: {
        units: [],
        salaryBankAccount: {}
      },
      singleFile: true,
      typeUserList: [],
      bizType: this.$route.query.bizType ? this.$route.query.bizType : '',
    }
  },
  mounted() {
    let params = this.$route.query;
    this.fillForm(params);
    this.getTypeUser();
  },
  created() {},
  methods: {
    setForm(data) {
      this.model = data
      console.log('detail', this.model)
      let ids = []
      ids.push(data.constructionPermitNumberUrl)
      this.getImg(ids.join())
      // 加载地图
      this.initMap();
    },
    initMap() {
      var map = new BMap.Map("allmap");
      var point = new BMap.Point(106.709177, 26.629907);

      var city = "贵阳市观山湖区北京西路38号世纪金源购物中心金阳建设大厦26楼"
      var myGeo = new BMap.Geocoder();
      myGeo.getPoint(city, function (point) {
        if (point) {
          map.clearOverlays();
          map.centerAndZoom(point, 11);
          var marker = new BMap.Marker(point);
          map.addOverlay(marker);
          // map.enableScrollWheelZoom(false);
          map.panTo(point);
          marker.setAnimation(BMAP_ANIMATION_BOUNCE);

          // 添加带有定位的导航控件
          var navigationControl = new BMap.NavigationControl({
            // 靠左上角位置
            anchor: BMAP_ANCHOR_TOP_LEFT,
            // LARGE类型
            type: BMAP_NAVIGATION_CONTROL_LARGE,
            // 启用显示定位
            enableGeolocation: true
          });
          map.addControl(navigationControl);

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
            bizType: this.bizType || 'PROJECT_RECORD',
            pass: flag,
            suggestion: values.comment,
            roleType: this.model.supervisorId ? 'Supervisor' : 'SupervisorMaster'
          }
          axios({
            url: this.Urls.auditUrl + this.model.id,
            method: 'get',
            params: formData
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
    // 修改发起
    handleForm(e) {
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
            suggestion: values.comment
          }
          axios({
            url: this.Urls.editUrl + this.model.id,
            method: 'get',
            params: formData
          }).then(res => {
            this.confirmLoading = false
            if (res.code == 0) {
              this.$notification.success({
                message: '发起成功'
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
          axios({
            url: this.Urls.assignUserUrl + "/" + this.model.id + "/" + (values.supervisorId ? values.supervisorId.key : null),
            method: 'get',
            params: {
              supervisorName: values.supervisorId ? values.supervisorId.label : null
            }
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
          role: this.roleMark == "SupervisorMaster" ? 'Supervisor' : 'Quality',
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