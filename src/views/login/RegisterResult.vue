<template>
  <result
    :isSuccess="true"
    :content="false"
    :title="name"
    class="result"
    :description="description"
  >
    <template slot="action">
      <a-button size="large" style="margin-left: 8px" @click="goHomeHandle">进入首页</a-button>
    </template>
  </result>
</template>

<script>
import { Result } from '@/components'
import Vue from 'vue'
import { ACCESS_TOKEN } from '@/store/mutation-types'

export default {
  name: 'RegisterResult',
  components: {
    Result
  },
  data() {
    return {
      description: '',
      form: {}
    }
  },
  computed: {
    name() {
      const v = (this.form && this.form.name) || 'xxx'
      const title = `你的账户：${v} 注册成功`
      return title
    }
  },
  created() {
    this.form = this.$route.params
  },
  methods: {
    goHomeHandle() {
      Vue.ls.set(ACCESS_TOKEN, new Date().getTime())
      this.$router.push({ path: '/' })
    }
  }
}
</script>

<style scoped>
.result {
  width: 50%;
  background-color: #fff;
  padding: 24px;
  z-index: 100;
  position: relative;
}
</style>
