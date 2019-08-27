import Vue from 'vue';
import Router from 'vue-router';
import {parents} from "../config/index"

Vue.use(Router);

let getMeta = (groupName: String, groupIcon: String, parentsInd: Number, show: Boolean = true) => {
  if (parentsInd != undefined) {
    return {
      groupName,
      show,
      parent: parents[parentsInd]
    }
  }
  return {
    groupName,
    show,
    groupIcon
  }
}

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/login'
    }, {
      path: '/index',
      name: 'Index',
      component: () => import('../views/index/index.vue'),
      children: [
        {
          path: '/index',
          name: 'Home',
          meta: getMeta("系统首页", "el-icon-s-home"),
          component: () => import('../views/index/Index/index.vue')
        }, {
          path: 'shoplist',
          name: 'ShopList',
          meta: getMeta("商品列表", "", 0),
          component: () => import('../views/index/shopList/index.vue')
        }, {
          path: 'classfiy',
          name: "Classfiy",
          meta: getMeta("分类管理", "", 0),
          component: () => import('../views/index/classfiy/index.vue')
        }, {
          path: 'comments',
          name: "Comments",
          meta: getMeta("评论管理", "", 0),
          component: () => import('../views/index/comments/index.vue')
        }, {
          path: 'banner',
          name: 'Banner',
          meta: getMeta("首页Banner", "", 1),
          component: () => import('../views/index/banner/index.vue')
        }, {
          path: 'detail/:id',
          name: 'Detail',
          meta: getMeta("商品详情", "", 0,false),
          component: () => import('../components/detail/index.vue')
        }, {
          path: 'addShop',
          name: "AddShop",
          meta: getMeta("添加商品", "", 0,false),
          component: () => import('../views/index/shopList/addShop/index.vue')
        }
      ]
    }, {
      path: '/login',
      name: 'Login',
      component: () => import('../views/login/index.vue'),
    }
  ],
});
