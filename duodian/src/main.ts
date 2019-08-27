import Vue from 'vue';
import App from './App.vue';
import router from './router/router';
import plugins from './plugins/index'
import store from './store/store';
import './static/style/common.scss';
import './static/style/_mixin.scss';
import './config/element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './static/utf8-php/ueditor.config';
import './static/utf8-php/ueditor.all.min';
import './static/utf8-php/ueditor.parse';
import'./static/utf8-php/lang/zh-cn/zh-cn';
import 'mavon-editor/dist/css/index.css';
import mavonEditor from 'mavon-editor';
Vue.config.productionTip = false;
Vue.use(plugins)
Vue.use(mavonEditor)
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
