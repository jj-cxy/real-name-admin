<template>
  <a-form class="detail-form">
    <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="项目名称">
      <span>{{model.projectName}}</span>
    </a-form-item>
    <a-form-item
      :labelCol="labelCol"
      :wrapperCol="wrapperCol"
      label="施工许可证"
      style="position: relative"
    >
      <template v-if="model.constructionPermitNumberUrl">
        <div class="detail-table">
          <table>
            <tbody>
              <tr>
                <td class="tit">编号</td>
                <td>{{model.constructionPermitNumber}}</td>
                <td class="tit">证件</td>
                <td>
                  <viewer :ids="model.constructionPermitNumberUrl"></viewer>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="sign green" style="right: 5px; top: 5px">有证</div>
      </template>
      <template v-else>
        <div class="sign red" style="left: 0; top: 0;">无证</div>
      </template>
    </a-form-item>
    <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="项目信息">
      <div class="detail-table">
        <table>
          <tbody>
            <tr>
              <td class="tit">项目类型</td>
              <td>{{model.projectTypeDesc}}</td>
              <td class="tit">项目状态</td>
              <td>{{model.projectStatusDesc}}</td>
            </tr>
            <tr>
              <td class="tit">所属省</td>
              <td>{{model.province}}</td>
              <td class="tit">所属市</td>
              <td>{{model.city}}</td>
            </tr>
            <tr>
              <td class="tit">所属区县</td>
              <td>{{model.district}}</td>
              <td class="tit">详细地址</td>
              <td>{{model.address}}</td>
            </tr>
            <tr>
              <td class="tit">计划总工期</td>
              <td>{{model.totalProjectSchedule}}</td>
              <td class="tit">施工状态</td>
              <td>{{model.constructionStatusDesc}}</td>
            </tr>
            <tr>
              <td class="tit">计划开工时间</td>
              <td>{{model.startTime}}</td>
              <td class="tit">计划竣工时间</td>
              <td>{{model.endTime}}</td>
            </tr>
            <tr>
              <td class="tit">签约合同价</td>
              <td>{{model.contractPrice}}元</td>
              <td class="tit">合同签订日期</td>
              <td>{{model.constractDay}}</td>
            </tr>
            <tr>
              <td class="tit">是否参加工伤保险</td>
              <td>{{model.insuranceDesc}}</td>
              <td class="tit">所属管理机构</td>
              <td>{{model.managerOrgName}}</td>
            </tr>
            <tr>
              <td class="tit">造价</td>
              <td>{{model.manufacturingCost}}元</td>
              <td class="tit">项目规模</td>
              <td>{{model.scaleDesc}}</td>
            </tr>
            <tr>
              <td class="tit">面积</td>
              <td>{{model.area}}㎡</td>
              <td class="tit"></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </a-form-item>
    <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="工资专户信息">
      <div class="detail-table">
        <table>
          <tbody>
            <tr>
              <td class="tit">专户帐号</td>
              <td>{{model.salaryBankAccount.bankAccount}}</td>
              <td class="tit">银行种类</td>
              <td>{{model.salaryBankAccount.bankTypeDesc}}</td>
            </tr>
            <tr>
              <td class="tit">专户帐号名称</td>
              <td>{{model.salaryBankAccount.bankAccountName}}</td>
              <td class="tit">账户余额</td>
              <td>{{model.salaryBankAccount.bankBalances}}</td>
            </tr>
            <tr>
              <td class="tit">开户行名称</td>
              <td>{{model.salaryBankAccount.bankName}}</td>
              <td class="tit">账户状态</td>
              <td>{{model.salaryBankAccount.accountStatusDesc}}</td>
            </tr>
            <tr>
              <td class="tit">所属银行编码</td>
              <td>{{model.salaryBankAccount.bankAffiliated}}</td>
              <td class="tit">每月发薪日期</td>
              <td>{{model.salaryTime}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </a-form-item>
    <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="监督员">
      <span>{{model.supervisorName}}</span>
    </a-form-item>
    <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="数据收集公司">
      <span>{{model.softNames}}</span>
    </a-form-item>
    <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="项目简介">
      <span>{{model.projectDesc}}</span>
    </a-form-item>
    <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="具体定位地址">
      <div class="map-box">
        <div id="allmap"></div>
      </div>
    </a-form-item>
  </a-form>
</template>

<script>
import modalMixin from '@/components/Mixins/modal'
import indexMixin from './modules/index'
import Viewer from '@/views/modules/Viewer'

export default {
  name: 'InfoTab',
  mixins: [modalMixin, indexMixin],
  components: {
    Viewer
  }
}
</script>
<style lang='scss' scoped>
</style>