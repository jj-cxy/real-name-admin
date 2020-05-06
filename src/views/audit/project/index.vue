<template>
  <a-card
    :body-style="{'padding': '12px 24px 24px'}"
    :bordered="false"
    title="项目备案审核"
    :headStyle="{'textAlign':'center'}"
  >
    <a-spin :spinning="confirmLoading">
      <a-row :gutter="15">
        <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="15">
          <a-form :form="form" class="detail-form detail-left">
            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="项目名称">
              <span>{{model.projectName}}</span>
            </a-form-item>
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="关联单位信息"
              style="margin-top: 8px"
            >
              <a-tabs defaultActiveKey="1" type="card" class="card-tabs">
                <a-tab-pane
                  v-for="(item,index) in model.units"
                  :key="index"
                  :tab="item.roleTypeDesc"
                >
                  <TabCon :unitData="item" />
                </a-tab-pane>
              </a-tabs>
            </a-form-item>

            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="施工许可证"
              style="position: relative;margin-top: 12px"
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
                      <td>{{model.totalProjectSchedule}}天</td>
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
                      <td>
                        <a-statistic
                          :value="model.contractPrice"
                          :valueStyle="{ fontSize: '16px' }"
                          suffix="元"
                        />
                      </td>
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
                      <td>
                        <a-statistic
                          :value="model.manufacturingCost || ''"
                          :valueStyle="{ fontSize: '16px' }"
                          suffix="元"
                        />
                      </td>
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
                      <td>{{model.salaryBankAccount.bankAccount || '-'}}</td>
                      <td class="tit">专户帐号名称</td>
                      <td>{{model.salaryBankAccount.bankAccountName || '-'}}</td>
                    </tr>
                    <tr>
                      <td class="tit">银行种类</td>
                      <td>{{model.salaryBankAccount.bankTypeDesc || '-'}}</td>
                      <td class="tit">账户余额</td>
                      <td>
                        <a-statistic
                          :precision="2"
                          :valueStyle="{ fontSize: '18px' }"
                          :value="model.salaryBankAccount.bankBalances"
                          suffix="元"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td class="tit">开户行名称</td>
                      <td>{{model.salaryBankAccount.bankName || '-'}}</td>
                      <td class="tit">账户状态</td>
                      <td>{{model.salaryBankAccount.accountStatusDesc || '-'}}</td>
                    </tr>
                    <tr>
                      <td class="tit">所属银行编码</td>
                      <td>{{model.salaryBankAccount.bankAffiliated || '-'}}</td>
                      <td class="tit">每月发薪日期</td>
                      <td>{{model.salaryTime || '-'}}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
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
            <!-- 审核人员 -->
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="审核人员"
              v-if="model.supervisorId"
            >
              <span>{{model.supervisorName}}</span>
            </a-form-item>

            <!-- 意见 -->
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="修改意见"
              v-if="model.modifyComment"
            >
              <span>{{model.modifyComment}}</span>
            </a-form-item>

            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="修改意见"
              v-if="model.recordComment"
            >
              <span>{{model.recordComment}}</span>
            </a-form-item>

            <!-- 建管处 -->
            <template
              v-if="(roleMark.split(',').includes('SupervisorMaster')) || (roleMark.split(',').includes('Supervisor'))"
            >
              <template v-if="!model.supervisorId">
                <a-form-item
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  label="分配监督员"
                  style="margin: 10px 0"
                >
                  <a-select
                    allowClear
                    labelInValue
                    v-decorator="['supervisorId',validatorRules.must]"
                    style="width: 360px"
                    placeholder="请选择"
                  >
                    <a-select-option
                      v-for="item in typeUserList"
                      :key="item.id"
                      :value="item.id"
                    >{{item.name}}</a-select-option>
                  </a-select>
                </a-form-item>
                <a-form-item style="text-align: center">
                  <a-button :style="{marginRight: '12px'}" @click="handleCancel">稍后处理</a-button>
                  <a-button type="primary" @click="handleNext">提 交</a-button>
                </a-form-item>
              </template>
              <template v-if="model.supervisorId">
                <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="处理意见">
                  <a-textarea
                    :rows="3"
                    v-decorator="['comment',validatorRules.comment]"
                    placeholder="..."
                  />
                </a-form-item>
                <a-form-item
                  style="text-align: center"
                  v-if="((bizType=='PROJECT_RECORD') || (bizType=='PROJECT_MODIFY')) && taskDefKey"
                >
                  <a-button :style="{marginRight: '12px'}" @click="handleCancel">稍后处理</a-button>
                  <a-button
                    :style="{marginRight: '12px'}"
                    type="danger"
                    @click="handleSubmit('false',$event)"
                  >驳 回</a-button>
                  <a-button type="primary" @click="handleSubmit('true',$event)">通 过</a-button>
                </a-form-item>
                <a-form-item
                  style="text-align: center"
                  v-if="bizType=='PROJECT_MODIFY' && !taskDefKey"
                >
                  <a-button :style="{marginRight: '12px'}" @click="handleCancel">稍后处理</a-button>
                  <a-button type="primary" @click="handleForm">提 交</a-button>
                </a-form-item>
              </template>
            </template>
          </a-form>
        </a-col>
        <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="9">
          <div class="attachment-box">
            <ul>
              <li v-for="item in this.fileList" :key="item.uid">
                <div style="margin: 5px 0; text-align: center">{{item.title}}</div>
                <img :src="item.url" />
              </li>
            </ul>
          </div>
        </a-col>
      </a-row>
    </a-spin>
  </a-card>
</template>

<script>
import modalMixin from '@/components/Mixins/modal'
import indexMixin from './modules/index'
import Viewer from '@/views/modules/Viewer'
import TabCon from './modules/TabCon/index'

export default {
  name: 'Auditproject',
  mixins: [modalMixin, indexMixin],
  components: {
    Viewer,
    TabCon
  }
}
</script>
