<template>
  <a-modal
    :title="model.dealType=='stop'?'终止项目':'中断项目'"
    :width="600"
    centered
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
    :maskClosable="false"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-form-item
          style="margin-bottom:0"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="项目名称"
        >
          <p>{{model.projectName || model.name}}</p>
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="理由描述">
          <a-textarea rows="3" v-decorator="[ 'rentExp', validatorRules.must]" />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="附件上传"
          style="margin-bottom:24px"
          help="加盖公章，只能上传pdf、jpg、png格式文件，文件不能超过20M"
        >
          <a-upload
            :beforeUpload="beforeUpload"
            :multiple="singleFile"
            @preview="handlePreview"
            :fileList="fileList"
            :remove="handleFileRemove"
          >
            <a-button :loading="uploading">
              <a-icon type="upload" />选择上传文件
            </a-button>
          </a-upload>
          <viewer ref="viewModal"></viewer>
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import modalMixin from '@/components/Mixins/modal'
import pick from 'lodash.pick'
import { axios } from '@/utils/request'
import viewer from '@/views/modules/viewer'

export default {
  name: 'StopBreakModal',
  mixins: [modalMixin],
  components: {
    viewer
  },
  data() {
    return {
      Urls: {
        editUrl: '/biz/api/oaSuspend/bizApply'
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
      }
    }
  },
  created() {},
  methods: {
    beforeOpen(record) {
      this.fileList = []
    },
    afterUpload(data) {
      this.model.attachment = data.id
    },
    setForm(data) {
      this.model = data
    },
    handleSubmit() {
      const {
        form: { validateFields }
      } = this
      this.confirmLoading = true
      validateFields((errors, values) => {
        if (!errors) {
          axios({
            url: this.Urls.editUrl,
            method: 'post',
            data: {
              rentExp: values.rentExp,
              type: this.model.dealType,
              pass: true,
              isDeal: true,
              projectId: this.model.projectId || this.model.id,
              rentId: localStorage.getItem('in-userId'),
              attachment: this.model.attachment || ''
            }
          })
            .then(res => {
              this.confirmLoading = false
              if (res.code == 0) {
                this.$notification.success({
                  message: this.model.dealType == 'stop' ? '终止成功' : '中断成功'
                })
                this.visible = false
                this.$emit('ok')
              } else {
                this.$notification.error({
                  message: res.msg
                })
              }
            })
            .catch(() => {
              this.confirmLoading = false
            })
        } else {
          this.confirmLoading = false
        }
      })
    }
  }
}
</script>

<style scoped>
</style>