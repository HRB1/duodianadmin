<template>
  <el-container>
    <el-header class="header">
      <p class="log">
        <img src="../../static/img/log.png" alt>
        <span>小鹅通</span>
      </p>
      <div class="user">
        <span></span>
        <span></span>
        <el-dropdown>
          <dl>
            <dt>
              <img src alt>
            </dt>
            <dd>
              <span v-if="username">{{username}}</span>
              <span v-else>用户名</span>
            </dd>
          </dl>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item>我的订单</el-dropdown-item>
            <el-dropdown-item divided>设置</el-dropdown-item>
            <el-dropdown-item @click.native="exit">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu class="el-menu-vertical-demo" background-color="#eeeeee" :router="true">
          <div v-for="(i,ind) in menuList" :key="ind">
            <el-menu-item :index="i+''" v-if="i.meta" :route="i.path">
              <i :class="i.meta.groupIcon"></i>
              <span slot="title">{{i.meta.groupName}}</span>
            </el-menu-item>
            <el-submenu v-else-if="i.show" :index="ind+''">
              <template slot="title">
                <i :class="i.groupIcon"></i>
                <span>{{i.groupName}}</span>
              </template>
              <el-menu-item
                v-for="(item,index) in i.child"
                :key="index"
                :index="ind+'-'+index"
                :route="{name:item.name}"
                v-if="item.meta.show"
              >
                <span @click="click(item.name)" slot="title">{{item.meta.groupName}}</span>
              </el-menu-item>
            </el-submenu>
          </div>
        </el-menu>
      </el-aside>
      <el-main>
        <div class="pagePath">{{path}}</div>
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import {getmenuList,getPath} from "../../config/index";
import { Component, Vue } from "vue-property-decorator";
@Component({})
export default class Home extends Vue {
  username = JSON.parse(window.sessionStorage.getItem("data")).username;
  menuList = getmenuList();
  get path() {
    return getPath(this.$route.name,this.menuList);
  }
  click(name: String) {
    this.$router.push({name});
  }
  exit() {
    window.sessionStorage.clear();
    this.$router.push("/login");
  }
}
</script>
<style lang="scss">
.is-vertical {
  height: 100%;
}
.el-container {
  overflow: auto;
  .el-main {
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px 0 ;
    .pagePath {
      height: 40px;
      line-height: 60px;
      color: #9c9c9c;
      font-size: 14px;
      padding: 0 3%;
    }
}
}
.el-aside {
  background: #eee;
}
.header {
  width: 100%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.19);
  z-index: 1501;
  padding: 0 4%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .log {
    height: 100%;
    display: flex;
    align-items: center;
    img {
      width: 33px;
      height: 26px;
    }
    span {
      color: #1783ff;
      margin-left: 5px;
      font-weight: 600;
      font-size: 17px;
    }
  }
  .user {
    height: 100%;
    display: flex;
    align-items: center;
    dl {
      // width: 100px;
      height: 100%;
      display: flex;
      align-items: center;
      dt {
        width: 32px;
        height: 32px;
        background: #ccc;
        border-radius: 50%;
      }
      dd {
        margin-left: 5px;
        height: 20px;
        font-size: 14px;
      }
    }
    p {
      display: flex;
      align-items: center;
      img {
        width: 30px;
        height: 30px;
        background: #666;
        border-radius: 50%;
        margin-right: 5px;
      }
      span {
        font-size: 10px;
      }
    }
  }
}
</style>