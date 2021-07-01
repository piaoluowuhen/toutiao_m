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
          :src="UserInfo.photo"
        />
        <span class="text">{{UserInfo.name}}</span>

        <van-button to="/my/profile" round size="mini" type="default">编辑资料</van-button>
      </div>

      <div class="options">
        <van-row>
          <van-col span="6">
            <span>{{UserInfo.art_count}}</span> <span class="text">头条</span>
          </van-col>
          <van-col span="6">
            <span>{{UserInfo.follow_count}}</span> <span class="text">关注</span>
          </van-col>
          <van-col span="6">
            <span>{{UserInfo.fans_count}}</span> <span class="text">粉丝</span>
          </van-col>
          <van-col span="6">
            <span>{{UserInfo.like_count}}</span> <span class="text">获赞</span>
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
    <van-cell
      @click="out"
      v-if="token"
      class="logout"
      clickable
      title="退出登录"
    />
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { getUserInfo } from "@/api/user";
export default {
  created() {
    console.log(this.token.token);
    //如果有token获取用户信息
    if(this.token){
      this.getUserInfo()
    }
  },
  data() {
    return {
      UserInfo: {},
    };
  },
  computed: {
    ...mapState(["token"]),
  },
  methods: {
    ...mapMutations(["settoken"]),
    //获取用户自己信息
   async getUserInfo() {
     try {
    const {data:{data}} = await getUserInfo();
    console.log(data);    
    this.UserInfo = data  
     } catch (error) {
       this.$toast.fail('获取信息失败')
       
     }
    },
    //点击未登录头像盒子跳转登录页
    redirectIogin() {
      this.$router.push("/login");
    },
    //退出登录
    out() {
      this.$dialog
        .confirm({ title: "确认退出？", message: "点击确认退出登录" })
        .then(() => {
          // console.log(1);
          this.settoken(null); //设置token传null也就清空了vuex和本地存储
          // on confirm
        })
        .catch(() => {
          // console.log(2);
          // on cancel
        });
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
    }
    .text {
      width: 400px;
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
          width: 100px;
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