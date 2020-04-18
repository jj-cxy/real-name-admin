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
      <a-form class="detail-form" :form="form"></a-form>
    </a-spin>
  </a-drawer>
</template>

<script>
import pick from 'lodash.pick'
import modalMixin from '@/components/Mixins/modal'

export default {
  name: 'formDrawer',
  mixins: [modalMixin],
  components: {},
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