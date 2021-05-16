import Vue from 'vue'
import Router from 'vue-router'
import Login from "../components/Login";

import Home_admin from "../components/common/admin/Home-admin";
import Sidebar_admin from "../components/common/admin/Sidebar-admin"
import Home_commander from "../components/common/commander/Home-commander"
import Sidebar_commander from "../components/common/commander/Sidebar-commander"
import Home_expert from "../components/common/expert/Home-expert"
import Sidebar_expert from "../components/common/expert/Sidebar-expert"
import Home_stuff from "../components/common/stuff/Home-stuff"
import Siderbar_stuff from "../components/common/stuff/Sidebar-stuff"

import Initial from "../components/initial/Initial";
import Register from "../components/register/Register";
import Emergency from "../components/emergency/Emergency";
import Material from "../components/material/Material";
import MaterialLocation from "../components/material/MaterialLocation";
import Company from "../components/company/Company";
import City from "../components/city/City";
import Alert from "../components/alert/Alert";
import Process from "../components/process/Process";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login',
      component: Login,
      meta: {
        title: "环保应急管理系统"
      }
    },
    {
      path: '/login',
      component: Login,
      meta: {
        title: "环保应急管理系统"
      }
    },
    {
      path: '/home-admin',
      component: Home_admin,
      children: [
        {
          path: '/home-admin/initial',
          component: Initial,
          meta: {
            title: "环保应急管理系统"
          }
        },
        {
          path: '/home-admin/register',
          component: Register,
          meta: {
            title: "环保应急管理系统"
          }
        }
      ]
    },
    {
      path: '/home-commander',
      component: Home_commander,
      children: [
        {
          path: '/home-commander/initial',
          component: Initial,
          meta: {
            title: "环保应急管理系统"
          }
        },
        {
          path: '/home-commander/alert',
          component: Alert,
          meta: {
            title: "环保应急管理系统"
          }
        }
      ]
    },
    {
      path: '/home-expert',
      component: Home_expert,
      children: [
        {
          path: '/home-expert/initial',
          component: Initial,
          meta: {
            title: "环保应急管理系统"
          }
        },
        {
          path: '/home-expert/alert',
          component: Alert,
          meta: {
            title: "环保应急管理系统"
          }
        }
      ]
    },
    {
      path: '/home-stuff',
      component: Home_stuff,
      children: [
        {
          path: '/home-stuff/initial',
          component: Initial,
          meta: {
            title: "环保应急管理系统"
          }
        },
        {
          path: '/home-stuff/emergency',
          component: Emergency,
          meta: {
            title: "环保应急管理系统"
          }
        },
        {
          path: '/home-stuff/material',
          component: Material,
          meta: {
            title: "环保应急管理系统"
          }
        },
        {
          path: '/home-stuff/material-location',
          component: MaterialLocation,
          meta: {
            title: "环保应急管理系统"
          }
        },
        {
          path: '/home-stuff/process',
          component: Process,
          meta: {
            title: "环保应急管理系统"
          }
        },
        {
          path: '/home-stuff/company',
          component: Company,
          meta: {
            title: "环保应急管理系统"
          }
        },
        {
          path: '/home-stuff/city',
          component: City,
          meta: {
            title: "环保应急管理系统"
          }
        },
        {
          path: '/home-stuff/alert',
          component: Alert,
          meta: {
            title: "环保应急管理系统"
          }
        }
      ]
    }
  ]
})
