import Vue from 'vue'
import Router from 'vue-router'
import Login from "../components/Login";

import AdminHome from "../components/common/admin/AdminHome";
import AdminSidebar from "../components/common/admin/AdminSidebar"
import CommanderHome from "../components/common/commander/CommanderHome"
import CommanderSidebar from "../components/common/commander/CommanderSidebar"
import ExpertHome from "../components/common/expert/ExpertHome"
import ExpertSidebar from "../components/common/expert/ExpertSidebar"
import StuffHome from "../components/common/stuff/StuffHome"
import StuffSidebar from "../components/common/stuff/StuffSidebar"

import AdminInitial from "../components/initial/admin/AdminInitial";
import CommanderInitial from "../components/initial/commander/CommanderInitial";
import ExpertInitial from "../components/initial/expert/ExpertInitial";
import StuffInitial from "../components/initial/stuff/StuffInitial";


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
      component: AdminHome,
      children: [
        {
          path: '/home-admin/initial',
          component: AdminInitial,
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
      component: CommanderHome,
      children: [
        {
          path: '/home-commander/initial',
          component: CommanderInitial,
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
      component: ExpertHome,
      children: [
        {
          path: '/home-expert/initial',
          component: ExpertInitial,
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
      component: StuffHome,
      children: [
        {
          path: '/home-stuff/initial',
          component: StuffInitial,
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
