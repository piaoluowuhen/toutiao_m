<template>
  <div class="content">
    <van-row class="top" type="flex" justify="space-between">
      <span class="text">我的频道</span
      ><van-button type="default" round size="mini">编辑</van-button>
    </van-row>
    <!-- Grid 宫格 -->
    <van-grid>
    <van-grid-item
        v-for="value in 3"
        :key="value"
        text="大数据"
      />
    </van-grid>
    <div><span class="tag">频道推荐</span></div>
      
    <van-grid square  direction="horizontal">
      <van-grid-item
       icon='plus'
        v-for="value in 8"
        :key="value"
        text="大数据"
      />
    </van-grid>
  </div>
</template>

<script>
export default {};
</script>

<style lang='less'>
.content {
  margin: 85px 0;
  .top {
    margin-bottom: 10px;
    .van-button {
      margin-right: 16px;
      color: rgb(228, 113, 113);
      border: 1px solid rgb(228, 116, 116);
    }
    .text {
      font-size: 40px;
      margin-left: 16px;
    }
  }
  .tag {
    font-size: 40px;
    margin-left: 16px;
  }
  .van-icon {
      font-size: 36px ;
  }
}
</style>