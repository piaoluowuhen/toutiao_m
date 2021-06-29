<template>
  <div class="article">
    <van-nav-bar title="黑马头条">
      <van-icon @click="$router.back()" slot="left" name="arrow-left"></van-icon>
    </van-nav-bar>
    <!-- loading -->
    <van-loading type="spinner" color="#1989fa" />

    <h5>{{ articledata.title }}</h5>

    <van-row class="head" type="flex" justify="space-between">
      <van-col span="9">
        <van-row type="flex" justify="space-between">
          <van-col >
            <van-image
              round
              width="36px"
              height="36px"
              fit="cover"
              :src="articledata.aut_photo"
          /></van-col>
          <van-col span="14">
            <div>{{ articledata.aut_name }}</div>
            <div> {{ articledata.pubdate  | relativeTime }}</div></van-col
          >
        </van-row>
      </van-col>
      <van-col span="6">
        <van-button icon="plus" round type="info" size="mini">关注</van-button>
      </van-col>
    </van-row>
    

    <!-- 内容 -->
    <div v-html="articledata.content"></div>
    <!-- Tabbar 标签栏 -->
    <van-tabbar v-model="active">
      <van-tabbar-item class="comment"
        ><van-button>写评论</van-button></van-tabbar-item
      >
      <van-tabbar-item badge="5">
        <van-icon slot="icon" name="comment-o" />
      </van-tabbar-item>
      <van-tabbar-item>
        <i class="toutiao toutiao-shoucang" slot="icon"></i>
      </van-tabbar-item>
      <van-tabbar-item icon="friends-o">
        <i class="toutiao toutiao-dianzan" slot="icon"></i>
      </van-tabbar-item>
      <van-tabbar-item icon="friends-o">
        <i class="toutiao toutiao-fenxiang" slot="icon"></i>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { getArticleById } from "@/api/artcle.js";
export default {
  data() {
    return {
      active: 0,
      articledata: {},
    };
  },
  props: {
    articleId: {
      type: [String, Number, Object],
      required: true,
    },
  },
  created() {
    this.getArticleById();
  },
  methods: {
    async getArticleById() {
      const {
        data: { data },
      } = await getArticleById(this.articleId);
      console.log(data);
      this.articledata = data;
    },
  },
};
</script>

<style lang="less">
.article {
  .toutiao {
    font-size: 40px;
  }
  .van-loading__spinner--spinner {
    margin-left: 350px;
  }
  .van-nav-bar {
    background-color: #3598fa;
    .van-nav-bar__title {
      font-weight: 600;
      color: #fff;
    }
    .van-icon {
      font-size: 40px;
      color: #fff !important;
    }
  }
  .head {
    div {
      font-size: 24px;
    }
  }
}
.comment {
  flex: 4 !important;
  .van-button {
    width: 300px;
    height: 66px;
    border: 1px solid rgb(165, 144, 144);
  }
}
</style>