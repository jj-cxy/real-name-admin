<template>
  <a-modal
    :title="textMap[dialogStatus]"
    :width="500"
    centered
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
    :maskClosable="false"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <template v-if="this.dialogStatus == 'add'">
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="收费项目">
            <a-select
              allowClear
              showSearch
              optionFilterProp="children"
              placeholder="请选择"
              v-decorator="[ 'projectId', validatorRules.must]"
              @change="projectChange"
            >
              <a-select-option
                v-for="(item,index) in projectList"
                :key="index"
                :value="item.id"
              >{{item.name}}</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="需付费对象">
            <a-select
              allowClear
              showSearch
              optionFilterProp="children"
              placeholder="请选择"
              v-decorator="[ 'userId', validatorRules.must]"
            >
              <a-select-option
                v-for="(item,index) in payUserList"
                :key="index"
                :value="item.userId"
              >{{item.userName}}</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="收费类型">
            <a-select
              allowClear
              showSearch
              optionFilterProp="children"
              placeholder="请选择"
              v-decorator="[ 'type', validatorRules.must]"
            >
              <a-select-option
                v-for="(item,index) in chargeTypeList"
                :key="index"
                :value="item.value"
              >{{item.name}}</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="收费金额">
            <a-input type="number" v-decorator="[ 'amount', validatorRules.must]">
              <span slot="suffix">元</span>
            </a-input>
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="收费说明">
            <a-textarea v-decorator="[ 'remark']" placeholder="..." :rows="4" />
          </a-form-item>
        </template>
        <template v-if="this.dialogStatus == 'edit'">
          <a-form-item style="text-align: center">
            <span>{{model.projectName}}</span>
            <div style="line-height: 18px">
              {{model.typeDesc}}：
              <a>
                <b>{{model.amount}}</b> 元
              </a>
            </div>
          </a-form-item>
          <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="修改为">
            <a-input type="number" v-decorator="['amount',  validatorRules.must]">
              <span slot="suffix">元</span>
            </a-input>
          </a-form-item>
        </template>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import modalMixin from '@/components/Mixins/modal'
import pick from 'lodash.pick'
import { axios } from '@/utils/request'

export default {
  name: 'formModel',
  mixins: [modalMixin],
  data() {
    return {
      Urls: {
        addUrl: '/biz/oaCharges/insert',
        editUrl: '/biz/oaCharges/update/',
        projectListUrl: '/biz/oaProject/list',
        payUserListUrl: '/biz/oaProject/relevantPersonnel/'
      },
      textMap: {
        add: '新增收费',
        edit: '修改收费价格'
      },
      labelCol: {
        xs: {
          span: 24
        },
        sm: {
          span: 5
        }
      },
      wrapperCol: {
        xs: {
          span: 24
        },
        sm: {
          span: 19
        }
      },
      validatorRules: {
        must: {
          rules: [{ required: true, message: '此字段为必填!' }]
        }
      },
      projectList: [],
      payUserList: [],
      chargeTypeList: [
        { name: '租赁服务费', value: 'RENT_SERV' },
        { name: '挂牌费', value: 'LISTING' },
        { name: '公开遴选服务费', value: 'OPEN_SEL' },
        { name: '保证金', value: 'BOND' },
        { name: '其他', value: 'OTHER' }
      ]
    }
  },
  methods: {
    beforeOpen(record) {
      if (!record.id) {
        this.getProjectList()
      }
    },
    projectChange(val) {
      this.getPayUserList(val)
    },
    getProjectList() {
      axios({
        url: this.Urls.projectListUrl,
        method: 'get'
      }).then(res => {
        if (res.code == 0) {
          this.projectList = res.data.records
        } else {
          this.$notification.error({
            message: res.msg
          })
        }
      })
    },
    getPayUserList(id) {
      axios({
        url: this.Urls.payUserListUrl + id,
        method: 'get'
      }).then(res => {
        if (res.code == 0) {
          this.payUserList = res.data
        } else {
          this.$notification.error({
            message: res.msg
          })
        }
      })
    },
    setForm(data) {
      this.model = data
    }
  }
}
</script>

<style scoped>
</style>