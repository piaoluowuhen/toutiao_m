<template>
  <div class="home">
    <!-- 导航栏 -->
    <van-nav-bar class="nav" fixed>
      <template v-slot:title>
        <van-button round icon="search" type="primary">搜索</van-button>
      </template>
    </van-nav-bar>
    <!-- tab标签页 -->
    <van-tabs class="tabpage" v-model="active" swipeable animated>
      <van-tab :title="item.name" :key="item.id" v-for="item in UserChannels">
        <!-- 内容组件 -->
        <artcleList :artcle="item"></artcleList>
      </van-tab>

      <!-- 占位最后一个元素显示完 -->
      <div class="last" slot="nav-right"></div>
      <template slot="nav-right">
        <div class="hb" @click="showPopup">
          <i class="toutiao toutiao-gengduo"></i>
        </div>
      </template>
    </van-tabs>
    <!-- Popup 弹出层 -->
    <van-popup
      v-model="show"
      position="bottom"
      closeable
      close-icon-position="top-left"
      round
      @close="close"
      @click-close-icon="close"
      >
      <!-- 内容组件 -->
      <popup-content></popup-content>
      
      </van-popup
    >
  </div>
</template>

<script>
import { getUserChannels } from "@/api/user.js";
import artcleList from "./components/articleList.vue";
import popupContent from "./components/popupContent.vue";
export default {
  created() {
    this.getUserChannels();
  },
  components: {
    artcleList,
    popupContent
  },
  data() {
    return {
      active: 0,
      UserChannels: [],
      show: false,
    };
  },
  methods: {
    async getUserChannels() {
      try {
        const {
          data: {
            data: { channels },
          },
        } = await getUserChannels();
        console.log(channels);
        this.UserChannels = channels;
      } catch (error) {
        this.$toast.fail("获取频道失败");
      }
    },
    showPopup() {
      this.show = true;
    },
    close() {
      // this.show = false
    },
  },
};
</script>

<style lang='less'>
.home {
  padding-bottom: 100px;

  .nav {
    background-color: #3598fa;
    .van-nav-bar__title {
      max-width: 100%;
    }
    .van-button {
      height: 70px;
      width: 520px;
      background-color: #5babfb;
      border: 0;
    }

    .van-icon {
      color: #fff;
      font-size: 32px;
    }
  }
  .van-tabs__wrap {
    position: fixed;
    z-index: 1; //z-index 属性设置元素的堆叠顺序。拥有更高堆叠顺序的元素总是会处于堆叠顺序较低的元素的前面
    top: 90px;
    left: 0;
    right: 0;
  }
  .tabpage {
    .van-tab {
      border-right: 1px solid #edeff3;
      min-width: 200px;
      height: 82px;
      font-size: 30px;
      color: #777777;
    }
    .van-tab--active {
      color: #333333;
    }
    .van-tabs__line {
      width: 31px;
      height: 6px;
      background-color: #3296fa;
      bottom: 40px;
    }
    .hb {
      position: fixed;
      right: 0;
      width: 66px;
      height: 82px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: rgba(255, 255, 255, 0.902);
      i {
        font-size: 33px;
      }
    }
    .last {
      flex-shrink: 0; //不参与flex空间计算
      width: 66px;
      height: 82px;
    }
  }
  .van-popup {
    height: 100vh;
  }
}
</style>