<template>
  <a-drawer
    title="详情"
    :maskClosable="true"
    :width="960"
    placement="right"
    :closable="true"
    @close="visible=false"
    :visible="visible"
    class="detail-form"
    style="height: calc(100% - 55px);overflow: auto;padding-bottom: 53px;"
  >
    <a-spin :spinning="confirmLoading">
      <a-form class="detail-form" :form="form">
        <project-info @close="visible=false" :mdl="model" v-if="model.assetsId"></project-info>
        <operator-table
          style="margin-top: 24px"
          v-if="model.procInsId"
          :procInsId="model.procInsId"
        ></operator-table>
      </a-form>
    </a-spin>
  </a-drawer>
</template>

<script>
import { axios } from '@/utils/request'
import pick from 'lodash.pick'
import modalMixin from '@/components/Mixins/modal'
import operatorTable from './operatorTable'
import ProjectInfo from '@/views/modules/ProjectInfo'

export default {
  name: 'formDrawer',
  mixins: [modalMixin],
  components: {
    operatorTable,
    ProjectInfo
  },
  data() {
    return {
      Urls: {
        getByIdUrl: '/biz/oaProject/get/'
      }
    }
  },
  computed: {},
  methods: {
    setForm(data) {
      this.model = data
    },
    fillForm(record) {
      this.confirmLoading = true
      axios({
        url: this.Urls.getByIdUrl + record.projectNo,
        method: 'get'
      })
        .then(res => {
          if (res.code == 0) {
            this.setForm(res.data)
          } else {
            this.$notification.error({
              message: res.msg
            })
          }
        })
        .finally(() => {
          this.confirmLoading = false
        })
    }
  }
}
</script>

<style scoped>
</style>