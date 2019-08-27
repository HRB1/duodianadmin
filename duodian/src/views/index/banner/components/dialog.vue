<template>
  <div class="dialog" @click.self="closeDia">
    <div class="dialog-con">
      <h2>添加banner</h2>
      <span class="close" @click="closeDia">&times;</span>
      <div class="uploads">
        <el-upload
          class="avatar-uploader"
          action="/api/upimage"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="dialogImageUrl" :src="dialogImageUrl" class="logImg">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>
      <div class="time-box">
        <div class="title">
          <span>活动标题:</span>
          <el-input class="titleVal" size="mini" placeholder="请输入内容" v-model="vals" clearable></el-input>
        </div>
        <div class="startTime">
          <span>起止时间:</span>
          <el-date-picker
            class="timesVal"
            v-model="times"
            type="datetimerange"
            size="mini"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </div>
        <div class="title">
          <span>活动链接:</span>
          <el-input class="titleVal" size="mini" placeholder="请输入链接地址" v-model="valsurl" clearable></el-input>
        </div>
      </div>
      <el-button class="addBtn" @click="addBanner">添加</el-button>
    </div>
  </div>
</template>
<script>
import api from "@/api/banner.ts";
import { Component, Vue, Emit } from "vue-property-decorator";
@Component({})
export default class Dialog extends Vue {
  dialogVisible = false; //隐藏弹框
  dialogImageUrl = ""; //图片地址
  vals = ""; //标题
  times = ""; //起止时间
  valsurl = ""; //活动链接

  //关闭弹框(向父传参)
  @Emit("closeFn")
  closeDia() {
    this.dialogImageUrl = ""; //图片地址
    this.vals = ""; //标题
    this.times = ""; //起止时间
    this.valsurl = ""; //活动链接
    return false;
  }
  //添加banner图(向父传参)
  @Emit("addBannerFn")
  addBanner() {
    if (this.dialogImageUrl && this.vals && this.times && this.valsurl) {
      return {
        image: this.dialogImageUrl,
        start_time: this.times[0],
        end_time: this.times[1],
        active_name: this.vals,
        url: this.valsurl
      };
    } else {
      this.$message("内容不能为空");
    }
  }
  //上传成功
  handleAvatarSuccess(res, file) {
    this.dialogImageUrl = "http://127.0.0.1:7002" + file.response.data.filename;
  }
  //上传之前
  beforeAvatarUpload(file) {
    let typeArr=["jpeg","png","gif","svg","jpg"]
    const isJPG = typeArr.includes(file.type.replace(/image\//,""));
    if (!isJPG) {
      this.$message.error("上传头像图片只能是 "+[...typeArr]+" 格式!");
    }
    return isJPG;
  }
}
</script>
<style scoped lang="scss">
@import "@/static/style/bannerDialog.scss";
</style>