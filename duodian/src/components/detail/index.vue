<template>
  <div class="content">
    <div class="ed-head">
      <span>商品列表</span>
    </div>
    <div class="basic">
      <span>基本信息</span>
    </div>
    <div class="de-context">
      <el-form ref="form" :model="data" label-width="80px">
        <el-form-item label="商品名称">
          <el-input class="input" v-model="data.name" placeholder="请输入仓库名称">1</el-input>
        </el-form-item>
        <el-form-item label="商品标签" class="shopTag">
          <el-tag
            :key="index"
            v-for="(tag,index) in data.specs"
            closable
            :disable-transitions="false"
            @close="handleClose(tag.value)"
            v-if="tag.value"
          >{{tag.value}}</el-tag>
          <el-tag
            :key="index"
            v-for="(tag,index) in data.specs"
            closable
            :disable-transitions="false"
            @close="handleClose(tag.value)"
            v-else
          >{{tag}}</el-tag>
          <el-input
            class="input-new-tag"
            v-if="inputVisible"
            v-model="inputValue"
            ref="saveTagInput"
            size="small"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm"
          ></el-input>
          <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
        </el-form-item>
        <div class="el-box">
          <label class title="商品分类">商品分类</label>
          <el-select v-model="data.type_id" placeholder="请选择">
            <el-option
              v-for="(item,index) in getType"
              :key="index"
              :label="item.title"
              :value="item.id"
            ></el-option>
          </el-select>
        </div>
        <div class="el-box">
          <label class title="商品分类">商品子分类</label>
          <el-select v-model="data.category_id" placeholder="请选择">
            <el-option
              v-for="(item,index) in getCategory"
              :key="index"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </div>
        <el-form-item label="库存">
          <el-input-number
            class="kc"
            v-model="data.stock"
            controls-position="right"
            @change="handleChange"
            :min="1"
            width="60px"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="销量">
          <el-input-number
            class="xl"
            v-model="data.volume"
            controls-position="right"
            @change="handleChange"
            :min="0"
            width="60px"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="价格">
          <el-input-number
            class="price"
            v-model="data.price"
            controls-position="right"
            @change="handleChange"
            :min="1"
            width="60px"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="原价格">
          <el-input-number
            class="price"
            v-model="data.old_price"
            controls-position="right"
            @change="handleChange"
            :min="1"
            width="60px"
          ></el-input-number>
        </el-form-item>
      </el-form>
    </div>
    <div class="basic">
      <span>图片信息</span>
    </div>
    <div class="shop-con">
      <label>商品展示</label>
      <div class="img-box">
        <div class="img">
          <img :src="data.cover" alt>
        </div>
        <my-upload/>
        <!-- <el-upload
          class="avatar-uploader"
          action="/api/upimage"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload> -->
      </div>
      <label>商品背景</label>
      <div class="shop-bj">
        <div class="img" v-for="(item,index) in data.pictures" :key="index">
          <img :src="item" alt>
        </div>
        <!-- <el-upload
          class="avatar-uploader"
          action="/api/upimage"
          :show-file-list="false"
          :on-success="handleAvatarSucces"
          :before-upload="beforeAvatarUploa"
        >
          <img v-if="bgimageUrl" :src="bgimageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>-->
        <my-upload/>
      </div>
    </div>
    <div class="basic">
      <span>详情描述</span>
    </div>
    <mavon-editor v-model="data.detail"/>
    <div class="btn">
      <el-button type="primary">提交</el-button>
      <el-button>保存</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from "vue-property-decorator";
import api from "@/api/shoplist";
@Component({
  components: {}
})
export default class Detail extends Vue {
  @Prop() private msg!: string;
  data = {
    name: "",
    price: "",
    stock: 1,
    volume: 1,
    cover: "",
    detail: "",
    type_id: "",
    category_id: "",
    specs: [],
    old_price: 0,
    pictures: ""
  };
  inputVisible = false;
  inputValue = "";
  listData = "";
  dat = {
    content: ""
  };
  getType = [];
  getCategory = [];
  imageUrl = "";
  bgimageUrl = "";
  shopData = "";
  handleChange(value: string) {
    console.log(value);
  }
  handleAvatarSuccess(res, file) {
    console.log(res, file);
    this.imageUrl = URL.createObjectURL(file.raw);
  }
  beforeAvatarUpload(file) {
    const isJPG = file.type === "image/jpeg";
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      this.$message.error("上传头像图片大小不能超过 2MB!");
    }
    return isLt2M;
  }
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
  created() {
    api.allshop().then(res => {
      this.listData = res.data;
      let { id } = this.$route.params;
      this.shopData = this.listData.find(item => item.id == id);
      this.data.name = this.shopData.name;
      this.data.price = this.shopData.price;
      this.data.stock = this.shopData.stock;
      this.data.cover = this.shopData.cover;
      this.data.detail = this.shopData.detail;
      this.data.volume = this.shopData.volume;
      this.data.type_id = this.shopData.type_id;
      this.data.category_id = this.shopData.category_id;
      this.data.specs = JSON.parse(this.shopData.specs);
      this.data.old_price = this.shopData.old_price;
      this.data.pictures = JSON.parse(this.shopData.pictures);
    });
    api.getType().then(res => {
      this.getType = res.data;
    });
    api.getCategory().then(res => {
      this.getCategory = res.data;
    });
  }
  mounted() {}
  handleClose(tag: string) {
    this.data.specs.splice(this.data.specs.indexOf(tag), 1);
  }
  showInput() {
    this.inputVisible = true;
    this.$nextTick(_ => {
      this.$refs.saveTagInput.$refs.input.focus();
    });
  }
  handleInputConfirm() {
    let inputValue = this.inputValue;
    if (inputValue) {
      this.data.specs.push(inputValue);
    }
    this.inputVisible = false;
    this.inputValue = "";
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
  .ed-head {
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
  }
  .basic {
    width: 94%;
    padding: 0 3%;
    height: 90px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #e9e9e9;
    line-height: 120px;
    font-weight: 600;
    font-size: 17px;
  }
  .de-context {
    width: 100%;
    padding-bottom: 20px;
    .el-form {
      width: 97%;
      padding: 0 1.5%;
      .el-form-item {
        width: 100%;
        margin-bottom: 0;
        margin-top: 30px;
        .el-select {
          margin-left: 10px;
          height: 35px;
        }
      }
      .el-box {
        width: 98%;
        padding: 0 1%;
        font-size: 14px;
        color: #606266;
        display: flex;
        margin-top: 30px;

        label {
          line-height: 40px;
          width: 70px;
          display: flex;
          margin-right: 5px;
        }
        input {
          height: 35px;
        }
      }
      .input {
        width: 550px;
        height: 35px;
        margin-left: 10px;
      }
      .shopTag {
        width: 100%;
        .el-tag {
          margin-left: 10px;
        }
        .button-new-tag {
          margin-left: 10px;
          height: 32px;
          line-height: 30px;
          padding-top: 0;
          padding-bottom: 0;
        }
        .input-new-tag {
          width: 74px;
          height: 32px;
          margin-left: 10px;
        }
      }
      .kc {
        width: 120px;
        padding-left: 10px;
        input {
          width: 100%;
        }
      }
    }
  }
  .shop-con {
    width: 94%;
    padding: 0 3%;
    label {
      width: 100%;
      height: 70px;
      line-height: 90px;
      display: flex;
    }
    .img-box {
      display: flex;
      margin-top: 10px;
      .img {
        width: 120px;
        height: 100px;
        padding: 15px;
        border: 1px dashed #ebebeb;
        border-radius: 5px;
        margin-right: 10px;
        img {
          width: 100%;
          height: 100%;
        }
      }

      .el-upload {
        width: 120px;
        height: 100px;
        padding: 15px;

        .el-icon-plus {
          width: 100px;
          height: 100px;
          line-height: 100px;
        }
        img {
          width: 120px;
          height: 100px;
        }
      }
      .avatar-uploader .el-upload {
        border: 1px dashed #ebebeb;
        border-radius: 5px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
      }
      .avatar-uploader .el-upload:hover {
        border-color: #409eff;
      }
      .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        text-align: center;
      }
      .avatar {
        width: 178px;
        height: 178px;
        display: block;
      }
    }
    .shop-bj {
      display: flex;
      align-items: center;
      display: flex;
      flex-wrap: wrap;
      .img {
        width: 371px;
        height: 150px;
        padding: 15px;
        border: 1px dashed #ebebeb;
        border-radius: 5px;
        margin-right: 10px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .el-upload {
        width: 371px;
        height: 150px;
        padding: 15px;
        background: #efefef;
        margin-top: 2px;
        .el-icon-plus {
          width: 100px;
          height: 100px;
          line-height: 150px;
        }
        img {
          width: 100%;
          height: 100%;
        }
      }
      .avatar-uploader .el-upload {
        border: 1px dashed #ebebeb;
        border-radius: 5px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
      }
      .avatar-uploader .el-upload:hover {
        border-color: #409eff;
      }
      .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        text-align: center;
      }
      .avatar {
        width: 178px;
        height: 178px;
        display: block;
      }
    }
  }
  .markdown-body {
    width: 94%;
    padding: 0 3%;
    margin-top: 30px;
  }
  .btn {
    width: 100%;
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    button {
      width: 80px;
      span {
        width: 100%;
        height: 100%;
        font-size: 13px;
      }
    }
  }
}
</style>
