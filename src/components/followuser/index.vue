<template>

          <van-button
          :loading='btnloading'
            style="width: 80px"
            @click="btnuser"
            icon="plus"
            round
            :type="articledata.is_followed ? 'info' : 'danger'"
            size="mini"
            >{{ articledata.is_followed ? "关注" : "取消关注" }}</van-button
          >
</template>

<script>
import { addFollow, deleteFollow } from "@/api/user.js";

export default {
  // 该组件传入对象里面包含标志位和id  {id:0,is:false }
    props:{
      articledata:{
        type: Object,
        required:true
       
      }

    },
    data(){
       return{ btnloading:false,
    }},
    methods:{
   //关注按钮
    async btnuser() {
      this.btnloading= true
      try {
        if (this.articledata.is_followed) {
          //添加关注
          await addFollow(this.articledata.aut_id);
        } else {
          //取消关注
          await deleteFollow(this.articledata.aut_id);
        }
        this.btnloading=false
        this.articledata.is_followed = !this.articledata.is_followed
      } catch (error) {
        this.btnloading=false

        let message = "操作失败，请重试";
        if (error.response && error.response.status === 400) {
          message = "你不能关注自己";
        }
        this.$toast(message);
      }
    },
    }
};
</script>

<style lang="less">
</style>