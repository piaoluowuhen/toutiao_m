<template>
  <div class="list">
    <!-- PullRefresh 下拉刷新 -->
    <van-pull-refresh
      v-model="isLoading"
      :success-duration="1000"
      :success-text="text"
      @refresh="onRefresh"
    >
      <!-- list列表 -->
      <van-list
        v-model="loading"
        :finished="finished"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        finished-text="没有更多了"
        @load="onLoad"
      >
      <!-- *************************大数字 模块转化对象 拼接字符串就直接转化了 -->
        <van-cell :to="'/article/'+item.art_id" v-for="(item,index) in list" :key="index"  >
             <artcle-item :item='item' slot='default'></artcle-item>
        </van-cell>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getAtrcleList } from "@/api/artcle.js";
import artcleItem from '@/components/artcleItem'
export default {
  created() {},
  props: {
    artcle: {
      type: Object,
      required: true,
    },
  },
  components:{
      artcleItem,
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      timestamp: null,
      error: false,
      isLoading: false,
      text: "",
    };
  },
  methods: {
    //滚动条与底部距离小于 offset 时触发
    async onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      try {
        const {
          data: { data },
        } = await getAtrcleList({
          channel_id: this.artcle.id, //频道ID
          timestamp: this.timestamp || Date.now(), //时间戳整数 单位毫秒  开始为空请求当前时间戳数据
          with_top: 0, //是否包含置顶，进入页面第一次请求时要包含置顶文章，1-包含置顶，0-不包含
        });
        // console.log(data);

        this.list.push(...data.results);

        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成  如果请求的数据长度为0
        if (data.results.length === 0) {
          this.finished = true;
        } else {
          this.timestamp = data.pre_timestamp; //返回数据有前一页历史数据的时间戳
        }
      } catch (error) {
        (this.error = true), (this.loading = false); //请求失败loading也关闭

        console.log("请求失败");
      }
    },
    //下拉刷新时会触发 refresh 事件，在事件的回调函数中可以进行同步或异步操作，操作完成后将 v-model 设置为 false，表示加载完成
    async onRefresh() {
      try {
        const {
          data: { data },
        } = await getAtrcleList({
          channel_id: this.artcle.id, //频道ID
          timestamp: Date.now(), //下拉刷新是获取最新数据
          with_top: 0, //是否包含置顶，进入页面第一次请求时要包含置顶文章，1-包含置顶，0-不包含
        });
        this.list.unshift(...data.results); //刷新数据列表顶部添加
        this.text = `刷新成功${data.results.length}条`;
        this.timestamp = data.pre_timestamp; //返回数据有前一页历史数据的时间戳
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        this.error=true

        this.text = "刷新失败";
      }
    },
  },
};
</script>

<style lang='less'>
.list {
  padding-top: 181px;

  .van-pull-refresh {
    .van-list {
      overflow-y: auto;
      height: 79vh; //视口单位 窗口相对单位 1vh=窗口的高1% 1vw=窗口宽1%
    }
  }
}
</style>