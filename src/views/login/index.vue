<template>
  <div class="login-container">
    <!-- 导航栏0 -->
    <van-nav-bar class="page-nav-bar" title="登录" >
      <i @click="$router.back()" slot="left" class="toutiao toutiao-guanbi"></i>
    </van-nav-bar>
    <!-- 表单 -->
    <!-- 表单提交自动触发表单校验 -->
    <van-form @submit="onSubmit" ref="form">
      <van-field
        left-icon=""
        v-model="user.mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="userFormRules.mobile"
        type="number"
        maxlength="11"
        >//
        <!-- 图标插槽  -->
        <i slot="left-icon" class="toutiao toutiao-shouji"></i>
      </van-field>
      <van-field
        v-model="user.code"
        name="code"
        placeholder="请输入验证码"
        :rules="userFormRules.code"
        type="number"
        maxlength="6"
        ><i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
        <!-- 按钮插槽 -->
        <template #button>
          <van-button
            @click="send"
            native-type="button"
            round
            class="send-btn"
            size="small"
            type="primary"
          >
            <!-- 倒计时组件 -->
            <van-count-down
              v-if="showTime"
              :time="time"
              format=" ss s"
              @finish="timeOver"
            />

            发送验证码</van-button
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
import { login, getMobileCode } from "@/api/user";
import {mapMutations} from 'vuex'

export default {
  name: "loginIndex",
  data() {
    return {
      user: {
        mobile: "13911111111",
        code: "246810",
      },
      userFormRules: {
        mobile: [
          { required: true, message: "请填写手机号" },
          {
            pattern: /^1[3|5|7|8]\d{9}$/,
            message: "手机格式不对",
          },
        ],
        code: [
          { required: true, message: "验证码不能为空" },
          { pattern: /^\d{6}$/, message: "验证码6位" },
        ],
      },
      time: 60 * 1000,
      showTime: false,
    };
  },
  methods: {
    ...mapMutations(['settoken']),
    async onSubmit() {
      // 表单验证

      //加载提示 组件中用this.$toast
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0, //持续时间默认2s 0持续展示
      });

      //登录按钮发送请求
      const user = this.user;
      try {
        const {data:{data}} = await login(user);
        console.log(data);
        this.$toast.success("登录成功");
        this.settoken(data)//2个token都存起来
        this.$router.push('/')
      } catch (err) {
        if (err.response.status === 400) {
          this.$toast.fail("手机号或验证码错误");
        } else {
          this.$toast.fail('登录失败，请稍后重试", err');
        }
      }
    },
    //发送验证码按钮   手机验证通过为前提
    async send() {
      //发送验证码之前只验证手机号
      try {
        await this.$refs.form.validate("mobile");
      } catch (error) {
        return console.log(error)
      }

      try {
        //发送请求获取验证码
        await getMobileCode(this.user.mobile)
        this.$toast('发送成功')
      } catch (error) {
      this.showTime = false//请求失败或者
         if(error.response.status === 429){
           this.$toast('发送间隔60秒')
         } else {
         console.log(error)
         }
      }
      this.showTime = true;
    },
    //倒计时结束
    timeOver() {
      this.showTime = false
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
  .page-nav-bar {
    .toutiao {
      font-size: 20px;
      font-weight: 2px;
      color: #fff;
    }

  }
}
</style>