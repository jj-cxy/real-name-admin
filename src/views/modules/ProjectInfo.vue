<template>
  <a-card title="项目信息">
    <div slot="extra">
      <a href="javascript:;" @click="handleSuspend" style="margin-right: 15px;color: #ff4d4f">中断项目</a>
      <a href="javascript:;" @click="handleStop" style="color: #ff4d4f">终止项目</a>
    </div>
    <a-row :gutter="12">
      <a-col :sm="24" :md="12">
        <a-form-item label="项目编号" :labelCol="labelMinCol" :wrapperCol="wrapperMInCol">
          <span>{{mdl.number}}</span>
        </a-form-item>
      </a-col>
      <a-col :sm="24" :md="12">
        <a-form-item label="项目名称" :labelCol="labelMinCol" :wrapperCol="wrapperMInCol">
          <span>{{mdl.name}}</span>
        </a-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="12">
      <a-col :sm="24" :md="12">
        <a-form-item label="登记时间" :labelCol="labelMinCol" :wrapperCol="wrapperMInCol">
          <span>{{mdl.createTime || '-'}}</span>元
        </a-form-item>
      </a-col>
      <a-col :sm="24" :md="12" v-if="asset.leaseExpirationTime">
        <a-form-item label="租赁过期时间" :labelCol="labelMinCol" :wrapperCol="wrapperMInCol">
          <span>{{asset.leaseExpirationTime || '-'}}</span>
        </a-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="12">
      <a-col :sm="24" :md="12">
        <a-form-item label="评估挂牌价" :labelCol="labelMinCol" :wrapperCol="wrapperMInCol">
          <span>{{mdl.listPrice || '-'}}</span>元
        </a-form-item>
      </a-col>
      <a-col :sm="24" :md="12">
        <a-form-item label="报名人数" :labelCol="labelMinCol" :wrapperCol="wrapperMInCol">
          <span>{{mdl.count || '-'}}人</span>
        </a-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="12">
      <a-col :sm="24" :md="12">
        <a-form-item
          label="对接人"
          :labelCol="labelMinCol"
          :wrapperCol="wrapperMInCol"
        >{{mdl.projectButt}}</a-form-item>
      </a-col>
      <a-col :sm="24" :md="12">
        <a-form-item
          label="对接人手机号"
          :labelCol="labelMinCol"
          :wrapperCol="wrapperMInCol"
        >{{mdl.projectButtPhone}}</a-form-item>
      </a-col>
    </a-row>
    <a-form-item label="所属单位" :labelCol="labelCol" :wrapperCol="wrapperCol">{{asset.userName}}</a-form-item>
    <a-form-item label="项目简介" :labelCol="labelCol" :wrapperCol="wrapperCol">
      <div>
        该资产备案地址：{{asset.province}}{{asset.city}}{{asset.district}}{{asset.address}}，该资产备案面积：{{asset.totalArea}}m²
        <span
          v-if="mdl.description"
        >,{{mdl.description}}</span>
      </div>
    </a-form-item>
    <a-form-item
      v-if="mdl.disclosureId && mdl.listPrice"
      label="披露表内容"
      :labelCol="labelCol"
      :wrapperCol="wrapperCol"
    >
      <a href="javascript:;" @click="turnDisclosureDetail(mdl)">点击查看</a>
    </a-form-item>
    <a-form-item>
      <span :style="fontStyle">招租方同意资产招租的内部决议：</span>
      <viewer :ids="mdl.insideResolution" />
    </a-form-item>
    <a-row :gutter="12">
      <a-col :sm="24" :md="12">
        <a-form-item label="租赁评估报告" :labelCol="labelMinCol" :wrapperCol="wrapperMInCol">
          <viewer :ids="mdl.assessmentReport" />
        </a-form-item>
      </a-col>
      <a-col :sm="24" :md="12">
        <a-form-item label="招租方案" :labelCol="labelMinCol" :wrapperCol="wrapperMInCol">
          <viewer :ids="mdl.rentScheme" />
        </a-form-item>
      </a-col>
    </a-row>
    <a-form-item label="原承租合同" :labelCol="labelCol" :wrapperCol="wrapperCol">
      <viewer :ids="mdl.leaseContract" />
    </a-form-item>
    <a-form-item>
      <span :style="fontStyle">企业对下属子企业资产租赁的批复：</span>
      <viewer :ids="mdl.leaseReplay" />
    </a-form-item>
    <a-form-item>
      <span :style="fontStyle">是否涉及查封、担保等情况的说明：</span>
      <viewer :ids="mdl.situationDescription" />
    </a-form-item>
    <a-form-item>
      <span :style="fontStyle">涉及共有或置其他权利的，相关权利人认可转让行为的书面材料：</span>
      <viewer :ids="mdl.transferDescription" />
    </a-form-item>

    <!-- 终止 中断项目 -->
    <stop-break-modal ref="stopModal"></stop-break-modal>

  </a-card>
</template>

<script>
import modalMixin from '@/components/Mixins/modal'
import pick from 'lodash.pick'
import { axios } from '@/utils/request'
import viewer from '@/views/modules/viewer'
import StopBreakModal from '@views/modules/StopBreakModal'

export default {
  name: 'ProjectInfo',
  mixins: [modalMixin],
  props: {
    mdl: {
      type: Object,
      default: {}
    }
  },
  components: {
    viewer,
    StopBreakModal
  },
  data() {
    return {
      Urls: {
        assetByIdUrl: '/biz/oaAssets/get/'
      },
      asset: {},
      mlStyle: {
        marginLeft: '10px'
      },
      fontStyle: {
        color: '#222',
        float: 'left'
      }
    }
  },
  methods: {
    setForm(data) {
      this.model = data
    },
    getBrief(id) {
      axios({
        url: this.Urls.assetByIdUrl + id,
        method: 'get'
      }).then(res => {
        if (res.code == 0) {
          this.asset = res.data
        } else {
          this.$notification.error({
            message: res.msg
          })
        }
      })
    },
    turnDisclosureDetail(data) {
      this.$router.push({ path: '/disclosure/detail', query: { id: data.disclosureId, assetsId: data.assetsId } })
      this.$emit('close')
    },
    // 中断项目
    handleSuspend() {
      this.mdl.dealType = 'suspend'
      this.$refs.stopModal.edit(this.mdl)
      this.$refs.stopModal.dialogStatus = 'edit'
    },
    // 终止项目
    handleStop() {
      this.mdl.dealType = 'stop'
      this.$refs.stopModal.edit(this.mdl)
      this.$refs.stopModal.dialogStatus = 'edit'
    }
  },
  mounted() {
    this.$nextTick(() => {
      if (this.mdl.assetsId) {
        this.getBrief(this.mdl.assetsId)
      }
    })
  },
  watch: {
    'mdl.assetsId': function(val, oldVal) {
      this.getBrief(val)
    }
  }
}
</script>

<style>
</style>