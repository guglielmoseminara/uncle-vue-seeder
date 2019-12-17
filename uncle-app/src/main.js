import Vue from 'vue'
import VueRouter from 'vue-router'
import { UncleVuePlugin } from 'uncle-vue';
import { UncleArgon } from 'uncle-argon';
import UncleSearchPage from './components/SearchPage.vue';
import UncleDetailPage from './components/DetailPage.vue';
import UncleInsertPage from './components/InsertPage.vue';
import UserService from './services/user_service';

import App from './App.vue'

Vue.use(VueRouter);
const router = new VueRouter();//
Vue.use(UncleVuePlugin, {'app':'uncle-app', router: router});
Vue.use(UncleArgon, {router:router});
const app = Vue.prototype.$uncle.getApp();
app.serviceManager.registerService('UserService', new UserService());

var routes = Vue.prototype.$uncle.getRoutes();
const includeComponents = (routes) => {
  return routes.map((route) => {
    route.component = require('@/views/'+route.props.view+'.vue').default
    if (route.children) {
      route.children = includeComponents(route.children);
    }
    if (route.action) {
      var service = app.serviceManager.getService(route.action.service);
      route.beforeEnter = service[route.action.method];
    }
    return route;
  });
}
routes = includeComponents(routes);
router.addRoutes(routes);

Vue.component('UncleSearchPage', UncleSearchPage);
Vue.component('UncleDetailPage', UncleDetailPage);
Vue.component('UncleInsertPage', UncleInsertPage);

Vue.config.productionTip = false

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
new Vue({
  router, 
  render: h => h(App),
}).$mount('#app')
