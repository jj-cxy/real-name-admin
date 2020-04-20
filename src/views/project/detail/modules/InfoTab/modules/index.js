import {
  axios
} from '@/utils/request'
import pick from 'lodash.pick'
import BMap from 'BMap'

var indexMixin = {
  props: {
    data: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      Urls: {
        addUrl: '/biz/oaDisclosure/disclosureInsert',
        editUrl: '/biz/oaDisclosure/disclosureUpdate/',
        getByIdUrl: '/biz/oaDisclosure/get/'
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
        units: [],
        salaryBankAccount: {}
      },
    }
  },
  created() {},
  mounted() {
    console.log('详细', this.data)
    this.model = this.data
    this.initMap()
  },
  methods: {
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
    }
  }
}
export default indexMixin