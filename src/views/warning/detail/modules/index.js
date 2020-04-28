import {
  axios
} from '@/utils/request'
import pick from 'lodash.pick'

var indexMixin = {
  data() {
    return {
      Urls: {
        getByIdUrl: '/ida/api/warning/history/get/',
        projectByIdUrl: '/ida/api/project/get/'
      },
      labelCol: {
        xl: {
          span: 3
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
          span: 19
        },

        lg: {
          span: 17
        },
        md: {
          span: 24
        }
      },
      model: {
        qualifications: []
      }
    }
  },
  created() {
    let params = this.$route.query
    this.fillForm(params)
  },
  methods: {
    getProjectById(id) {
      axios({
        url: this.Urls.projectByIdUrl + id,
        method: 'get'
      }).then(res => {
        if (res.code == 0) {
          this.model = Object.assign(res.data, this.model)
          if (res.data.units.length > 0) {
            res.data.units.map((item, index) => {
              if (item.roleType == 'CONSTRUCTION_UNIT') {
                item.persons.map((item1, index1) => {
                  if (item1.personType == 'MANAGER') {
                    this.$set(this.model, 'projectManagerName', item1.personName)
                    this.$set(this.model, 'projectPhone', item1.personPhone)
                  }
                })
              }
            })
          }
          let province = `${res.data.province}`
          let city = `${res.data.city}${res.data.district}${res.data.address}`
          this.initMap(province, city)
          console.log('values...', this.model)
        } else {
          this.$notification.error({
            message: res.msg
          })
        }
      })
    },
    setForm(data) {
      this.getProjectById(data.projectId)
      this.model = data
    },
    initMap(p, c) {
      var map = new BMap.Map("allmap");
      var point = new BMap.Point(106.709177, 26.629907);

      var myGeo = new BMap.Geocoder();
      myGeo.getPoint(c, function (point) {
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
      }, p);
    }
  }
}
export default indexMixin