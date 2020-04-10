<template>
  <a-drawer
    title="详情"
    :maskClosable="true"
    :width="980"
    placement="right"
    :closable="true"
    @close="visible=false"
    :visible="visible"
    class="detail-form"
    style="height: calc(100% - 55px);overflow: auto;padding-bottom: 53px;"
  >
    <a-spin :spinning="confirmLoading">
      <a-form class="detail-form" :form="form">
        <!-- 承租方角色 -->

        <!-- 个人用户资料 -->
        <a-card
          v-if="(model.role=='CZF' && model.type=='GR') && model.user"
          size="small"
          title="账户资料"
        >
          <a-row :gutter="12">
            <a-col :sm="24" :md="12">
              <a-form-item label="姓名" :labelCol="labelMinCol" :wrapperCol="wrapperMInCol">
                <span>{{model.user.name}}</span>
              </a-form-item>
            </a-col>
            <a-col :sm="24" :md="12">
              <a-form-item label="身份证号" :labelCol="labelMinCol" :wrapperCol="wrapperMInCol">
                <span>{{model.user.idCard}}</span>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="12">
            <a-col :sm="24" :md="12">
              <a-form-item label="手机号" :labelCol="labelMinCol" :wrapperCol="wrapperMInCol">
                <span>{{model.user.phone}}</span>
              </a-form-item>
            </a-col>
            <a-col :sm="24" :md="12">
              <a-form-item label="通讯地址" :labelCol="labelMinCol" :wrapperCol="wrapperMInCol">
                <span>{{model.user.address}}</span>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="12">
            <a-col :sm="24" :md="12">
              <a-form-item label="身份证头像面" :labelCol="labelMinCol" :wrapperCol="wrapperMInCol">
                <viewer v-if="model.user.idCardImage" :ids="model.user.idCardImage"></viewer>
              </a-form-item>
            </a-col>
            <a-col :sm="24" :md="12">
              <a-form-item label="身份证国徽面" :labelCol="labelMinCol" :wrapperCol="wrapperMInCol">
                <viewer v-if="model.user.idCardBackImage" :ids="model.user.idCardBackImage"></viewer>
              </a-form-item>
            </a-col>
          </a-row>
          <a-form-item label="手持身份证照" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <viewer v-if="model.user.idCardHandImage" :ids="model.user.idCardHandImage"></viewer>
          </a-form-item>
        </a-card>

        <!-- 企业账户资料 -->
        <a-card
          v-if="(model.type=='QY' || model.type=='JT') && model.enterprise"
          size="small"
          title="账户资料"
        >
          <template>
            <a-form-item label="企业名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <span>{{model.enterprise.name}}</span>
            </a-form-item>
            <a-row :gutter="12">
              <a-col :sm="24" :md="12">
                <a-form-item label="平台企业编码" :labelCol="labelMinCol" :wrapperCol="wrapperMInCol">
                  <span>{{model.enterprise.enterpriseNo}}</span>
                </a-form-item>
              </a-col>
              <a-col :sm="24" :md="12">
                <a-form-item label="统一社会信用代码" :labelCol="labelMinCol" :wrapperCol="wrapperMInCol">
                  <span>{{model.enterprise.unitCode}}</span>
                </a-form-item>
              </a-col>
            </a-row>
            <a-form-item label="企业通讯地址" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <span>{{model.enterprise.address}}</span>
            </a-form-item>
            <a-row :gutter="12">
              <a-col :sm="24" :md="12">
                <a-form-item label="营业执照" :labelCol="labelMinCol" :wrapperCol="wrapperMInCol">
                  <viewer v-if="model.enterprise.licenseUrl" :ids="model.enterprise.licenseUrl"></viewer>
                </a-form-item>
              </a-col>
              <a-col :sm="24" :md="12">
                <a-form-item label="法定代表姓名" :labelCol="labelMinCol" :wrapperCol="wrapperMInCol">
                  <span>{{model.enterprise.corporationName}}</span>
                </a-form-item>
              </a-col>
            </a-row>
            <a-row :gutter="12">
              <a-col :sm="24" :md="12">
                <a-form-item label="法定代表身份证附件" :labelCol="labelMinCol" :wrapperCol="wrapperMInCol">
                  <viewer
                    v-if="model.enterprise.corporationIdcardUrl"
                    :ids="model.enterprise.corporationIdcardUrl"
                  ></viewer>
                </a-form-item>
              </a-col>
              <a-col :sm="24" :md="12">
                <a-form-item label="法定代表身份证号" :labelCol="labelMinCol" :wrapperCol="wrapperMInCol">
                  <span>{{model.enterprise.corporationIdcard}}</span>
                </a-form-item>
              </a-col>
            </a-row>
          </template>

          <a-row :gutter="12">
            <template v-if="model.type=='QY'">
              <a-col :sm="24" :md="12">
                <a-form-item label="上级单位" :labelCol="labelMinCol" :wrapperCol="wrapperMInCol">
                  <span>{{model.enterprise.parentName}}</span>
                </a-form-item>
              </a-col>
            </template>
            <a-col :sm="24" :md="12">
              <a-form-item label="公司章程" :labelCol="labelMinCol" :wrapperCol="wrapperMInCol">
                <viewer
                  v-if="model.enterprise.associationArticlesUrl"
                  :ids="model.enterprise.associationArticlesUrl"
                ></viewer>
              </a-form-item>
            </a-col>
          </a-row>
          <a-form-item
            label="资产总计"
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            v-if="model.role=='ZZF'"
          >
            <a href="#" @click.prevent="turnAsset">{{assetsCount}}</a>
          </a-form-item>
        </a-card>

        <!-- 授权管理员资料 -->
        <template v-if="(model.type=='QY' || model.type=='JT') && model.enterprise">
          <a-card size="small" title="授权管理员资料" style="margin-top: 24px">
            <a-row :gutter="12">
              <a-col :sm="24" :md="12">
                <a-form-item label="授权管理员姓名" :labelCol="labelMinCol" :wrapperCol="wrapperMInCol">
                  <span>{{model.enterprise.adminName}}</span>
                </a-form-item>
              </a-col>
              <a-col :sm="24" :md="12">
                <a-form-item label="身份证号" :labelCol="labelMinCol" :wrapperCol="wrapperMInCol">
                  <span>{{model.enterprise.adminIdcard}}</span>
                </a-form-item>
              </a-col>
            </a-row>
            <a-row :gutter="12">
              <a-col :sm="24" :md="12">
                <a-form-item label="手机号" :labelCol="labelMinCol" :wrapperCol="wrapperMInCol">
                  <span>{{model.enterprise.adminPhone}}</span>
                </a-form-item>
              </a-col>
              <a-col :sm="24" :md="12">
                <a-form-item label="身份证附件" :labelCol="labelMinCol" :wrapperCol="wrapperMInCol">
                  <viewer
                    v-if="model.enterprise.authorizedIdcardUrl"
                    :ids="model.enterprise.authorizedIdcardUrl"
                  ></viewer>
                </a-form-item>
              </a-col>
            </a-row>
            <a-form-item label="授权委托书附件" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <viewer
                v-if="model.enterprise.powerAttorneyUrl"
                :ids="model.enterprise.powerAttorneyUrl"
              ></viewer>
            </a-form-item>
          </a-card>
        </template>

        <!-- 项目列表 -->
        <public-table
          v-if="model.role=='CZF' && model.userId"
          :dataColumns="projectColums"
          :url="projectUrl"
          style="margin-top: 24px"
          :customerId="model.userId"
        ></public-table>

        <!-- 招租方角色 -->

        <!-- 集团下公司列表 -->
        <enterprise-list
          v-if="(model.role=='ZZF' && model.type=='JT') && model.userId"
          style="margin-top: 24px"
          :customerId="model.userId"
          @child="getEnterInfo"
        ></enterprise-list>

        <!-- 资产列表 -->
        <public-table
          id="anchor"
          v-if="model.role=='ZZF' && model.userId"
          :dataColumns="assetsColums"
          :url="assetsUrl"
          style="margin-top: 24px"
          :customerId="model.userId"
          @total="assetsTotal"
        ></public-table>
      </a-form>
    </a-spin>
  </a-drawer>
</template>

<script>
import pick from 'lodash.pick'
import modalMixin from '@/components/Mixins/modal'
import PublicTable from '@/views/modules/PublicTable'
import EnterpriseList from './EnterpriseList'
import viewer from '@/views/modules/viewer'

export default {
  name: 'formDrawer',
  mixins: [modalMixin],
  components: { PublicTable, EnterpriseList, viewer },
  data() {
    return {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 }
      },
      labelMinCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperMInCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      },
      Urls: {
        getByIdUrl: '/auth/api/customer/get/'
      },
      projectColums: [
        {
          title: '项目编号',
          align: 'center',
          dataIndex: 'projectId'
        },
        {
          title: '项目名称',
          dataIndex: 'projectName'
        },
        {
          title: '所在地区',
          dataIndex: 'addr',
          customRender: (text, record, index) => `${record.province}`
        },
        {
          title: '项目经办人',
          align: 'center',
          dataIndex: 'buttName'
        },
        {
          title: '项目节点',
          align: 'center',
          dataIndex: 'projectStatus'
        },
        {
          title: '项目开始时间',
          align: 'center',
          dataIndex: 'createTime'
        }
      ],
      assetsColums: [
        {
          title: '资产名称',
          dataIndex: 'name'
        },
        {
          title: '资产地址',
          dataIndex: 'address',
          customRender: (text, record, index) => `${record.province}${record.city}${record.district}${record.address}`
        },
        {
          title: '资产类型',
          align: 'center',
          dataIndex: 'assetsType'
        },
        {
          title: '资产状态',
          align: 'center',
          dataIndex: 'assetsStatusDesc'
        },
        {
          title: '总面积',
          align: 'center',
          dataIndex: 'totalArea',
          customRender: text => `${text}㎡`
        }
      ],
      projectUrl: '/biz/oaProject/getInfoByUserId',
      assetsUrl: '/biz/oaAssets/page',
      assetsCount: 0
    }
  },
  computed: {},
  methods: {
    beforeOpen(record) {},
    setForm(data) {
      this.model = data
    },
    assetsTotal(data) {
      this.assetsCount = data
    },
    // 跳转资产列表
    turnAsset() {
      const anchorEle = document.querySelector('#anchor')
      if (!!anchorEle) {
        anchorEle.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        })
      }
    },
    getEnterInfo(data) {
      this.detail(data)
    }
  }
}
</script>

<style scoped>
</style>