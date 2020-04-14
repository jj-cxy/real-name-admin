<template>
  <a-layout-sider
    :class="['sider', isDesktop() ? null : 'shadow', theme, fixSiderbar ? 'ant-fixed-sidemenu' : null ]"
    width="200px"
    :collapsible="collapsible"
    v-model="collapsed"
    :trigger="null"
  >
    <logo />
    <s-menu :collapsed="collapsed" :menu="menus" :theme="theme" :mode="mode" @select="onSelect"></s-menu>
  </a-layout-sider>
</template>

<script>
import Logo from '@/components/tools/Logo'
import SMenu from './index'
import { mixin, mixinDevice } from '@/utils/mixin'
import { axios } from '@/utils/request'

export default {
  name: 'SideMenu',
  components: { Logo, SMenu },
  mixins: [mixin, mixinDevice],
  props: {
    mode: {
      type: String,
      required: false,
      default: 'inline'
    },
    theme: {
      type: String,
      required: false,
      default: 'dark'
    },
    collapsible: {
      type: Boolean,
      required: false,
      default: false
    },
    collapsed: {
      type: Boolean,
      required: false,
      default: false
    },
    menus: {
      type: Array,
      required: true
    }
  },
  methods: {
    onSelect(obj) {
      this.$emit('menuSelect', obj)

      /* let curPath = obj.key,
        curId = ''
      function checkedKey(data) {
        for (let i = 0; i < data.length; i++) {
          let key = data[i]
          if (curPath == key.path) {
            curId = key.id
          }
          if (key.children) {
            checkedKey(key.children)
          }
        }
      }
      checkedKey(this.menus)
      console.log('菜单Id', curId)
      this.Cookies.set('curId', curId) */
    }
  }
}
</script>
