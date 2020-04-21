<template>
  <a-form class="detail-form" style="margin-top: -24px">
    <div class="detail-top">
      <ul>
        <li>
          <span>统一社会信用代码：</span>
          {{unitData.unitCode}}
        </li>
        <li>
          <span>企业名称：</span>
          {{unitData.enterpriseName}}
        </li>
        <div v-for="(item,index) in unitData.persons" :key="index">
          <a-divider />
          <li>
            <span>{{item.personTypeDesc}}姓名：</span>王某某
          </li>
          <li>
            <span>手机号：</span>
            {{item.personPhone}}
          </li>
          <li>
            <span>身份证号：</span>
            {{item.personIdCard}}
          </li>
        </div>
      </ul>
    </div>
    <div
      class="detail-table"
      style="margin-top: 0"
      v-for="(item,index) in unitData.qualifications"
      :key="index"
    >
      <table>
        <tbody>
          <tr>
            <td class="tit">资质资格类型</td>
            <td>{{item.qualificationTypeDesc}}</td>
            <td class="tit">资质证书号</td>
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
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </a-form>
</template>

<script>
import modalMixin from '@/components/Mixins/modal'
import indexMixin from './modules/index'
import Viewer from '@/views/modules/Viewer'

export default {
  name: 'BaseOne',
  mixins: [modalMixin, indexMixin],
  components: {
    Viewer
  }
}
</script>
<style lang='scss' scoped>
</style>