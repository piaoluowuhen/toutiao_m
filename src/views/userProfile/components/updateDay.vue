<template>
  <van-popup
    @close="$emit('update:showday', false)"
    v-model="showday"
    position="bottom"
    class="day"
  >
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="日期"
      :min-date="minDate"
      :max-date="maxDate"
      :columns-order="['year', 'month', 'day']"
      :formatter="formatter"
      @change="change"
      @confirm="onConfirm"
      @cancel="onCancel"
    />
  </van-popup>
</template>

<script>
import { updateUserProfile } from "@/api/user.js";
import dayjs from "dayjs";
export default {
  props: {
    day: {
      type: String,
      required: true,
    },
    showday: {
      type: Boolean,
      required: true,
    },
  },
  created() {},
  data() {
    return {
      minDate: new Date(1970, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(this.day),
    };
  },
  methods: {
    //格式化函数
    formatter(type, val) {
      if (type === "year") {
        return val + "年";
      }
      if (type === "month") {
        return val + "月";
      }
      if (type === "day") {
        return val + "日";
      }
      return val;
    },
    change(a) {
      console.log(a);
    },

    //确认
    async onConfirm() {
      let a = true;
      this.$toast.loading({
        message: "更新中...",
        forbidClick: a,
      });
      try {
        const currentDate = dayjs(this.currentDate).format("YYYY-MM-DD");
        await updateUserProfile({ birthday: currentDate });
        a = false;
        this.$toast("更新成功");
        this.$emit("update:day", currentDate);
      } catch (error) {
        a = false;
        this.$toast("更新失败");
      }
      this.$emit("update:showday", false);
    },

    //取消
    onCancel() {
      this.currentDate = new Date(this.day);
      this.$emit("update:showday", false);
    },
  },
};
</script>

<style lang="less">
.day {
  height: 40%;
  width: 100%;
}
</style>