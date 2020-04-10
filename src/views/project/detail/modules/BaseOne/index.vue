<template>
  <a-form class="detail-form">
    <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="项目名称">
      <span>某某某有限公司</span>
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
              <td>房屋建筑工程</td>
              <td class="tit">项目状态</td>
              <td>在建</td>
            </tr>
            <tr>
              <td class="tit">所属省</td>
              <td>贵州省</td>
              <td class="tit">所属市</td>
              <td>贵阳市</td>
            </tr>
            <tr>
              <td class="tit">所属区县</td>
              <td>白云区</td>
              <td class="tit">详细地址</td>
              <td>山有木兮木有枝，心悦君兮君不知</td>
            </tr>
            <tr>
              <td class="tit">计划开工时间</td>
              <td>2020-03-26</td>
              <td class="tit">是否参加工伤保险</td>
              <td>是</td>
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
              <td class="tit">项目类型</td>
              <td>房屋建筑工程</td>
              <td class="tit">项目状态</td>
              <td>在建</td>
            </tr>
            <tr>
              <td class="tit">所属省</td>
              <td>贵州省</td>
              <td class="tit">所属市</td>
              <td>贵阳市</td>
            </tr>
            <tr>
              <td class="tit">所属区县</td>
              <td>白云区</td>
              <td class="tit">详细地址</td>
              <td>山有木兮木有枝，心悦君兮君不知</td>
            </tr>
            <tr>
              <td class="tit">计划开工时间</td>
              <td>2020-03-26</td>
              <td class="tit">是否参加工伤保险</td>
              <td>是</td>
            </tr>
          </tbody>
        </table>
      </div>
    </a-form-item>
    <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="创建人">
      <span>某某监督员</span>
    </a-form-item>
    <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="前端软件公司">
      <span>某某某软件公司</span>
    </a-form-item>
    <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="项目简介">
      <span>来时三月开遍湘江春水,湖中鸳鸯乘着白云的倒影渐行渐远,看见那成双成对的影子</span>
    </a-form-item>
    <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="具体定位地址">
      <span>来时三月开遍湘江春水,湖中鸳鸯乘着白云的倒影渐行渐远,看见那成双成对的影子</span>
    </a-form-item>
  </a-form>
</template>

<script>
import modalMixin from '@/components/Mixins/modal'
import indexMixin from './modules/index'
import viewer from '@/views/modules/viewer'

export default {
  name: 'BaseOne',
  mixins: [modalMixin, indexMixin],
  components: {
    viewer
  }
}
</script>
<style lang='scss' scoped>
</style>