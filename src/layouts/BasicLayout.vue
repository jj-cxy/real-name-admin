<template>
  <a-layout :class="['layout', device]">
    <!-- SideMenu -->
    <a-drawer
      v-if="isMobile()"
      width="200"
      placement="left"
      :wrapClassName="`drawer-sider ${navTheme}`"
      :closable="false"
      :visible="collapsed"
      @close="drawerClose"
    >
      <side-menu
        mode="inline"
        :menus="menus"
        :theme="navTheme"
        :collapsed="false"
        :collapsible="true"
        @menuSelect="menuSelect"
      ></side-menu>
    </a-drawer>

    <side-menu
      v-else-if="isSideMenu()"
      mode="inline"
      :menus="menus"
      :theme="navTheme"
      :collapsed="collapsed"
      :collapsible="true"
    ></side-menu>

    <a-layout
      :class="[layoutMode, `content-width-${contentWidth}`]"
      :style="{ paddingLeft: contentPaddingLeft, minHeight: '100vh', overflow: 'hidden' }"
    >
      <!-- layout header -->
      <global-header
        :mode="layoutMode"
        :menus="menus"
        :theme="navTheme"
        :collapsed="collapsed"
        :device="device"
        @toggle="toggle"
      />

      <!-- layout content -->
      <a-layout-content
        :style="{ height: '100%', margin: multiTab ? '12px' : '12px', paddingTop: fixedHeader ? '60px' : '0' }"
      >
        <multi-tab v-if="multiTab" style="margin: -12px -12px 12px;"></multi-tab>
        <transition name="page-transition">
          <route-view />
        </transition>
      </a-layout-content>

      <!-- layout footer -->
      <!-- <a-layout-footer>
        <global-footer/>
      </a-layout-footer>-->

      <!-- Setting Drawer (show in development mode) -->
      <setting-drawer v-if="!production"></setting-drawer>
    </a-layout>
  </a-layout>
</template>

<script>
import { triggerWindowResizeEvent } from '@/utils/util'
import { mapState, mapActions } from 'vuex'
import { mixin, mixinDevice } from '@/utils/mixin'
import config from '@/config/defaultSettings'

import RouteView from './RouteView'
import { asyncRouterMap } from '@/config/router.config.js'
import MultiTab from '@/components/MultiTab'
import SideMenu from '@/components/Menu/SideMenu'
import GlobalHeader from '@/components/GlobalHeader'
import GlobalFooter from '@/components/GlobalFooter'
import SettingDrawer from '@/components/SettingDrawer'
import { axios } from '@/utils/request'

export default {
  name: 'BasicLayout',
  mixins: [mixin, mixinDevice],
  components: {
    RouteView,
    MultiTab,
    SideMenu,
    GlobalHeader,
    GlobalFooter,
    SettingDrawer
  },
  data() {
    return {
      production: config.production,
      collapsed: false,
      menus: [],
      menuData: []
    }
  },
  computed: {
    ...mapState({
      // 动态主路由
      mainMenu: state => state.permission.addRouters
    }),
    contentPaddingLeft() {
      if (!this.fixSidebar || this.isMobile()) {
        return '0'
      }
      if (this.sidebarOpened) {
        return '200px'
      }
      return '80px'
    }
  },
  watch: {
    sidebarOpened(val) {
      this.collapsed = !val
    }
  },
  created() {
    // this.menus = this.mainMenu.find(item => item.path === '/').children
    this.menus = asyncRouterMap.find(item => item.path === '/').children
    this.getMenu()
    this.collapsed = !this.sidebarOpened
  },
  mounted() {
    const userAgent = navigator.userAgent
    if (userAgent.indexOf('Edge') > -1) {
      this.$nextTick(() => {
        this.collapsed = !this.collapsed
        setTimeout(() => {
          this.collapsed = !this.collapsed
        }, 16)
      })
    }
  },
  methods: {
    getMenu() {
      axios({
        url: '/auth/api/resource/getResource',
        method: 'get',
        params: { type: 'MENU' }
      }).then(res => {
        if (res.code == 0) {
          if (res.data.records && res.data.records.length > 0) {
            this.menus = res.data.records.map(item => this.mapTree(item))
            let orgType = localStorage.getItem('orgType')
            for (let index = 0; index < this.menus.length; index++) {
              if (orgType && orgType == 'city') {
                this.menus.splice(4, 1)
              } else if (orgType && orgType == 'area') {
                this.menus.splice(3, 1)
              }
            }
          }
        } else {
          this.menus = []
        }
      })
    },
    ...mapActions(['setSidebar']),
    toggle() {
      this.collapsed = !this.collapsed
      this.setSidebar(!this.collapsed)
      triggerWindowResizeEvent()
    },
    // 格式化树
    mapTree(item) {
      const haveChildren = Array.isArray(item.children) && item.children.length > 0
      return {
        id: item.id,
        path: item.url,
        meta: { title: item.name, icon: item.icon || 'smile' },
        children: haveChildren ? item.children.map(i => this.mapTree(i)) : null,
        name: item.title
      }
    },
    paddingCalc() {
      let left = ''
      if (this.sidebarOpened) {
        left = this.isDesktop() ? '200px' : '80px'
      } else {
        left = (this.isMobile() && '0') || (this.fixSidebar && '80px') || '0'
      }
      return left
    },
    menuSelect() {
      if (!this.isDesktop()) {
        this.collapsed = false
      }
    },
    drawerClose() {
      this.collapsed = false
    }
  }
}
</script>

<style lang="less">
@import url('../components/global.less');

/*
 * The following styles are auto-applied to elements with
 * transition="page-transition" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the page transition by editing
 * these styles.
 */

.page-transition-enter {
  opacity: 0;
}

.page-transition-leave-active {
  opacity: 0;
}

.page-transition-enter .page-transition-container,
.page-transition-leave-active .page-transition-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
