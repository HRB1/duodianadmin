<template>
  <div class="content">
    <div class="con-head">
      <span>商品列表</span>
      <el-button @click="add">+ 添加商品</el-button>
    </div>
    <div class="con-text">
      <div class="co-head">
        <el-form ref="form" label-width="80px">
          <el-form-item label="商品名称:">
            <el-input v-model="search_key" @change="keydata" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="状态:">
            <el-select v-model="shopStatus" placeholder="请选择">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-button @click="search">查询</el-button>
        </el-form>
      </div>
      <el-table
        style="width: 100%"
        :data="listData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
      >
        <el-table-column prop="cover" label="商品信息" width="350">
          <template slot-scope="scope">
            <img :src="scope.row.cover">
            <div class="box">
              <p style="margin-left: 10px" class="name">{{scope.row.name}}</p>
              <br>
              <p
                style="margin-left: 10px"
              >{{JSON.parse(scope.row.specs)[2] && JSON.parse(scope.row.specs)[2].value}}</p>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="price" label="价格" width="130">
          <template slot-scope="scope">
            <span>￥{{(scope.row.price).toFixed(2)}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="volume" label="销量" width="130">
          <template slot-scope="scope">
            <span>{{scope.row.volume}}件</span>
          </template>
        </el-table-column>
        <el-table-column prop="stock" label="库存" width="130"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <span v-if="JSON.parse(scope.row.status) === 0">下架</span>
          </template>
        </el-table-column>
        <el-table-column prop="update_time" label="更新时间">
           <template slot-scope="scope">
            <span v-if="scope.row.create_time">{{scope.row.create_time}}</span>
           
            <span v-else>暂无数据</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" v-if="JSON.parse(scope.row.status) === 0">上架</el-button>
            <el-button type="text" v-else>下架</el-button>
            <span class="shu">|</span>
            <el-button type="text" @click="edit(scope.row.id)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        background
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[1, 3, 5, 8]"
        :page-size="pageSize"
        layout="prev, pager, next"
        :total="totalNum"
      ></el-pagination>
    </div>
  </div>
</template>
<script lang="ts">
import api from "@/api/shoplist";
import { Component, Vue } from "vue-property-decorator";
@Component({
  components: {
  }
})
export default class extends Vue {
  search_key = "";
  shopStatus = "";
  listData = [];
  allList=[];
  currentPage = 1; //默认显示第一页
  pageSize = 5; //默认每页显示10条
  totalNum = 0;
  mounted() {
    api.allshop().then(res => {
      this.listData = res.data;
      this.allList = this.listData
      this.totalNum = this.listData.length
    });
  }
  search() {
    api.searchData({search_key:this.search_key}).then(res=>{
      this.listData = res.data;
    })
  }
  keydata(){
    console.log(this.search_key)
    if(this.search_key.trim()==""){
        this.listData=this.allList
      }
  }
  handleSizeChange(val: string) {
    console.log(`每页 ${val} 条`);
    this.pageSize = val; //动态改变
  }
  handleCurrentChange(val: string) {
    //                    console.log(`当前页: ${val}`);
    this.currentPage = val; //动态改变
  }
  edit(id:string){
    this.$router.push({name:'Detail',params:{id:id}})
  }
  add(){
    this.$router.push('/index/addShop')
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
  .con-text {
    width: 94%;
    flex: 1;
    padding: 0 3%;
    display: flex;
    flex-direction: column;
    .co-head {
      width: 100%;
      height: 100px;
      background: rgba(240, 242, 245, 1);
      margin-top: 12px;
      margin-bottom: 10px;
      .el-form {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        .el-form-item {
          margin-bottom: 0;
          margin-left: 20px;
          .el-form-item__label {
            width: 20px;
            // display: flex;
          }
        }
        .el-input__inner {
          width: 250px;
          height: 30px;
        }
        button {
          width: 60px;
          height: 30px;
          background: #1890ff;
          color: #fff;
          font-size: 10px;
          margin-left: 40px;
          span {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
          }
        }
      }
    }
    .el-table__header-wrapper {
      tr {
        th {
          color: #000;
          font-weight: 600;
        }
      }
    }
    .el-table__body-wrapper {
      width: 100%;
      .el-table__row {
        td {
          text-align: start;
          .cell {
            height: 100%;
            display: flex;
            // align-items: center;
            img {
              width: 70px;
              height: 65px;
            }
          }
          .box {
            width: 280px;
            height: 100%;
          }
          .shu {
            display: flex;
            font-size: 20px;
            align-items: center;
            color: #e9e9e9;
            margin: 0 8px;
            margin-bottom: 5px;
          }
        }
      }
    }
    .el-pagination{
      display: flex;
      justify-content: flex-end;
      margin-top: 60px;
    }
  }
}
</style>