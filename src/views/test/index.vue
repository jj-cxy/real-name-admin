<template>
  <a-form :form="form" @submit="handleSubmit">
    <div v-for="(k, index) in persons" :key="index">
      <a-form-item :label="k.type+'姓名'" :required="false">
        <a-input
          v-decorator="[
          `name[${index}]`,
          { initialValue: k.name},
          {
            validateTrigger: ['change', 'blur'],
            rules: [
              {
                required: true,
                whitespace: true,
                message: '此字段必填!',
              },
            ],
          },
        ]"
          placeholder="请填写"
          style="width: 60%; margin-right: 8px"
        />
      </a-form-item>
      <a-form-item label="手机号" :required="false">
        <a-input
          v-decorator="[
          `phone[${index}]`,
          { initialValue: k.phone},
          {
            validateTrigger: ['change', 'blur'],
            rules: [
              {
                required: true,
                whitespace: true,
                message: '此字段必填!',
              },
            ],
          },
        ]"
          placeholder="请填写"
          style="width: 60%; margin-right: 8px"
        />
      </a-form-item>
    </div>
    <a-form-item>
      <a-button type="primary" html-type="submit">Submit</a-button>
      <a-button @click="handleSet">配置</a-button>
    </a-form-item>
  </a-form>
</template>

<script>
import indexMixin from './modules/index'
export default {
  mixins: [indexMixin],
  components: {},
  data() {
    return {}
  },
  computed: {},
  watch: {},
  methods: {},
  created() {},
  mounted() {}
}
</script>
<style lang='scss' scoped>
</style>