import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// css入口文件
import "@/assets/css/main.css"

// 编辑器 mavon-editor
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
Vue.use(mavonEditor);


// element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// 全局过滤器注册
import {filters} from "@/utils/filters";
for (let filterName in filters) {
    Vue.filter(filterName, filters[filterName])
}



Vue.config.productionTip = false



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
