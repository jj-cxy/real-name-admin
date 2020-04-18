<template>
  <a-form class="detail-form" style="margin-top: -24px">
    <div class="detail-top">
      <ul>
        <li>
          <span>统一社会信用代码：</span>91520115314263671W
        </li>
        <li>
          <span>企业名称：</span> 贵阳市金阳建设数据服务有限公司
        </li>
        <template v-for="(item,index) in personInfoList">
          <a-divider />
          <li>
            <span>{{item.title}}姓名：</span>王某某
          </li>
          <li>
            <span>手机号：</span>136xxxx8927
          </li>
          <li>
            <span>身份证号：</span>522xxxxxxxxxxx1258
          </li>
        </template>
      </ul>
    </div>
    <div class="detail-table" style="margin-top: 0">
      <table>
        <tbody>
          <tr>
            <td class="tit">资质资格类型</td>
            <td>工程监理</td>
            <td class="tit">资质证书号</td>
            <td>520115000212582</td>
          </tr>
          <tr>
            <td class="tit">专业类别</td>
            <td>存续</td>
            <td class="tit">资质资格等级</td>
            <td>甲级</td>
          </tr>
          <tr>
            <td class="tit">发证机关</td>
            <td>贵阳国家高新技术产业开发区行政审批局</td>
            <td class="tit">发证时间</td>
            <td>2018年06月07日</td>
          </tr>
          <tr>
            <td class="tit">有限期</td>
            <td>2014年10月23日--2034年10月22日</td>
            <td class="tit">资质取得方式</td>
            <td>一般经营所得</td>
          </tr>
          <tr>
            <td class="tit">资质状态</td>
            <td>存续</td>
            <td class="tit">证书附件</td>
            <td class="attachment-btn">
              <a-button type="dashed" size="small" icon="search">查看附件</a-button>
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