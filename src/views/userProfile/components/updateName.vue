<template>
  <van-popup v-model="showname" position="left" class="dianame">
    <van-nav-bar
      class="name"
      title="昵称"
      left-text="取消"
      right-text="完成"
      @click-left="left"
      @click-right="okname"
    />
    <van-field
      v-model="text"
      rows="2"
      autosize
      type="textarea"
      maxlength="7"
      placeholder="请输入留言"
      show-word-limit
    />
  </van-popup>
</template>

<script>
import { updateUserProfile } from "@/api/user.js";
export default {
  props: {
    showname: {
      type: Boolean,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      text: this.name,
    };
  },
  methods: {
   async okname() {
        let a = true
      this.$toast.loading({
        message: "更新中...",
        forbidClick: a,
      });
      try {
      await updateUserProfile({name:this.text});
        a=false,
        this.$toast('更新成功')
        this.$emit("update:name", this.text);


      } catch (error) {
        a=false,

        this.$toast('更新失败')

      }
        this.$emit("update:showname", false);

    },
    left() {
      this.$emit("update:showname", false);
      this.text = this.name;
    },
  },
};
</script>

<style lang="less">
.dianame {
  width: 100%;
  height: 100%;
  .name {
    background-color: #fff !important;
    .van-nav-bar__title {
      color: black !important;
    }
  }
}
</style>