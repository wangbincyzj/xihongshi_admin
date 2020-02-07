import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      userType: 0,  /* null未登录,1超级管理员(增删查改) 2普通管理员 */
      loginStatus: false,  /*登录状态*/
      token: null, /*token提供给headers使用*/
      username: null, /*登录成功注入的用户名*/
      avatar: null, /*头像*/
      createTime: null,
      uploadUrl: "http://192.168.0.100:8000/upload/",


      homeInfo: null /*home页的数据,由app.vue加载时候获取*/
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
