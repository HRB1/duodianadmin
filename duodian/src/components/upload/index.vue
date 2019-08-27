<template>
  <el-upload
    class="avatar-uploader"
    action="/api/upimage"
    :show-file-list="false"
    :on-success="handleAvatarSucces"
    :before-upload="beforeAvatarUploa"
  >
    <img v-if="bgimageUrl" :src="bgimageUrl" class="avatar">
    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
  </el-upload>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from "vue-property-decorator";
import api from "@/api/shoplist";
@Component({
  components: {}
})
export default class Detail extends Vue {
  @Prop() private msg!: string;
  bgimageUrl = "";
  //   @Emit('customClick')
  handleAvatarSucces(res, file) {
    this.bgimageUrl = URL.createObjectURL(file.raw);
  }
  beforeAvatarUploa(file) {
    const isJPG = file.type === "image/jpeg";
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      this.$message.error("上传头像图片大小不能超过 2MB!");
    }
    return isLt2M;
  }
  created() {}
  mounted() {}
}
</script>
<style lang="scss">
</style>
