<template>
  <van-popup
    @close="$emit('update:showgender', false)"
    v-model="showgender"
    position="bottom"
    class="gender"
  >
    <van-picker
      title="性别"
      show-toolbar
      :default-index="index"
      :columns="columns"
      @confirm="onConfirm"
      @cancel="onCancel"
      @change="onChange"
    />
  </van-popup>
</template>

<script>
import { updateUserProfile } from "@/api/user.js";

export default {
  props: {
    gender: {
      type: Number,
      required: true,
    },
    showgender: {
      type: Boolean,
      required: true,
    },
  },
  created() {},
  data() {
    return {
      columns: ["男", "女"],
      index: this.gender,
    };
  },
  methods: {
    //确认
    async onConfirm(value, index) {
        console.log(this.index);
      let a = true;
      this.$toast.loading({
        message: "更新中...",
        forbidClick: a,
      });
      try {
        await updateUserProfile({ gender: this.index });
        this.$emit("update:gender", this.index);
        a = false
         this.$toast("更新成功");
        this.$emit("update:gender",this.index);

      } catch (error) {
        a = false 
        this.$toast("更新失败");
      }
      this.$emit("update:showgender", false);
    },
    onChange(picker, value, index) {
        this.index=index
    },
    //取消
    onCancel() {
        this.index=this.gender
      this.$emit("update:showgender", false);
    },
  },
};
</script>

<style lang="less">
.gender {
  height: 40%;
  width: 100%;
}
</style>