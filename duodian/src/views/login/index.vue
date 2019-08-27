
<template>
  <div class="wrap">
    <div class="content">
      <el-form ref="loginFrom">
        <el-form-item prop="user_name">
          <el-input type="text" autocomplete="off" placeholder="请输入用户名" v-model="username"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input type="password" autocomplete="off" placeholder="请输入用户名密码" v-model="password"></el-input>
        </el-form-item>
      </el-form>
      <div class="chooes">
        <el-checkbox v-model="checked">记住密码</el-checkbox>
        <a href="#">忘记密码</a>
      </div>
      <el-button type="button" @click="login">登陆</el-button>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import api from "@/api/shoplist";
@Component({
  components: {}
})
export default class Login extends Vue {
  username = window.localStorage.getItem("dd_user_name") || "";
  password = window.localStorage.getItem("dd_user_pwd") || "";
  checked = !!window.localStorage.getItem("dd_user_pwd");
  login() {
    window.localStorage.setItem("dd_user_name", this.username);
    api
      .login({ username: this.username, password: this.password })
      .then(res => {
        let { code, data } = res;
        if (this.checked) {
          window.localStorage.setItem("dd_user_pwd", this.password);
        } else {
          window.localStorage.setItem("dd_user_pwd", "");
        }
        if (code) {
          window.sessionStorage.data = JSON.stringify(data);
          window.sessionStorage.token = data.token;
          this.$router.push("/index");
        }
      });
  }
}
</script>
<style lang="scss">
.lg-cotent {
  width: 100%;
  height: 100%;
}
.wrap {
  width: 100%;
  height: 100%;
  background: url(http://photos.tuchong.com/1067414/f/31672046.jpg);
  background-size: cover;
  position: relative;
  .content {
    width: 400px;
    height: 297px;
    position: absolute;
    border: 1px solid #ccc;
    border-radius: 3px;
    background: #fff;
    right: 15%;
    top: 25%;
    box-sizing: border-box;
    padding: 40px 20px;
    .el-input {
      height: 41px;
      margin-bottom: 2px;
    }
    .chooes {
      width: 100%;
      height: 21px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 17px;
      a {
        color: #0139fd;
        text-decoration: none;
        background-color: transparent;
        outline: none;
        cursor: pointer;
        font-size: 14px;
      }
    }
    button {
      width: 100%;
      height: 40px;
      background: #3662fe;
      color: #fff;
    }
  }
}
</style>
