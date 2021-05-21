import Vue from 'vue'
import Router from 'vue-router'
import Login from "../components/Login";
import Auth from "../components/Auth"

import AdminHome from "../components/common/admin/AdminHome";
import CommanderHome from "../components/common/commander/CommanderHome"
import ExpertHome from "../components/common/expert/ExpertHome"
import StaffHome from "../components/common/staff/StaffHome"

import AdminInitial from "../components/initial/admin/AdminInitial";
import CommanderInitial from "../components/initial/commander/CommanderInitial";
import ExpertInitial from "../components/initial/expert/ExpertInitial";
import StaffInitial from "../components/initial/staff/StaffInitial";

import CommanderAlert from "../components/alert/commander/CommanderAlert";
import ExpertAlert from "../components/alert/expert/ExpertAlert";
import StaffAlert from "../components/alert/staff/StaffAlert";

import Register from "../components/register/Register";
import Emergency from "../components/emergency/Emergency";
import Material from "../components/material/Material";
import MaterialLocation from "../components/material/MaterialLocation";
import Company from "../components/company/Company";
import City from "../components/city/City";
import Traffic from "../components/city/Traffic"
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
      path: '/auth',
      component: Auth,
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
          component: CommanderAlert,
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
          component: ExpertAlert,
          meta: {
            title: "环保应急管理系统"
          }
        }
      ]
    },
    {
      path: '/home-staff',
      component: StaffHome,
      children: [
        {
          path: '/home-staff/initial',
          component: StaffInitial,
          meta: {
            title: "环保应急管理系统"
          }
        },
        {
          path: '/home-staff/emergency',
          component: Emergency,
          meta: {
            title: "环保应急管理系统"
          }
        },
        {
          path: '/home-staff/material',
          component: Material,
          meta: {
            title: "环保应急管理系统"
          }
        },
        {
          path: '/home-staff/material-location',
          component: MaterialLocation,
          meta: {
            title: "环保应急管理系统"
          }
        },
        {
          path: '/home-staff/process',
          component: Process,
          meta: {
            title: "环保应急管理系统"
          }
        },
        {
          path: '/home-staff/company',
          component: Company,
          meta: {
            title: "环保应急管理系统"
          }
        },
        {
          path: '/home-staff/city',
          component: City,
          meta: {
            title: "环保应急管理系统"
          }
        },
        {
          path: '/home-staff/traffic',
          component: Traffic,
          meta: {
            title: "环保应急管理系统"
          }
        },
        {
          path: '/home-staff/alert',
          component: StaffAlert,
          meta: {
            title: "环保应急管理系统"
          }
        }
      ]
    }
  ]
})
