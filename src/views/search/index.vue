<template>
  <div class="search">
    <form action="/">
      <van-search
        v-model="searchText"
        show-action
        shape="round"
        background="#3598fa"
        placeholder="请输入搜索关键词"
        @search="result"
        @cancel="onCancel"
        @input="input"
        @focus="focus"
      >
      </van-search>
    </form>
    <!-- 搜索建议 -->
    <search-proposal v-if="searchText && !showresult"
    :searchText='searchText'
    ></search-proposal>
    <!-- 搜索建议 -->
    <!-- 搜索结果 -->
    <search-result v-else-if="showresult"></search-result>
    <!-- 搜索结果 -->
    <!-- 历史记录 -->
    <search-history v-else></search-history>
    <!-- 历史记录 -->
  </div>
</template>

<script>
import searchHistory from "./components/searchHistory.vue";
import searchResult from "./components/searchResult.vue";
import searchProposal from "./components/searchProposal.vue";
export default {
  components: {
    searchProposal,
    searchResult,
    searchHistory,
  },
  data() {
    return {
      searchText: "",
      showresult: false,
    };
  },
  methods: {
    //取消按钮
    onCancel() {
      this.$router.back();
    },
    //确定搜索 触发
    result() {
      if (this.searchText.trim() !== "") {
        this.showresult = true;
      }
    },
    //输入框内容变化触发
    input() {
      if (this.searchText.trim() === "") {
        this.showresult = false;
      }
    },

    //输入框获取焦点触发

    focus() {
      this.showresult = false;
    },
  },
};
</script>

<style lang="less">
.search {
  .van-search__action {
    color: #fff;
  }
}
</style>