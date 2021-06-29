<template>
  <div class="history">
    <van-cell-group>
      <van-cell class="top">
        <span slot="title">搜索历史</span>
        <template slot="default">
          <van-row v-if="icon"
            ><van-button round size="mini" @click="$emit('delHistory')">全部删除</van-button>
            <van-button round size="mini" @click="icon=!icon">完成</van-button></van-row
          >
          <van-icon v-else @click="icon=!icon" name="delete-o" />
        </template>
      </van-cell>
      <van-cell @click="toresult(item)"  :key="index" v-for="(item, index) in historyList" :title="item">
        <van-icon v-if="icon" @click="delicon(item,index)" slot="default" name="close" />
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { setItem, getItem, removeItem } from "@/utils/storage.js";

export default {
  props: {
          // Prop 数据
    //  Prop 是受父组件数据影响的
    //    如果是普通数据（数字、字符串、布尔值）绝对不能修改
    //    即便改了也不会传导给父组件
    //
    //    如果是引用类型数据（数组、对象）
    //        可以修改，例如 [].push(xxx)，对象.xxx = xxx
    //        不能重新赋值, xxx = []
    historyList: {
      typr: Array,
      required: true,
    },
  },
  created() {},
  data() {
    return {
        icon:false,
    };
  },
  methods:{

      //历史项删除事件
      delicon(item,index){
          this.historyList.splice(index,1)
      },
      toresult(item){
          if(!this.icon){
              this.$emit('toresult',item)
          }
      }


  }
};
</script>

<style lang="less">
.history {
  .top {
    .van-button {
      border: 0;
    }
    span {
      font-size: 26px;
      font-weight: 600;
    }
  }
}
</style>