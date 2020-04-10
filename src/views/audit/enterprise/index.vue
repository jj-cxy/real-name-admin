<template>
  <a-card
    :body-style="{'padding': '12px 24px 24px'}"
    :bordered="false"
    title="单位备案审核"
    :headStyle="{'textAlign':'center'}"
  >
    <a-row :gutter="24">
      <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="15">
        <a-form :form="form" class="detail-form detail-left">
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="企业名称">
            <span>贵阳市金阳建设数据服务有限公司</span>
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="统一社会信用代码">
            <span>91520115314263671W</span>
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="主要业务类型">
            <span>监理（监理单位由质监站审核）</span>
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="单位信息">
            <div class="detail-table">
              <table>
                <tbody>
                  <tr>
                    <td class="tit">所属地区</td>
                    <td>贵州省 贵阳市 云岩区</td>
                    <td class="tit">邮政编码</td>
                    <td>550300</td>
                  </tr>
                  <tr>
                    <td class="tit">注册地址</td>
                    <td colspan="3">贵阳国家高新技术产业开发区行政审批局</td>
                  </tr>
                  <tr>
                    <td class="tit">营业地址</td>
                    <td colspan="3">贵州省贵阳市贵阳国家高新技术产业开发区六盘水路</td>
                  </tr>
                  <tr>
                    <td class="tit">工商登记有效期限</td>
                    <td>2014年10月23日--2034年10月22日</td>
                    <td class="tit">到期时间</td>
                    <td>2034年10月22日</td>
                  </tr>
                  <tr>
                    <td class="tit">法人姓名</td>
                    <td>周康</td>
                    <td class="tit">法人手机号</td>
                    <td>1888888888</td>
                  </tr>
                  <tr>
                    <td class="tit">法人身份证号</td>
                    <td colspan="3">520115000212582</td>
                  </tr>
                  <tr>
                    <td class="tit">联系人姓名</td>
                    <td>2020-03-26</td>
                    <td class="tit">联系电话</td>
                    <td>是</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="单位资质">
            <div class="detail-table">
              <table>
                <tbody>
                  <tr>
                    <td class="tit">资格类型</td>
                    <td>工程监理</td>
                    <td class="tit">专业类别</td>
                    <td>工程监理</td>
                  </tr>
                  <tr>
                    <td class="tit">资格等级</td>
                    <td>甲级</td>
                    <td class="tit">证书编号</td>
                    <td>452589458439</td>
                  </tr>
                  <tr>
                    <td class="tit">首次批准日期</td>
                    <td>2020-03-26</td>
                    <td class="tit">取得方式</td>
                    <td>升级</td>
                  </tr>
                  <tr>
                    <td class="tit">资格状态</td>
                    <td>已备案</td>
                    <td class="tit"></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td class="tit">批准资质资格内容</td>
                    <td colspan="3">是</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="处理意见">
            <a-textarea :rows="3" v-decorator="['remark',validatorRules.must]" placeholder="..." />
          </a-form-item>
        </a-form>
      </a-col>
      <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="9">
        <div class="attachment-box">
          <ul>
            <li>
              <img src="timg.jpg" />
            </li>
            <li>
              <img src="timg.jpg" />
            </li>
          </ul>
        </div>
      </a-col>
    </a-row>
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
