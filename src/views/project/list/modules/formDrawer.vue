<template>
  <a-drawer
    title="详情"
    :maskClosable="true"
    :width="960"
    placement="right"
    :closable="true"
    @close="visible=false"
    :visible="visible"
  >
    <a-spin :spinning="confirmLoading">
      <a-form class="detail-form" :form="form">
        <project-info @close="visible=false" :mdl="model" v-if="model.assetsId"></project-info>
        <operator-table style="margin-top: 24px" v-if="model.id" :projectId="model.id"></operator-table>
      </a-form>
    </a-spin>
  </a-drawer>
</template>

<script>
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
    }
  }
}
</script>

<style scoped>
</style>