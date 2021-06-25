<template>
  <div class="layout-container">
    <!-- 子路由占位 -->
    <router-view></router-view>
    <!-- tab栏 -->
    <!-- 开启路由模式active属性失效 -->
    <van-tabbar router  v-model="active">
      <van-tabbar-item to="/" >
        <template>
          <i slot="icon" class="toutiao toutiao-shouye"></i>
        </template>
        <span>首页</span>
      </van-tabbar-item>
      <van-tabbar-item dot to="/qa"
        ><template>
          <i slot="icon" class="toutiao toutiao-wenda"></i>
        </template>
        <span>问答</span></van-tabbar-item
      >
      <van-tabbar-item badge="5" to="/video"
        ><template>
          <i slot="icon" class="toutiao toutiao-shipin"></i>
        </template>
        <span>视频</span></van-tabbar-item
      >
      <van-tabbar-item badge="20" to="/my"
        ><template>
          <i slot="icon" class="toutiao toutiao-wode"></i>
        </template>
        <span>{{$store.state.token ? '我的': '未登录' }}</span></van-tabbar-item
      >
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "layout",
  data() {
    return {
        active:0,
    };
  },
  methods:{

  }
};
</script>

<style lang='less'>
.layout-container {
  .van-tabbar-item {
    .toutiao {
      font-size: 40px;
    }
    span {
        font-size: 20px;
    }
  }
}
</style>