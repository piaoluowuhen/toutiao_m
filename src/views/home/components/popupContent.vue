<template>
  <div class="content">
    <van-row class="top" type="flex" justify="space-between">
      <span class="text">我的频道</span
      ><van-button @click="change" type="default" round size="mini"
        >编辑</van-button
      >
    </van-row>
    <!-- Grid 宫格 -->
    <van-grid class="close">
      <van-grid-item v-for="(item, index) in my" :key="item.id">
        <van-icon
          :class="{ delicon: delicon }"
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
import { getChannel } from "@/api/channel.js";
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
    nochannels() {
      return this.channels.filter(item => {
        return !this.my.find(myitem => {
          return myitem.id === item.id
        })
      })
    },
  },
  data() {
    return {
      delicon: true, //默认隐藏删除图标
      channels: [], //所有频道
    };
  },
  methods: {
    async getChannel() {
      const {
        data: {
          data: { channels },
        },
      } = await getChannel();
      this.channels = channels
    },
    change() {
      this.delicon = !this.delicon;
    },
    addmy(item){
      this.my.push(item)
      

    }
  },
};
</script>

<style lang='less' >
.delicon {
  display: none; //隐藏右上角删除图标
}
.current {
  color: rgb(240, 93, 93) !important;
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