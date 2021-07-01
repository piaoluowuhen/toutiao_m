<template>
  <div class="profile">
    <van-nav-bar title="个人信息">
      <van-icon
        @click="$router.back()"
        slot="left"
        name="arrow-left"
      ></van-icon>
    </van-nav-bar>
    <van-cell class="touxiang" title="头像" is-link>
      <van-image
        slot="default"
        round
        class="photo"
        fit="cover"
        :src="profile.photo"
      />
    </van-cell>
    <van-cell
      @click="showname = true"
      title="昵称"
      is-link
      :value="profile.name"
    />

    <update-name
      v-if="profile.name"
      :showname.sync="showname"
      :name.sync="profile.name"
    ></update-name>


    <van-cell
    @click="showgender = true"
      title="性别"
      is-link
      :value="profile.gender === 1 ?  '女':'男'"
    />
    <update-gender v-if="profile.gender"  :showgender.sync="showgender" :gender.sync='profile.gender'></update-gender>

    <van-cell  @click="showday = true" title="生日" is-link :value="profile.birthday"/>
    <update-day v-if="profile.birthday"  :showday.sync="showday" :day.sync='profile.birthday'></update-day>
  </div>
</template>

<script>
import { getUserProfile } from "@/api/user.js";
import updateName from "./components/updateName.vue";
import updateGender from "./components/updateGender.vue";
import updateDay from "./components/updateDay.vue";
export default {
  data() {
    return {
      profile: {},
      showname: false,
      showgender:false,
      showday:false,

    };
  },
  components: {
    updateName,
    updateGender,
    updateDay,
  },
  created() {
    this.getUserProfile();
  },
  methods: {
    async getUserProfile() {
      try {
        const {
          data: { data },
        } = await getUserProfile();
        console.log(data);
        this.profile = data;
      } catch (error) {
        this.$toast("获取信息失败");
      }
    },
  },
};
</script>

<style lang="less">
.profile {
  .van-nav-bar {
    background-color: #3598fa;
    .van-nav-bar__title {
      font-weight: 500;
      color: #fff;
    }
    .van-icon {
      font-size: 40px;
      color: #fff !important;
    }
  }
  .photo {
    height: 60px;
    width: 60px;
    margin-top: 20px;
  }
  .touxiang {
    display: flex;
    align-items: center;
    padding: 0 34px;
  }
}
</style>