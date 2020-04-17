<template>
  <a-card
    :body-style="{'padding': '12px 24px 24px'}"
    :bordered="false"
    title="项目备案审核"
    :headStyle="{'textAlign':'center'}"
  >
    <a-row :gutter="15">
      <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="15">
        <a-form :form="form" class="detail-form detail-left">
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="项目名称">
            <span>金朱西路站城市轨道交通综合体项目</span>
          </a-form-item>
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="关联单位信息"
            style="margin-top: 8px"
          >
            <a-tabs defaultActiveKey="1" type="card" class="card-tabs" size="small">
              <a-tab-pane tab="建设单位" key="1">
                <TabCon />
              </a-tab-pane>
              <a-tab-pane tab="施工单位" key="2" forceRender>Content of Tab Pane 2</a-tab-pane>
              <a-tab-pane tab="监理单位" key="3">Content of Tab Pane 3</a-tab-pane>
            </a-tabs>
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
                    <td class="tit">工商登记开始时间</td>
                    <td>2014年10月23日</td>
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
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="工资专户信息">
            <div class="detail-table">
              <table>
                <tbody>
                  <tr>
                    <td class="tit">专户帐号</td>
                    <td>5435643654654654</td>
                    <td class="tit">银行种类</td>
                    <td>招商银行</td>
                  </tr>
                  <tr>
                    <td class="tit">专户帐号名称</td>
                    <td>某某某专户</td>
                    <td class="tit">账户余额</td>
                    <td>812,343.24元</td>
                  </tr>
                  <tr>
                    <td class="tit">开户行名称</td>
                    <td>贵阳银行支行</td>
                    <td class="tit">账户状态</td>
                    <td>已备案</td>
                  </tr>
                  <tr>
                    <td class="tit">所属银行编码</td>
                    <td>5435643654654654</td>
                    <td class="tit">每月发薪日期</td>
                    <td>15号</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="前端软件公司">
            <span>贵阳市金阳建设数据服务有限公司</span>
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="项目简介">
            <span>贵阳经济技术开发区建设管理局</span>
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="具体定位地址">
            <div class="map-box">
              <div id="allmap"></div>
            </div>
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="分配监督员" style="margin: 10px 0">
            <a-select
              allowClear
              v-decorator="['remark',validatorRules.must]"
              style="width: 360px"
              placeholder="请选择"
            >
              <a-select-option
                v-for="(item,index) in typeUserList"
                :key="index"
                :value="item.value"
              >{{item.name}}</a-select-option>
            </a-select>
            <!-- <span>金朱西路站城市轨道交通综合体项目</span> -->
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
import TabCon from './modules/TabCon/index'

export default {
  name: 'Auditproject',
  mixins: [modalMixin, indexMixin],
  components: {
    viewer,
    TabCon
  }
}
</script>
