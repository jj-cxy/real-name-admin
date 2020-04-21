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
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="主要业务类型">
        <span>{{model.unitTypeDesc}}</span>
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
                <td class="tit">工商登记开始时间</td>
                <td>{{model.enableDate}}</td>
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
                <td>{{model.legalPersonIdCard}}</td>
                <td class="tit">营业执照</td>
                <td>
                  <viewer :ids="model.licenseUrl"></viewer>
                </td>
              </tr>
              <tr>
                <td class="tit">联系人姓名</td>
                <td>{{model.enterpriseContactPersonName}}</td>
                <td class="tit">联系电话</td>
                <td>{{model.enterpriseContactPersonTel}}</td>
              </tr>
              <template
                v-if="model.unitType && model.unitType.split(',').includes('CONSTRUCTION_UNIT')"
              >
                <tr>
                  <td class="tit">安全生产许可证号</td>
                  <td>{{model.safetyNo}}</td>
                  <td class="tit">有效期</td>
                  <td>{{model.safetyNoStartDate}}至{{model.safetyNoValidDate}}</td>
                </tr>
                <tr>
                  <td class="tit">安全生产许可证号</td>
                  <td>
                    <viewer :ids="model.safetyLicenceUrl"></viewer>
                  </td>
                  <td class="tit"></td>
                  <td></td>
                </tr>
              </template>
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
        <div class="detail-table" v-for="item in model.qualifications" :key="item.id">
          <table>
            <tbody>
              <tr>
                <td class="tit">资质资格类型</td>
                <td>{{item.qualificationTypeDesc}}</td>
                <td class="tit">证书编号</td>
                <td>{{item.qualificationNo}}</td>
              </tr>
              <tr>
                <td class="tit">专业类别</td>
                <td>{{item.qualificationProfessionalTypeDesc}}</td>
                <td class="tit">资质资格等级</td>
                <td>{{item.qualificationLevelDesc}}</td>
              </tr>
              <tr>
                <td class="tit">发证机关</td>
                <td>{{item.licensingAuthority}}</td>
                <td class="tit">发证时间</td>
                <td>{{item.expirationStartTime}}</td>
              </tr>
              <tr>
                <td class="tit">有限期</td>
                <td>{{item.expirationStartTime}}至{{item.expirationEndTime}}</td>
                <td class="tit">资质取得方式</td>
                <td>{{item.qualificationAcquireDesc}}</td>
              </tr>
              <tr>
                <td class="tit">资质状态</td>
                <td>{{item.qualificationStatusDesc}}</td>
                <td class="tit">证书附件</td>
                <td>
                  <viewer :ids="item.qualificationContent"></viewer>
                  <!-- {{item.qualificationContent}} -->
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
import Viewer from '@/views/modules/Viewer'

export default {
  name: 'EnterpriseAudit',
  mixins: [modalMixin, indexMixin],
  components: {
    Viewer
  }
}
</script>
