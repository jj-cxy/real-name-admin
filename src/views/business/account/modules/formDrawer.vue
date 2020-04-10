<template>
  <a-drawer
    title="详情"
    :maskClosable="true"
    :width="860"
    placement="right"
    :closable="true"
    @close="visible=false"
    :visible="visible"
    class="detail-form"
    style="height: calc(100% - 55px);overflow: auto;padding-bottom: 53px;"
  >
    <a-spin :spinning="confirmLoading">
      <a-form class="detail-form" :form="form">
        <!-- 个人用户资料 -->
        <a-card v-if="model.role=='CZF' && model.type=='GR'" size="small" title="账户资料">
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
        </a-card>

        <!-- 授权管理员资料 -->
        <template v-if="model.type=='QY' || model.type=='JT'">
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
      </a-form>
    </a-spin>
  </a-drawer>
</template>

<script>
import pick from 'lodash.pick'
import modalMixin from '@/components/Mixins/modal'
import viewer from '@/views/modules/viewer'

export default {
  name: 'formDrawer',
  mixins: [modalMixin],
  components: {
    viewer
  },
  data() {
    return {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 19 }
      },
      labelMinCol: {
        xs: { span: 24 },
        sm: { span: 10 }
      },
      wrapperMInCol: {
        xs: { span: 24 },
        sm: { span: 14 }
      },
      Urls: {
        getByIdUrl: '/auth/api/customer/get/'
      }
    }
  },
  computed: {},
  filters: {},
  methods: {
    setForm(data) {
      this.model = data
      // this.getImg(data.ownership, 'ownershipList')
    }
  }
}
</script>

<style scoped>
</style>