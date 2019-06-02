import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//firebase 
import {
  firestorePlugin
} from 'vuefire'
Vue.use(firestorePlugin)
//vuetify
import '@mdi/font/css/materialdesignicons.css'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
 
import colors from 'vuetify/lib/util/colors'

const vuetify = new Vuetify({
   icons: {
     iconfont: 'mdi' // default
   },
  theme: {
    themes: {
      light: {
        primary: colors.purple.darken2,
        secondary: colors.grey.darken4,
        accent: colors.shades.black,
        error: colors.red.accent3
      },
      dark: {
        primary: colors.blue.lighten3
      }
    }
  }
})
 
Vue.use(Vuetify)

 
Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify: vuetify,
  render: h => h(App)
}).$mount('#app')
