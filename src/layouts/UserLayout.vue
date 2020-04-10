<template>
  <div id="userLayout" :class="['user-layout-wrapper', device]">
    <div class="container">
      <route-view></route-view>
      <div class="footer">
        <div class="copyright">Copyright &copy; 2019 金建数据</div>
      </div>
    </div>
  </div>
</template>

<script>
import RouteView from './RouteView'
import { mixinDevice } from '@/utils/mixin'

export default {
  name: 'UserLayout',
  components: {
    RouteView
  },
  mixins: [mixinDevice],
  data() {
    return {}
  },
  mounted() {
    document.body.classList.add('userLayout')
  },
  beforeDestroy() {
    document.body.classList.remove('userLayout')
  }
}
</script>

<style lang="less" scoped>
#userLayout.user-layout-wrapper {
  height: 100%;
  display: flex;
  align-items: center;

  &.mobile {
    .container {
      .main {
        max-width: 360px;
        width: 100%;
      }
    }
  }

  .container {
    width: 100%;
    min-height: 100%;
    background: #f0f2f5 url(~/login-bg.png) no-repeat 50%;
    background-size: 100% 100%;
    background-attachment: fixed;

    .main {
      margin: 0 auto;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 1;
    }

    .footer {
      position: absolute;
      width: 100%;
      bottom: 0;
      padding: 0 16px;
      margin: 48px 0 24px;
      text-align: center;

      .links {
        margin-bottom: 8px;
        font-size: 14px;

        a {
          color: rgba(0, 0, 0, 0.45);

          transition: all 0.3s;

          &:not(:last-child) {
            margin-right: 40px;
          }
        }
      }

      .copyright {
        color: rgba(255, 255, 255, 1);
        font-size: 14px;
      }
    }
  }
}
</style>
