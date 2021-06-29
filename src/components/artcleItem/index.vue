<template>
  <div class="artcleitem">
    <van-row class="bottom" type="flex">
      <van-col class="bottom" :span="num">
        <div class="title">{{ item.title }}</div>
        <div class="lable">
          <span >{{ item.aut_name }}</span>
          <span>{{ item.comm_count }}评论</span>
          <span>{{ item.pubdate | relativeTime }}</span>
        </div>
      </van-col>
      <van-col class="imgspan">
        <span :key="index" v-for="(i, index) in item.cover.images">
          <van-image
            class="img"
            width="100"
            fit="cover"
            height="100"
            :src="i"
          />
        </span>
      </van-col>
    </van-row>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  computed: {
    num() {
      return this.item.cover.images.length === 1 ? 16 : 24;
    },
  },
};
</script>

<style lang='less'>
.artcleitem {
  .imgspan {
    span {
      padding: 0 6px;
    }
  }
}
.lable {
  position: absolute;
  bottom: 0;
  left: 0;
  font-size: 24px;

}
.bottom {
  padding-bottom: 30px;
    .title {
      font-size: 28px ;
      font-weight: 600;
    }
}

</style>