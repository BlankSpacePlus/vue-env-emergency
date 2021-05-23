import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import VueResource from 'vue-resource'

Vue.use(ElementUI);
Vue.config.productionTip = false;
router.beforeEach((to, from, next) => {
  // 路由发生变化修改页面title
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

Vue.use(VueResource)

import VmRate from 'vue-multiple-rate'
import 'vue-multiple-rate/lib/rate.css'
Vue.component(VmRate.name, VmRate)

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
