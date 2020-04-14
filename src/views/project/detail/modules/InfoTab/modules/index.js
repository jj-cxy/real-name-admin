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
        addUrl: '/biz/oaDisclosure/disclosureInsert',
        editUrl: '/biz/oaDisclosure/disclosureUpdate/',
        getByIdUrl: '/biz/oaDisclosure/get/',
        assetByIdUrl: '/biz/oaAssets/get/'
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
      singleFile: true
    }
  },
  created() {},
  methods: {
    setValue(data) {
      this.model = data
      this.initMap()
      console.log('详情', this.model)
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
    }
  }
}
export default indexMixin