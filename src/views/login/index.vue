<template>
  <div class="login-container">
    <!-- 导航栏0 -->
    <van-nav-bar class="page-nav-bar" title="登录" />
    <!-- 表单 -->
    <van-form @submit="onSubmit">
      <van-field
        left-icon=""
        v-model="user.mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="[{ required: true, message: '请填写用户名' }]"
        >//
        <!-- 图标插槽  -->
        <i slot="left-icon" class="toutiao toutiao-shouji"></i>
      </van-field>
      <van-field
        v-model="user.code"
        name="code"
        placeholder="请输入验证码"
        :rules="[{ required: true, message: '请填写密码' }]"
        ><i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
        <!-- 按钮插槽 -->
        <template #button>
          <van-button round class="send-btn" size="small" type="primary"
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <div class="subdiv" style="margin: 16px">
        <van-button class="subbtn" round block type="info" native-type="submit"
          >提交</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { login } from "@/api/user";

export default {
  name: "loginIndex",
  data() {
    return {
      user: {
        mobile: "13911111111",
        code: "246810",
      },
    };
  },
  methods: {
    async onSubmit() {
        // 表单验证


        //加载提示 组件中用this.$toast
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration:0,//持续时间默认2s 0持续展示
      });

      //发送请求
      const user = this.user;
      try {
        const data = await login(user);
        console.log(data);
        this.$toast.success('登录成功')
      } catch (err) {
        if (err.response.status === 400) {
        this.$toast.fail('手机号或验证码错误')
        } else {
        this.$toast.fail('登录失败，请稍后重试", err')
        }
      }
    },
  },
};
</script>

<style lang='less'>
.login-container {
  .toutiao {
    font-size: 37px;
  }
  .send-btn {
    border: 0;
    background-color: #ededed;
    width: 162px;
    height: 46px;
    font-size: 22px;
    color: #666;
  }
  .subdiv {
    margin: 53px 33px;
    .subbtn {
      background-color: #6db4fb;
      border: none;
    }
  }
}
</style>