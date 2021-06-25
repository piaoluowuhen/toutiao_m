<template>
  <div class="my">
    <!-- 头部区域未登录时 -->
    <div v-if="!token" class="header-nologin">
      <div @click="redirectIogin" class="login-btn">
        <img class="photo" src="~@/assets/mobile.png" alt="" />
        <span class="text">注册/登录</span>
      </div>
    </div>
    <!-- 登录时的头部区域 -->
    <div v-else class="header-login">
      <div class="user">
        <van-image
          round
          width="60px"
          height="60px"
          fit="cover"
          src="https://img01.yzcdn.cn/vant/cat.jpeg"
        />
        <span class="text">黑马头条号</span>

        <van-button round size="mini" type="default">编辑资料</van-button>
      </div>

      <div class="options">
        <van-row>
          <van-col span="6">
            <span>8</span> <span class="text">头条</span>
          </van-col>
          <van-col span="6">
            <span>8</span> <span class="text">关注</span>
          </van-col>
          <van-col span="6">
            <span>8</span> <span class="text">粉丝</span>
          </van-col>
          <van-col span="6">
            <span>8</span> <span class="text">获赞</span>
          </van-col>
        </van-row>
      </div>
    </div>
    <!-- 中间区域  Grid宫格 展示内容和页面导航-->
    <van-grid class="grid" :column-num="2" clickable>
      <van-grid-item>
        <i slot="icon" class="toutiao toutiao-shoucang"></i>
        <span slot="text">收藏</span>
      </van-grid-item>
      <van-grid-item>
        <i slot="icon" class="toutiao toutiao-lishi"></i>
        <span slot="text">历史</span></van-grid-item
      >
    </van-grid>
    <!-- cell单元格 -->
    <van-cell class="cell" title="消息通知" is-link />
    <van-cell title="小智同学" is-link />
    <van-cell v-if='token' class="logout" clickable title="退出登录"  />
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  data() {
    return {
    };
  },
  computed:{
      ...mapState(['token'])

  },
  methods: {
    //点击未登录头像盒子跳转登录页
    redirectIogin() {
      this.$router.push("/login");
    },
  },
};
</script>

<style lang='less'>
.header-nologin {
  height: 361px;
  background: url("~@/assets/banner.png");
  background-size: cover;
  display: flex;
  justify-content: center;
  align-content: center; //垂直居中
  .login-btn {
    display: flex;
    flex-direction: column; //主轴方向
    justify-content: center;
    align-content: center; //垂直居中
    .text {
      margin: 0 auto;
      font-size: 28px;
      color: #fff;
    }
    .photo {
      width: 132px;
      height: 132px;
      margin-bottom: 15px;
    }
  }
}
.header-login {
  height: 361px;
  background: url("~@/assets/banner.png");
  background-size: cover;
  .user {
    box-sizing: border-box;
    height: 117px;
    padding-top: 180px;
    display: flex;
    align-items: center;
    .van-image {
      margin-left: 30px;
      border: 1px solid #fff;
    }
    .van-button {
      width: 140px;
      margin-left: 240px;
    }
    .text {
      font-size: 30px;
      color: #fff;
      margin-left: 30px;
    }
  }
  .options {
    margin-top: 80px;
    .van-row {
      text-align: center;
      color: #fff;
      font-size: 40px;

      .van-col {
        padding: 0 40px;
        display: flex;
        flex-direction: column; //主轴方向

        .text {
          font-size: 24px;
        }
      }
    }
  }
}
.grid {
    height: 141px;
    i {
        font-size: 45px;
        color: #eb5253;

    }
    .toutiao-lishi {
        color: #ff9d1d;
    }
    span {
        font-size: 28px;

    }
}
.cell {
    margin-top: 10px;
}
.logout {
    text-align: center;
    color: #d86282;
    margin: 10px 0;
}
</style>