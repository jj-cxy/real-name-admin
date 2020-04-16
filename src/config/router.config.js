// eslint-disable-next-line
import {
  UserLayout,
  BasicLayout,
  RouteView,
  BlankLayout,
  PageView
} from '@/layouts'

export const asyncRouterMap = [{
    path: '/',
    name: 'home',
    redirect: '/workplace/index',
    component: BasicLayout,
    children: [

      // workplace
      {
        path: '/workplace',
        name: 'workplace',
        redirect: '/workplace/index',
        component: PageView,
        // hideChildrenInMenu: true,
        meta: {
          title: '工作台',
          icon: 'file-done'
        },
        children: [{
            path: '/workplace/index',
            name: 'index',
            component: () => import('@/views/workplace/index'),
            meta: {
              title: '首页',
              keepAlive: false
            }
          },
          {
            path: '/order/todo',
            name: 'OrderTodo',
            component: () => import('@/views/modules/Order/todo/index'),
            meta: {
              title: '待办事项',
              keepAlive: true
            }
          },
          /* {
            path: '/order/overdue',
            name: 'OrderOverdue',
            component: () => import('@/views/modules/Order/overdue/index'),
            meta: {
              title: '超期工单',
              keepAlive: true
            }
          },
          {
            path: '/order/history',
            name: 'orderHistory',
            component: () => import('@/views/modules/Order/history/index'),
            meta: {
              title: '已办工单',
              keepAlive: true
            }
          }, */
          {
            path: '/audit/enterprise',
            name: 'AuditEnterprise',
            component: () => import('@/views/audit/enterprise/index'),
            meta: {
              title: '单位备案审核',
              icon: 'build',
              keepAlive: true
            }
          },
          {
            path: '/audit/project',
            name: 'AuditProject',
            component: () => import('@/views/audit/project/index'),
            meta: {
              title: '项目备案审核',
              icon: 'build',
              keepAlive: true
            }
          },
        ]
      },

      // project
      {
        path: '/project',
        name: 'project',
        redirect: '/project/list',
        // hideChildrenInMenu: true,
        component: PageView,
        meta: {
          title: '项目管理',
          icon: 'project',
          keepAlive: true
        },
        children: [{
          path: '/project/list',
          name: 'ProjectList',
          component: () => import('@/views/project/list/index'),
          meta: {
            title: '项目管理',
            keepAlive: false
          }
        }, {
          path: '/project/detail',
          name: 'ProjectDetail',
          component: () => import('@/views/project/detail/index'),
          meta: {
            title: '项目详情',
            keepAlive: false
          }
        }]
      },

      // enterprise
      {
        path: '/enterprise',
        name: 'enterprise',
        redirect: '/enterprise/list',
        // hideChildrenInMenu: true,
        component: PageView,
        meta: {
          title: '单位管理',
          icon: 'solution',
          keepAlive: true
        },
        children: [{
          path: '/enterprise/list',
          name: 'EnterpriseList',
          component: () => import('@/views/enterprise/list/index'),
          meta: {
            title: '单位管理',
            keepAlive: false
          }
        }, {
          path: '/enterprise/detail',
          name: 'EnterpriseDetail',
          component: () => import('@/views/enterprise/detail/index'),
          meta: {
            title: '单位详情',
            keepAlive: false
          }
        }]
      },

      // chart
      /* {
        path: '/chart',
        name: 'chart',
        component: () => import('@/views/chart/index'),
        meta: {
          title: '数据统计',
          icon: 'fund',
          keepAlive: true
        },
      }, */

      /* {
        path: '/data/statis',
        name: 'dataStatis',
        component: () => import('@/views/dataStatis/index'),
        meta: {
          title: '对外-数据统计',
          icon: 'fund',
          keepAlive: true
        },
      }, */

      // system
      {
        path: '/system',
        name: "system",
        redirect: '/system/user',
        component: RouteView,
        meta: {
          title: '系统配置',
          icon: 'setting'
        },
        children: [{
            path: '/system/user',
            name: 'user',
            component: () => import('@/views/system/user/index'),
            meta: {
              title: '用户管理',
              keepAlive: true
            }
          },
          {
            path: '/system/org',
            name: 'org',
            component: () => import('@/views/system/org/index'),
            meta: {
              title: '机构管理',
              keepAlive: true
            }
          },
          {
            path: '/system/role',
            name: 'role',
            component: () => import('@/views/system/role/index'),
            meta: {
              title: '角色管理',
              keepAlive: true
            }
          },
          {
            path: '/system/menu',
            name: 'menu',
            component: () => import('@/views/system/menu/index'),
            meta: {
              title: '菜单管理',
              keepAlive: true
            }
          },
          {
            path: '/system/open/auth',
            name: 'auth',
            component: () => import('@/views/system/open/index'),
            meta: {
              title: '第三方授权管理',
              keepAlive: true
            }
          },
          {
            path: '/system/dict',
            name: 'dict',
            component: () => import('@/views/system/dict/index'),
            meta: {
              title: '字典管理',
              keepAlive: true
            }
          },
          /* {
            path: '/system/log',
            name: 'log',
            component: () => import('@/views/system/log/index'),
            meta: {
              title: '操作日志管理',
              keepAlive: true
            }
          } */
        ]
      },
      // account
      {
        path: '/account',
        component: RouteView,
        name: 'account',
        hidden: true,
        meta: {
          title: '个人页',
          icon: 'user',
          permission: ['user']
        },
        children: [{
          path: '/account/set',
          name: 'set',
          component: () => import('@/views/account/settings/Index'),
          meta: {
            title: '个人设置',
            hideHeader: true
          },
          redirect: '/account/set/base',
          hideChildrenInMenu: true,
          children: [{
            path: '/account/set/base',
            name: 'baseSet',
            component: () => import('@/views/account/settings/BaseSet'),
            meta: {
              title: '修改密码',
              hidden: true,
              keepAlive: true
            }
          }, {
            path: '/account/set/profile',
            name: 'profileSet',
            component: () => import('@/views/account/settings/profileSet'),
            meta: {
              title: '修改资料',
              hidden: true,
              keepAlive: true
            }
          }]
        }]
      }
    ]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [{
    path: '/login',
    component: UserLayout,
    redirect: '/login/login',
    hidden: true,
    children: [{
        path: 'login',
        name: 'login',
        component: () => import('@/views/login/Login')
      },
      {
        path: 'register',
        name: 'register',
        component: () => import('@/views/login/Register')
      },
      {
        path: 'register-result',
        name: 'registerResult',
        component: () => import('@/views/login/RegisterResult')
      }
    ]
  },
  {
    path: '/404',
    component: () => import('@/views/exception/404')
  }

]