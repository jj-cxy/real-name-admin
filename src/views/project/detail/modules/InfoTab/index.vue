<template>
  <a-form class="detail-form">
    <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="项目名称">
      <span>{{model.projectName}}</span>
    </a-form-item>
    <a-form-item
      :labelCol="labelCol"
      :wrapperCol="wrapperCol"
      label="项目信息"
      style="margin-bottom: 12px"
    >
      <div class="detail-table">
        <table>
          <tbody>
            <tr>
              <td class="tit">项目类型</td>
              <td>{{model.projectTypeDesc}}</td>
              <td class="tit">项目状态</td>
              <td>{{model.projectTypeDesc}}</td>
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
              <td>{{model.startTime}}</td>
              <td class="tit">施工状态</td>
              <td>{{model.insuranceDesc}}</td>
            </tr>
            <tr>
              <td class="tit">计划开工时间</td>
              <td>{{model.startTime}}</td>
              <td class="tit">计划竣工时间</td>
              <td>{{model.endTime}}</td>
            </tr>
            <tr>
              <td class="tit">签约合同价</td>
              <td>{{model.constractPrice}}</td>
              <td class="tit">合同签订日期</td>
              <td>{{model.constractDay}}</td>
            </tr>
            <tr>
              <td class="tit">是否参加工伤保险</td>
              <td>{{model.insuranceDesc}}</td>
              <td class="tit">所属管理机构</td>
              <td>{{model.orgCodeDesc}}</td>
            </tr>
            <tr>
              <td class="tit">造价</td>
              <td>{{model.manufacturingCost}}</td>
              <td class="tit">项目规模</td>
              <td>{{model.scale}}</td>
            </tr>
            <tr>
              <td class="tit">面积</td>
              <td>{{model.area}}</td>
              <td class="tit"></td>
              <td></td>
            </tr>
            <tr>
              <td class="tit">施工许可证号</td>
              <td>{{model.constructionPermitNumber}}</td>
              <td class="tit">施工许可证</td>
              <!-- <td>{{model.constructionPermitNumberUrl}}</td> -->
              <td>
                <viewer></viewer>
              </td>
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
              <td>{{model.workWageBankAccountNo}}</td>
              <td class="tit">银行种类</td>
              <td>{{model.salaryBankAccountNo}}</td>
            </tr>
            <tr>
              <td class="tit">专户帐号名称</td>
              <td>{{model.salaryBankName}}</td>
              <td class="tit">账户余额</td>
              <td>{{model.accountBalances}}</td>
            </tr>
            <tr>
              <td class="tit">开户行名称</td>
              <td>{{model.depositBank}}</td>
              <td class="tit">账户状态</td>
              <td>{{model.accountStateCode}}</td>
            </tr>
            <tr>
              <td class="tit">所属银行编码</td>
              <td>{{model.bankCode}}</td>
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
    <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="前端软件公司">
      <span>{{model.salaryTime}}</span>
    </a-form-item>
    <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="项目简介">
      <span>{{model.salaryTime}}</span>
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
import viewer from '@/views/modules/viewer'

export default {
  name: 'info',
  mixins: [modalMixin, indexMixin],
  components: {
    viewer
  }
}
</script>
<style lang='scss' scoped>
</style>