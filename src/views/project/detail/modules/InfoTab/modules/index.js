import {
  axios
} from '@/utils/request'
import pick from 'lodash.pick'
import moment from 'moment'
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
      model: {},
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
          map.centerAndZoom(point, 16);
          var marker = new BMap.Marker(point);
          map.addOverlay(marker);
          marker.setAnimation(BMAP_ANIMATION_BOUNCE);
          // map.panTo(point);
        } else {
          alert("您选择地址没有解析到结果!");
        }
      }, "贵州省");
    }
  }
}
export default indexMixin