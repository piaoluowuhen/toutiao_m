<template>
  <div class="proposal">
    <van-cell :key="index" v-for="(item, index) in list"
     icon="search"
     @click="$emit('cellClick',item)"
     >
      <div slot="title" v-html="textcolor(item)"> </div>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestions } from "@/api/search.js";
import { setItem, getItem } from "@/utils/storage.js";
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
      k: true, //定时器标志位
    };
  },
  methods: {
    //搜索发送请求函数
    getSearchSuggestions(value) {
      // if (window.localStorage.getItem(this.searchText)) {
        //如果是true说明本地有
        this.list = getItem(this.searchText);
      // } else {
        //本地没有发送请求
        if (this.k) {
          //标志位为true进来就false之后的请求就进不来  直到定时器时间到才重置为true才能发送下一次请求
          this.k = false;
          setTimeout(async () => {
            try {
              const {
                data: {
                  data: { options },
                },
              } = await getSearchSuggestions(value);
              console.log(options);
              this.list = options;
              //每次返回的数据键值对存储本地
              setItem(this.searchText, { ...options });
            } catch (error) {
              this.$toast("数据获取失败");
            }
            this.k = true;
          }, 1000);
        // }
      }
    },
    //搜索词高亮
    textcolor(text) {
      const reg = "/" + this.searchText + "/g";
      const str = `<span style='color: #3598fa'>${this.searchText}</span>`
      //简单介绍一下eval() 函数可计算某个字符串，并执行其中的的 JavaScript 代码。接下来主要靠这个函数。
      return text.replace(eval(reg), str);
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