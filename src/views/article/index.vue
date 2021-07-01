<template>
  <div class="article">
    <van-nav-bar title="黑马头条">
      <van-icon
        @click="$router.back()"
        slot="left"
        name="arrow-left"
      ></van-icon>
    </van-nav-bar>

    <!-- loading -->
    <van-loading v-if="loading" type="spinner" color="#1989fa" />

    <!-- 加载失败：404 -->
    <div v-else-if="errstatus === 404" class="error-wrap">
      <van-icon name="failure" />
      <p class="text">该资源不存在或已删除！</p>
    </div>
    <!-- /加载失败：404 -->

    <!-- 详情页 -->
    <div ref="content" v-else-if="articledata" class="success markdown-body">
      <van-row class="head" type="flex" justify="space-between">
        <van-col span="9">
          <van-row type="flex" justify="space-between">
            <van-col>
              <van-image
                round
                width="36px"
                height="36px"
                fit="cover"
                :src="articledata.aut_photo"
            /></van-col>
            <van-col span="14">
              <div>{{ articledata.aut_name }}</div>
              <div>{{ articledata.pubdate | relativeTime }}</div></van-col
            >
          </van-row>
        </van-col>
        <van-col span="6">
          <follow-user :articledata="articledata"></follow-user>
        </van-col>
      </van-row>
      <h5>{{ articledata.title }}</h5>

      <!-- 内容 -->
      <div v-html="articledata.content"></div>
      <!-- Tabbar 标签栏 -->

      <van-tabbar v-model="active">
        <van-tabbar-item class="comment">
          <van-button>写评论</van-button>
        </van-tabbar-item>

        <van-tabbar-item badge="5">
          <van-icon slot="icon" name="comment-o" />
        </van-tabbar-item>

        <van-tabbar-item>
          <article-item :articledata="articledata" slot="icon"></article-item>
        </van-tabbar-item>

        <van-tabbar-item icon="friends-o">
          <dian-zhan :articledata="articledata" slot="icon"></dian-zhan>
        </van-tabbar-item>

        <van-tabbar-item>
          <van-icon name="share" slot="icon" />
        </van-tabbar-item>
      </van-tabbar>

      <van-divider>正文结束</van-divider>

      <!-- 评论区列表组件 -->
      <comment-list
        ref="list"
        :list="commentlist"
        @reply-click="onReplyClick"
      ></comment-list>
    </div>

    <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
    <div v-else class="error-wrap">
      <van-icon name="failure" />
      <p class="text">内容加载失败！</p>
      <van-button class="retry-btn" @click="getArticleById"
        >点击重试</van-button
      >
    </div>
    <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->

    <!-- 发布评论 -->
    <!-- <van-popup
          v-model="isPostShow"
          position="bottom"
        >
          <comment-post
            :target="article.art_id"
            @post-success="onPostSuccess"
          />
        </van-popup> -->
    <!-- 发布评论 -->

    <!-- 评论回复 -->
    <!--
      弹出层是懒渲染的：只有在第一次展示的时候才会渲染里面的内容，之后它的关闭和显示都是在切换内容的显示和隐藏
     -->
    <!-- <van-popup
      v-model="isReplyShow"
      position="bottom"
      style="height: 100%;"
    > -->
    <!--
        v-if 条件渲染
          true：渲染元素节点
          false：不渲染
       -->
    <!-- <comment-reply
        v-if="isReplyShow"
        :comment="currentComment"
        @close="isReplyShow = false"
      />
    </van-popup> -->
    <!-- /评论回复 -->
  </div>
</template>

<script>
import { getArticleById } from "@/api/artcle.js";
// import { addFollow, deleteFollow } from "@/api/user.js";
import followUser from "@/components/followuser";
import articleItem from "@/components/articleitem";
import dianZhan from "@/components/dianzhan";
import commentList from "./components/commentList.vue";
import { ImagePreview } from "vant"; //函数调用 ImagePreview 是一个函数，调用函数后会直接在页面中展示图片预览界面。

export default {
  data() {
    return {
      active: 0,
      articledata: {},
      loading: true,
      errstatus: 0,
      btnloading: false,
      commentlist: [], // 评论列表
    };
  },
  components: {
    followUser,
    articleItem,
    dianZhan,
    commentList,
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
      this.loading = true;
      try {
        const {
          data: { data },
        } = await getArticleById(this.articleId);
        this.articledata = data;
        this.$refs.list.sureid(this.articledata.art_id);
        //ImagePreview 图片预览
        //获取内容数据img标签src属性值 因为次函数在挂载前调用
        setTimeout(() => {
          //获取节点拿到src属性值
          this.previewImage();
        }, 0);

        this.loading = false;
      } catch (error) {
        this.loading = false;
        if (error.response && error.response.status === 404) {
          this.errstatus = 404;
        }
      }
    },
    previewImage() {
      //获取节点拿到src属性值
      let imgs = this.$refs.content.querySelectorAll("img");
      let arr = [];
      imgs.forEach((element, index) => {
        arr.push(element.src);
        // 给每个 img 注册点击事件，在处理函数中调用预览
        element.onclick = () => {
          //ImagePreview 支持传入配置对象，并通过 startPosition 选项指定图片的初始位置（索引值）。
          ImagePreview({
            images: arr,
            startPosition: index,
          });
        };
      });
    },
    onPostSuccess(data) {
      // 关闭弹出层
      this.isPostShow = false;
      // 将发布内容显示到列表顶部
      this.commentList.unshift(data.new_obj);
    },

    onReplyClick(comment) {
      this.currentComment = comment;

      // 显示评论回复弹出层
      this.isReplyShow = true;
    },
  },
};
</script>

<style lang="less">
// less的引入语法 文章样式
@import "./github-markdown.css";

.success {
  padding: 16px;
  padding-bottom: 70px;
}
.article {
  .toutiao {
    font-size: 40px;
  }
  .van-loading__spinner--spinner {
    margin-left: 350px;
    margin-top: 30%;
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
.error-wrap {
  height: 900px;
  padding: 200px 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  .van-icon {
    font-size: 122px;
    color: #b4b4b4;
  }
  .text {
    font-size: 30px;
    color: #666666;
    margin: 33px 0 46px;
  }
  .retry-btn {
    width: 280px;
    height: 70px;
    line-height: 70px;
    border: 1px solid #c3c3c3;
    font-size: 30px;
    color: #666666;
  }
}
</style>