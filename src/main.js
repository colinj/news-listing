import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import LazyLoadImageDirective from "@/directives/lazy-load-image"

Vue.config.productionTip = false

Vue.directive("lazyload", LazyLoadImageDirective)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app")
