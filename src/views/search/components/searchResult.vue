<template>
  <div class="result">
    <van-list
      v-model="loading"
      :finished="finished"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell
        v-for="(item, index) in list"
        :key="index"
        :title="item.title"
      />
    </van-list>
  </div>
</template>

<script>
import { getSearchResult } from "@/api/search.js";

export default {
  props: {
    resultText: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      perPage: 20,
      error: false,
    };
  },
  methods: {
    async onLoad() {
      try {
        const {
          data: { data },
        } = await getSearchResult({
          page: this.page, // 页码
          per_page: this.perPage, // 每页大小
          q: this.resultText, // 查询关键词
        });
        console.log(data);
        this.list.push(...data.results);

        // 加载状态结束
        this.loading = false;
        this.page++;
        //测试加载失败的点击重新加载
        // if (Math.random() > 0.5) {
        //   return JSON.parse("a");
        // }
        if (data.results.length === 0) {
          this.finished = true;
        }
      } catch (error) {
        this.loading = false;

        this.error = true;
        this.$toast("数据获取失败");
      }

      // // 异步更新数据
      // // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      // setTimeout(() => {
      //   for (let i = 0; i < 10; i++) {
      //     this.list.push(this.list.length + 1);
      //   }

      //   // 加载状态结束
      //   this.loading = false;

      //   // 数据全部加载完成
      //   if (this.list.length >= 40) {
      //     this.finished = true;
      //   }
      // }, 1000);
    },
  },
};
</script>

<style>
</style>