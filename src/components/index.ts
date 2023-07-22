import { App } from 'vue'
import Breadcrumb from './breadcrumb/index.vue'
import Modal from './modal/index.vue'
import Drawer from './drawer/index.vue';

export default {
  install(Vue: App) {
    Vue.component('Breadcrumb', Breadcrumb)
    Vue.component('Modal', Modal)
    Vue.component('Drawer', Drawer)
  },
}
