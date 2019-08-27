<template>
  <div class="content">
    <div class="con-head">
      <span>首页banner</span>
      <el-button @click="openDialog">+ 添加banner</el-button>
    </div>
    <div class="banner-item">
      <!-- banner每一项 -->
      <bannerItem
        v-for="(item,ind) in allbanner.slice((this.page-1)*limi,this.page*limi)"
        :key="ind"
        :bannerId="ind"
        :items="item"
      ></bannerItem>
      <!-- 弹框 -->
      <Dialogbox v-if="open" @closeFn="closeDia" @addBannerFn="addBannerFn"/>
      <div style="clear:both;"></div>
      <el-pagination
        class="pages"
        ref="paginations"
        background
        layout="prev, pager, next"
        :page-size="limi"
        @current-change="changepage()"
        :total="allbanner.length"
      ></el-pagination>
    </div>
  </div>
</template>
<script lang="ts">
import api from "../../../api/banner.ts";
import Dialogbox from "./components/dialog.vue";
import { Component, Vue, Emit } from "vue-property-decorator";
import bannerItem from "./components/bannerItem.vue";
@Component({
  components: {
    bannerItem,
    Dialogbox
  }
})
export default class Banner extends Vue {
  allbanner = []; //所有banner
  flag = []; //活动结束的商品
  page = 1; //页数
  limi = 8; //条数
  open = false; //弹框开关
  async created() {
    await this.getall();
  }
  async getall() {
    let { data: alllist } = await api.getAllBanner();
    //验证活动是否到期
    let curTime = new Date().getTime();
    this.allbanner = alllist.map((item, ind) => {
      //设置一个是否过期时间
      let ends = false;
      let end = new Date(item.end_time).getTime();
      if (curTime > end) {
        ends = true;
      }
      return {
        ...item,
        ends: ends
      };
    });
  }
  //关闭弹框
  closeDia(open) {
    this.open = open;
  }
  //打开弹框
  openDialog() {
    this.open = true;
    this.closeDia(true);
  }
  //点击页码
  changepage() {
    //设置当前页数
    this.page = this.$refs.paginations.internalCurrentPage;
  }
  //点击添加按钮
  async addBannerFn(obj) {
    api.addBanner(obj).then(res => {
      if (res.code) {
        this.$message({
          message: "添加成功",
          type: "success"
        });
        this.closeDia(false);
        this.getall();
      }
    });
  }
}
</script>
<style lang="scss">
.content {
  width: 100%;
  flex: 1;
  padding: 0;
  display: flex;
  flex-direction: column;
  .con-head {
    width: 94%;
    height: 65px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #e9e9e9;
    padding: 0 3%;
    span {
      display: flex;
      font-weight: bold;
      font-size: 19px;
    }
    button {
      height: 35px;
      background: #1890ff;
      color: #fff;
      outline-style: none;
      border: 0;
      span {
        font-weight: normal;
        font-size: 14px;
      }
    }
  }
  .banner-item {
    width: 100%;
  }
  .pages {
    margin-left: 17px;
  }
}
</style>