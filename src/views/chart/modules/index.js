import {
  axios
} from '@/utils/request';
import Vue from 'vue'
import echarts from 'echarts'

var indexMixin = {
  data() {
    return {
      loading: false,
      Urls: {
        listUrl: ''
      },
      projectTypeList: {
        legendData: ['公建项目', '市政项目', '民建项目', '其他工程'],
        seriesData: [{
            name: '公建项目',
            value: 80
          },
          {
            name: '市政项目',
            value: 80
          },
          {
            name: '民建项目',
            value: 80
          },
          {
            name: '其他工程',
            value: 80
          }
        ]
      },
      projectRadioList: {
        seriesData: [{
            value: 101,
            name: '云岩区'
          },
          {
            value: 79,
            name: '南明区'
          },
          {
            value: 136,
            name: '观山湖'
          },
          {
            value: 123,
            name: '白云区'
          },
          {
            value: 99,
            name: '乌当区'
          },
          {
            value: 101,
            name: '花溪区'
          },
          {
            value: 79,
            name: '双龙镇'
          },
          {
            value: 136,
            name: '经开区'
          },
          {
            value: 123,
            name: '综保区'
          },
          {
            value: 99,
            name: '高新区'
          },
          {
            value: 101,
            name: '清镇市'
          },
          {
            value: 79,
            name: '息烽县'
          },
          {
            value: 136,
            name: '开阳县'
          },
          {
            value: 123,
            name: '修文县'
          }
        ]
      },
      inOutRadioList: {
        innerData: [{
            value: 100,
            unit: '个',
            name: '行业大类1'
          },
          {
            value: 100,
            unit: '个',
            name: '行业大类2'
          },
          {
            value: 250,
            unit: '个',
            name: '行业大类3'
          },
          {
            value: 250,
            unit: '个',
            name: '行业大类4'
          }
        ],
        outerData: [{
            value: 200,
            unit: '个',
            name: '谷歌'
          },
          {
            value: 500,
            unit: '个',
            name: '必应'
          }
        ]
      },
      warnColumns: [{
        title: '预警区县',
        dataIndex: 'district',
        align: 'center'
      }, {
        title: '最新预警',
        dataIndex: 'newWarn',
        align: 'center'
      }, {
        title: '超期预警',
        dataIndex: 'overWarn',
        align: 'center'
      }, {
        title: '预警总计',
        dataIndex: 'totalWarn',
        align: 'center'
      }],
      warnData: [{
        district: '观山湖区',
        newWarn: '2',
        overWarn: 32,
        totalWarn: '4',
      }],

      contractColumns: [{
        title: '劳务合同',
        dataIndex: 'name',
        align: 'center'
      }, {
        title: '完成项目',
        dataIndex: 'finish',
        align: 'center'
      }, {
        title: '未完成项目',
        dataIndex: 'unFinish',
        align: 'center'
      }, {
        title: '已签人数',
        dataIndex: 'signed',
        align: 'center'
      }, {
        title: '未签人数',
        dataIndex: 'unSign',
        align: 'center'
      }],
      contractData: [{
        name: '合同情况',
        finish: '200',
        unFinish: '76',
        signed: '3471',
        unSign: '221'
      }],

      wagesColumns: [{
        title: '工资表',
        dataIndex: 'month',
        align: 'center'
      }, {
        title: '完成项目',
        dataIndex: 'finish',
        align: 'center'
      }, {
        title: '未完成项目',
        dataIndex: 'unFinish',
        align: 'center'
      }],
      wagesData: [{
        month: '1月份',
        newWarn: '2',
        overWarn: '5'
      }]
    }
  },
  filters: {},
  created() {},
  mounted() {
    this.loading = true
    setTimeout(() => {
      this.loading = false
    }, 1500)
    /* this.$nextTick(() => {
      this.loading = false
    }) */
  },
  methods: {
    // 项目类型
  }
};
export default indexMixin;