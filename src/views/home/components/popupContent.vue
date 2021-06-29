<template>
  <div class="content">
    <van-row class="top" type="flex" justify="space-between">
      <span class="text">我的频道</span
      ><van-button @click="change" type="default" round size="mini">{{
        delicon ? "编辑" : "完成"
      }}</van-button>
    </van-row>
    <!-- Grid 宫格 -->
    <van-grid class="close">
      <van-grid-item
        v-for="(item, index) in my"
        :key="item.id"
        @click="clickmy(item, index)"
      >
        <van-icon
          :class="{ delicon: index === 0 ? true : delicon }"
          slot="icon"
          name="close"
        ></van-icon>
        <span slot="text" :class="{ current: index === active }">{{
          item.name
        }}</span>
      </van-grid-item>
    </van-grid>

    <div class="tag">频道推荐</div>
    <van-grid direction="horizontal">
      <van-grid-item
        icon="plus"
        v-for="item in nochannels"
        :key="item.id"
        :text="item.name"
        @click="addmy(item)"
      />
    </van-grid>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { getChannel, addChannel ,deleteChannel} from "@/api/channel.js";
import { setItem } from "@/utils/storage";
export default {
  created() {
    this.getChannel();
  },
  props: {
    my: {
      type: Array,
      required: true,
    },
    active: {
      type: Number,
      required: true,
    },
  },
  computed: {
    ...mapState(["token"]),
    nochannels() {
      return this.channels.filter((item) => {
        return !this.my.find((myitem) => {
          return myitem.id === item.id;
        });
      });
    },
  },
  data() {
    return {
      delicon: true, //默认隐藏删除图标
      channels: [], //所有频道
      dont: [0], //不允许操作的频道项
    };
  },
  methods: {
    //获取频道列表
    async getChannel() {
      const {
        data: {
          data: { channels },
        },
      } = await getChannel();
      this.channels = channels;
    },
    change() {
      this.delicon = !this.delicon;
    },
    //点击添加频道
    async addmy(item) {
      this.my.push(item);
      // 数据持久化处理
      if (this.token.token) {
        //有token登录状态
        try {
          // 已登录，把数据请求接口放到线上
          console.log(1);
          await addChannel({
            id: item.id, // 频道ID
            seq: this.my.length, // 序号
          })
        } catch (err) {
          this.$toast("保存失败，请稍后重试");
        }
      } else {
        // 未登录，把数据存储到本地
        setItem("TOUTIAO_CHANNELS", this.myChannels);
      }
    },
    clickmy(item, index) {
      //includes() ---- 判断一个数组是否包含一个指定的值。支持ES5语法 效果等于 item.id!==0
      if (this.delicon === false && this.dont.includes(item.id) === false) {
        //编辑模式  删除频道
        this.deleteChannel(item)
        this.my.splice(
          this.my.findIndex((k) => item.id === k.id),1       
        )
        //如果删除频道索引小于 active  则active-1高亮才不会变
        if (this.active > index) {
          this.$emit("upactive", this.active - 1);
        }
      } else {
        //非编辑 展示对应项
        this.$emit("upactive", index, false);
      }
    },
    //删除函数
     async deleteChannel (channel) {
      try {
        if (this.token.token) {
          // 已登录，则将数据更新到线上
          await deleteChannel(channel.id)
        } else {
          // 未登录，将数据更新到本地
          setItem('TOUTIAO_CHANNELS', this.myChannels)
        }
      } catch (err) {
        this.$toast('操作失败，请稍后重试')
      }
    }
  },
};
</script>

<style lang='less' >
.delicon {
  display: none; //隐藏右上角删除图标
}
.current {
  color: rgb(240, 93, 93) !important; //高亮
}
.content {
  margin: 85px 0;
  padding: 0 16px;
  .top {
    margin-bottom: 20px;
    .van-button {
      color: rgb(228, 113, 113);
      border: 1px solid rgb(228, 116, 116);
    }
    .text {
      font-size: 40px;
    }
  }
  .tag {
    font-size: 40px;
    margin: 20px 0;
  }
  .van-icon {
    font-size: 24px;
  }
  .close {
    .van-grid-item__icon-wrapper {
      position: absolute;
      .van-icon {
        position: absolute;
        top: -55px;
        right: -92px;
        color: rgb(236, 82, 82);
        z-index: 2;
      }
    }
    span {
      white-space: nowrap; //不换行
      color: #222;
      font-size: 24px;
    }
  }
  .van-grid {
    .van-grid-item__content {
      width: 160px;
      height: 86px;
      background-color: #f4f5f6;
      margin-top: 10px;
      border-radius: 10px;

      .van-grid-item__text {
        white-space: nowrap; //不换行
        color: #222;
        margin: 0;
      }
    }
  }
}
</style>