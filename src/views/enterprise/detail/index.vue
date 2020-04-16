<template>
  <a-card
    :body-style="{'padding': '12px 24px 24px'}"
    :bordered="false"
    :headStyle="{'textAlign':'center'}"
  >
    <a-form :form="form" class="detail-form">
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="企业名称">
        <span>{{model.unitName}}</span>
      </a-form-item>
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="统一社会信用代码">
        <span>{{model.unitCode}}</span>
      </a-form-item>
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="单位信息">
        <div class="detail-table">
          <table>
            <tbody>
              <tr>
                <td class="tit">所属地区</td>
                <td>{{model.province}}{{model.city}}{{model.district}}</td>
                <td class="tit">邮政编码</td>
                <td>{{model.zipCode}}</td>
              </tr>
              <tr>
                <td class="tit">注册地址</td>
                <td colspan="3">{{model.unitAddress}}</td>
              </tr>
              <tr>
                <td class="tit">营业地址</td>
                <td colspan="3">{{model.unitRealAddress}}</td>
              </tr>
              <tr>
                <td class="tit">工商登记有效期限</td>
                <td>{{model.enableDate}}至{{model.disableDate}}</td>
                <td class="tit">到期时间</td>
                <td>{{model.disableDate}}</td>
              </tr>
              <tr>
                <td class="tit">法人姓名</td>
                <td>{{model.legalPerson}}</td>
                <td class="tit">法人手机号</td>
                <td>{{model.legalPersonPhone}}</td>
              </tr>
              <tr>
                <td class="tit">法人身份证号</td>
                <td colspan="3">{{model.legalPersonIdCard}}</td>
              </tr>
              <tr>
                <td class="tit">联系人姓名</td>
                <td>{{model.enterpriseContactPersonName}}</td>
                <td class="tit">联系电话</td>
                <td>{{model.enterpriseContactPersonTel}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </a-form-item>
      <a-form-item
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        label="单位资质"
        v-if="model.qualifications && model.qualifications.length > 0"
      >
        <div class="detail-table">
          <table>
            <tbody>
              <tr>
                <td class="tit">资质资格类型</td>
                <td>{{model.qualifications[0].qualificationCategoryDesc}}</td>
                <td class="tit">证书编号</td>
                <td>{{model.qualifications[0].qualificationNo}}</td>
              </tr>
              <tr>
                <td class="tit">专业类别</td>
                <td>{{model.qualifications[0].qualificationProfessionalTypeDesc}}</td>
                <td class="tit">资质资格等级</td>
                <td>{{model.qualifications[0].qualificationLevelDesc}}</td>
              </tr>
              <tr>
                <td class="tit">发证机关</td>
                <td>{{model.qualifications[0].licensingAuthority}}</td>
                <td class="tit">发证时间</td>
                <td>{{model.qualifications[0].expirationStartTime}}</td>
              </tr>
              <tr>
                <td class="tit">有限期</td>
                <td>{{model.qualifications[0].expirationStartTime}}至{{model.expirationEndTime}}</td>
                <td class="tit">资质取得方式</td>
                <td>{{model.qualifications[0].qualificationAcquireDesc}}</td>
              </tr>
              <tr>
                <td class="tit">资质状态</td>
                <td>{{model.qualifications[0].qualificationStatusDesc}}</td>
                <td class="tit">证书附件</td>
                <td>
                  <viewer :ids="model.qualifications[0].qualificationContent"></viewer>
                  <!-- {{model.qualifications[0].qualificationContent}} -->
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </a-form-item>
    </a-form>
  </a-card>
</template>

<script>
import modalMixin from '@/components/Mixins/modal'
import indexMixin from './modules/index'
import viewer from '@/views/modules/viewer'

export default {
  name: 'EnterpriseAudit',
  mixins: [modalMixin, indexMixin],
  components: {
    viewer
  }
}
</script>
