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
      </a-form>
    </a-spin>
  </a-drawer>
</template>

<script>
import pick from 'lodash.pick'
import modalMixin from '@/components/Mixins/modal'
import ProjectInfo from '@/views/modules/ProjectInfo'

export default {
  name: 'formDrawer',
  mixins: [modalMixin],
  components: {
    ProjectInfo
  },
  data() {
    return {
      Urls: {
        getByIdUrl: '/ida/api/project/get/'
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