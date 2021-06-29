<template>
  <div class="history">
    <van-cell-group>
      <van-cell class="top" >
          <span slot="title">搜索历史</span>
          <van-button slot="default" round size="small">删除</van-button>
      </van-cell>
      <van-cell title="单元格"  >
          <van-icon slot="default" name="close" />
      </van-cell>
      <van-cell title="单元格"  >
          <van-icon slot="default" name="close" />
      </van-cell>
      <van-cell title="单元格"  >
          <van-icon slot="default" name="close" />
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less">
.history {
    .top {
    .van-button {
        border: 0;
    }
    span {
        font-size: 26px;
        font-weight: 600;
    }}

}
</style>