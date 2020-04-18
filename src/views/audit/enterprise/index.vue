<template>
  <a-card
    :body-style="{'padding': '12px 24px 24px'}"
    :bordered="false"
    title="单位备案审核"
    :headStyle="{'textAlign':'center'}"
  >
    <a-spin :spinning="confirmLoading">
      <a-row :gutter="15">
        <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="15">
          <a-form :form="form" class="detail-form detail-left">
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
                      <td colspan="3">{{model.legalPersonIdCard}}</td>
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
                        <td class="tit">安全生产许可证</td>
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
            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="单位资质">
              <div class="detail-table" v-for="item in model.qualifications" :key="item.id">
                <table>
                  <tbody>
                    <tr>
                      <td class="tit">资质资格类型</td>
                      <td>{{item.qualificationCategoryDesc}}</td>
                      <td class="tit">专业类别</td>
                      <td>{{item.qualificationProfessionalType}}</td>
                    </tr>
                    <tr>
                      <td class="tit">资质资格等级</td>
                      <td>{{item.qualificationLevelDesc}}</td>
                      <td class="tit">证书编号</td>
                      <td>{{item.qualificationNo}}</td>
                    </tr>
                    <tr>
                      <td class="tit">首次批准日期</td>
                      <td>{{item.qualificationDate}}</td>
                      <td class="tit">资质取得方式</td>
                      <td>{{item.qualificationAcquireDesc}}</td>
                    </tr>
                    <tr>
                      <td class="tit">资格状态</td>
                      <td>{{item.qualificationStatusDesc}}</td>
                      <td class="tit"></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td class="tit">批准资质资格内容</td>
                      <td colspan="3">{{item.qualificationContent}}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </a-form-item>
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="审核人员"
              v-if="model.supervisorId || model.qualityId"
            >
              <span>{{model.supervisorName || model.qualityName}}</span>
            </a-form-item>
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="建管处审核意见"
              v-if="model.sAuditComment"
            >
              <span>{{model.sAuditComment}}</span>
            </a-form-item>
            <a-form-item
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="质监站审核意见"
              v-if="model.qAuditComment"
            >
              <span>{{model.qAuditComment}}</span>
            </a-form-item>
            <a-form-item
              v-if="!model.supervisorId && !model.qualityId"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              label="分配审核人员"
              style="margin: 10px 0"
            >
              <a-select
                allowClear
                labelInValue
                v-if="roleMark=='SupervisorMaster'"
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
              <a-select
                allowClear
                labelInValue
                v-if="roleMark=='QualityMaster'"
                v-decorator="['qualityId',validatorRules.must]"
                style="width: 360px"
                placeholder="请选择"
              >
                <a-select-option
                  v-for="item in typeUserList"
                  :key="item.id"
                  :value="item.id"
                >{{item.name}}</a-select-option>
              </a-select>
              <!-- <span>金朱西路站城市轨道交通综合体项目</span> -->
            </a-form-item>

            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="处理意见" v-else>
              <a-textarea
                :rows="3"
                v-decorator="['comment',validatorRules.must]"
                placeholder="..."
              />
            </a-form-item>

            <a-form-item style="text-align: center" v-if="model.supervisorId || model.qualityId">
              <a-button :style="{marginRight: '12px'}" @click="handleCancel">稍后处理</a-button>
              <a-button
                :style="{marginRight: '12px'}"
                type="danger"
                @click="handleSubmit('false',$event)"
              >驳 回</a-button>
              <a-button type="primary" @click="handleSubmit('true',$event)">通 过</a-button>
            </a-form-item>
            <a-form-item style="text-align: center" v-else>
              <a-button :style="{marginRight: '12px'}" @click="handleCancel">稍后处理</a-button>
              <a-button type="primary" @click="handleNext">提 交</a-button>
            </a-form-item>
          </a-form>
        </a-col>
        <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="9">
          <div class="attachment-box">
            <ul>
              <li v-for="item in this.fileList" :key="item.uid">
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

export default {
  name: 'EnterpriseAudit',
  mixins: [modalMixin, indexMixin],
  components: {
    Viewer
  }
}
</script>
