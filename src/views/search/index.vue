<template>
  <div class="search">
    <!-- 在 van-search 外层增加 form 标签，且 action 不为空，
    即可在 iOS 输入法中显示搜索按钮 -->
    <form class="searchform" action="/">
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
    <search-proposal
      class="pading"
      v-if="searchText && !showresult"
      :searchText="searchText"
      @cellClick="result"
    ></search-proposal>
    <!-- 搜索建议 -->
    <!-- 搜索结果 -->
    <search-result
      class="pading"
      v-else-if="showresult"
      :resultText="searchText"
    ></search-result>
    <!-- 搜索结果 -->
    <!-- 历史记录 -->
    <search-history
      v-else
      class="pading"
      :historyList="historyList"
      @toresult='result'
      @delHistory='historyList=[]'
    ></search-history>
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
      resultText: "",
      historyList: [],
    };
  },
  methods: {
    //取消按钮
    onCancel() {
      this.$router.back();
    },
    //确定搜索 触发 监听子组件点击cell单元格并传值
    async result(text) {
      this.searchText = text;

      // 历史记录数据处理 不要重复数据 最近的排在最前面
      if (this.historyList.indexOf(text) !== -1) {
        //找到重复数据了
        this.historyList.splice(this.historyList.indexOf(text), 1);
        this.historyList.unshift(text);
      } else {
        this.historyList.unshift(text);
      }

      // if (this.searchText.trim() !== "") {
        this.showresult = true;
      // }
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
  .searchform {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
  .pading {
    padding-top: 110px;
  }
}
</style>