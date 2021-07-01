<template>
  <van-icon
    @click="click"
    class="shoucang"
    style="color: yellow"
    v-if="articledata.is_collected"
    name="star"
  />
  <van-icon @click="click" v-else name="star-o" />
</template>

<script>
import { addCollect, deleteCollect } from "@/api/artcle.js";
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
        if (!this.articledata.is_collected) {
          //收藏
          await addCollect(this.articledata.aut_id);
        } else {
          //取消收藏
          await deleteCollect(this.articledata.aut_id);
        }
        this.articledata.is_collected = !this.articledata.is_collected;
      } catch (error) {
          console.log(this.articledata.is_collected);
        let message = ""
        if (this.articledata.is_collected) {
          message = "取消收藏失败";
        } else {
          message = "收藏失败";
        }
        this.$toast(message);
      }
    },
  },
};
</script>

<style lang="less">
.shoucang {
  color: rgb(238, 238, 51);
}
</style>