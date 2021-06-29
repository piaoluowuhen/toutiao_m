<template>
  <div class="proposal">
    <van-cell
      :title="item"
      :key="index"
      v-for="(item, index) in list"
      icon="search"
    />
  </div>
</template>

<script>
import { getSearchSuggestions } from "@/api/search.js";
export default {
  props: {
    searchText: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      list: [],
    };
  },
  methods: {
    async getSearchSuggestions(value) {
      try {
        const {
          data: {
            data: { options },
          },
        } = await getSearchSuggestions(value);
        console.log(options);
        this.list = options;
      } catch (error) {
        this.$toast("数据获取失败");
      }
    },
  },
  watch: {
    //输入值变化就发送请求数据 watch监听数据的变化 值变化触发handler函数
    searchText: {
      handler(value, oldvalue) {
        this.getSearchSuggestions(value);
      },
      // 该回调将会在侦听开始之后被立即调用
      immediate: true,
    },
  },
};
</script>

<style lang='less'>
</style>