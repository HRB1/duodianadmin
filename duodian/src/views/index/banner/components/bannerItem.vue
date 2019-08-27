<template>
  <dl>
    <dt>
      <img :src="items.image">
    </dt>
    <dd>
      <p class="title">{{items.active_name}}</p>
      <p class="des">一句描述</p>
      <p class="operation">
        <i v-for="(item,ind) in operList" :key="ind" :class="item.icon"></i>
      </p>
    </dd>
    <div class="mask" v-if="items.ends">活动已经结束</div>
  </dl>
</template>
<script lang="ts">
import {Component,Vue,Prop} from "vue-property-decorator";
@Component({})
export default class BannerItem extends Vue{
    //接收参数
    @Prop({type:Number})
    bannerId:number
    @Prop({type:Object})
    items:object

    //操作icon
    operList=[
        {
            "icon":"el-icon-download",
            id:0,
        },{
            "icon":"el-icon-edit",
            id:1
        },{
            "icon":"el-icon-share",
            id:2
        },{
            "icon":"el-icon-more",
            id:3
        }
    ];

}
</script>
<style scoped lang="scss">
    dl{
        width: 250px;
        height: 250px;
        float: left;
        margin:25px;
        margin-right: 0;
        border:1px solid #ccc;
        position: relative;
       
        dt{
            width: 100%;
            height: 120px;
            img{
                width:100%;
                height:100%;
            }
        }
        dd{
            width:100%;
            height: 130px;
            position: relative;
        
            .title{
                width: 100%;
                     box-sizing:border-box;
                padding-top:20px;
                padding-left:20px;
                font-weight: bold;

            }
            .des{
                width: 100%;
                     box-sizing:border-box;
                padding-top:10px;
                padding-left:20px;
                color: #ccc;
            }
            .operation{
                position: absolute;
                z-index:9;
                background: #eee;
                width: 100%;
                left:0;
                bottom:0;
                height: 40px;;
                i{
                    padding: 0 22px;
                    border-right: 1px solid #ccc;
                    margin-top: 14px;
                    color: #999;
                }
                i:nth-child(4){
                    border:0;
                }
            }
        }
        .mask{
            position: absolute;
            top:0;
            left:0;
            width:100%;
            height: 100%;
            background:rgba(0,0,0,0.5);
            z-index:10;
            text-align: center;
            color: rgba(255,255,255,0.8);
            box-sizing: border-box;
            padding-top: 40%;
        }
    }
</style>