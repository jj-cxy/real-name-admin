<template>
  <a-modal
    title="添加常用业务"
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
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="业务名称">
          <a-input placeholder="请输入业务名称" v-decorator="['name', validatorRules.must]" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="链接">
          <a-input placeholder="请输入链接的页面url" v-decorator="['link', validatorRules.must]" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="图标">
          <a-input placeholder="点击右侧按钮选择图标" read-only v-model="mdl.icon">
            <a-icon slot="addonAfter" type="select" @click="selectIcons" />
          </a-input>
        </a-form-item>
      </a-form>
    </a-spin>
    <!-- 选择图标 -->
    <icons
      @choose="handleIconChoose"
      @close="handleIconCancel"
      :iconChooseVisible="iconChooseVisible"
    ></icons>
  </a-modal>
</template>

<script>
import { axios } from '@/utils/request'
import modalMixin from '@/components/Mixins/modal'
import Icons from './icon/Icons'

export default {
  name: 'LinkModel',
  mixins: [modalMixin],
  components: {
    Icons
  },
  data() {
    return {
      Urls: {
        addUrl: '/auth/api/user/insert',
        roleListurl: '/auth/api/role/list'
      },
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 }
      },
      validatorRules: {
        must: {
          rules: [{ required: true, message: '此字段为必填!' }]
        }
      },
      mdl: {
        icon: ''
      },
      iconChooseVisible: false
    }
  },
  created() {},
  methods: {
    beforeOpen() {},

    // 角色列表
    getRoleList() {
      axios({
        url: this.Urls.roleListurl,
        method: 'get'
      }).then(res => {
        if (res.code == 0) {
          this.roleList = res.data.records
        } else {
          this.$notification.error({
            message: res.msg
          })
        }
      })
    },
    beforeSubmit(form) {
      form.icon = this.mdl.icon
      return form
    },
    selectIcons() {
      this.iconChooseVisible = true
    },
    handleIconCancel() {
      this.iconChooseVisible = false
    },
    handleIconChoose(value) {
      this.mdl.icon = value
      this.iconChooseVisible = false
    }
  }
}
</script>

<style scoped>
</style>