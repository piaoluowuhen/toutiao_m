<template>
  <van-icon
    @click="click"
    class="shoucang"
    style="color: yellow"
    v-if="articledata.attitud===1"
    name="good-job"
  />
  <van-icon @click="click" v-else name="good-job-o" />



</template>

<script>
import { addLike, deleteLike } from "@/api/artcle.js";
export default {
  props: {
    articledata: {
      type: Object,
      required: true,
    },
  },
  methods: {
    async click() {
      try {
          
        if (this.articledata.attitude!==1) {
          //点赞
          await addLike(this.articledata.aut_id);
          this.articledata.attitude =1
        } else {
          //取消点赞
          await deleteLike(this.articledata.aut_id);
          this.articledata.attitude=-1
        }
      } catch (error) {
          console.log(this.articledata.is_collected);
        let message = ""
        if (this.articledata.attitude===1) {
          message = "取消点赞失败";
        } else {
          message = "点赞失败";
        }
        this.$toast(message);
      }
    },
  },
};
</script>

<style lang="less">
.shoucang {
  color: rgb(187, 25, 25);
}
</style>