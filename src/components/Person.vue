<template>
  <div class="cc-col bg">
    <img src="../assets/css/image/背景.jpg" alt="bg-img" class="bg-image" v-if="user!=null"/>
    <div class="bg-image" style="background-color:black" v-if="!user"></div>
    <div class="card">
      <router-link to="/personal">
        <div class="cc-df" v-if="user!=null">
          <img :src="user.avatarUrl" alt class="avatar" />
          <p class="nickname-font" >{{user.nickname}} </p>
        </div>
      </router-link>
      <router-link to="/login">
        <div class="cc-df" v-if="!user">
          <img src="../assets/css/image/下载 (1).png" class="avatar" v-if="!user">
          <p class="nickname-font" >没有登录，去登陆 </p>
        </div>
      </router-link>
      <div class="cc-mtop cc-col">
        <hr class="line" />
        <div class="cc-df cc-mtop">
          <i class="iconfont icon">&#xe603;</i>
          <p class="font-white">创作者中心</p>
        </div>
        <hr class="line cc-mtop" />
        <div class="cc-df cc-mtop">
          <i class="iconfont icon">&#xe60c;</i>
          <p class="font-white">听歌识曲</p>
        </div>
        <div class="cc-df cc-mtop">
          <i class="iconfont icon">&#xe609;</i>
          <p class="font-white">商城</p>
        </div>
        <div class="cc-df cc-mtop">
          <i class="iconfont icon">&#xe65b;</i>
          <p class="font-white">附近的人</p>
        </div>
        <div class="cc-df cc-mtop">
          <i class="iconfont icon">&#xe684;</i>
          <p class="font-white">游戏推荐</p>
        </div>
        <hr class="line cc-mtop" />
        <div class="cc-df cc-mtop">
          <i class="iconfont icon">&#xe604;</i>
          <p class="font-white">我的订单</p>
        </div>
        <div class="cc-df cc-mtop">
          <i class="iconfont icon">&#xe77e;</i>
          <p class="font-white">定时停止播放</p>
        </div>
        <div class="cc-df cc-mtop">
          <i class="iconfont icon">&#xe739;</i>
          <p class="font-white">扫一扫</p>
        </div>
      </div>

      <div class="footer">
        <van-tabbar v-model="active">
          <van-tabbar-item icon="friends">好友</van-tabbar-item>
          <van-tabbar-item icon="setting">设置</van-tabbar-item>
          <van-tabbar-item>
            <div class="cc-col" style="margin-top:-5px" @click="layout()">
              <template>
                <i class="iconfont icon-size">&#xe603;</i>
              </template>
              <span>退出</span>
            </div>
          </van-tabbar-item>
        </van-tabbar>
      </div>
    </div>
    <!-- <router-link to="/login">denglu</router-link> -->
  </div>
</template>

<script>
export default {
  name: "Person",
  props: "",
  data() {
    return {
      user: this.$store.state.user,
      token: this.$store.state.token,
      active: 0
    };
  },
  components: {},
  created() {
   console.log(this.user)
  },
  mounted() {},
  methods: {
    layout(){
      this.$axios({
      method: "get",
      url: this.GLOBAL.baseUrl + "/logout"
    })
      .then(res => {
        console.log(res);
       localStorage.setItem("user", null);
            this.$store.commit("setUser", null);
      this.$router.push('/login')
      })
      .catch(function(error) {
        console.log(error);
      });
    }
  },
  computed: {}
};
</script>

<style scoped lang="scss">
.bg {
  height: 100%;
}
.bg-image {
  height: 100%;
}
.card {
  z-index: 10000;
  margin-top: -215%;
  margin-left: 5%;
}
.avatar {
  width: 20%;
  border-radius: 50%;
}
.nickname-font {
  color: white;
  margin-top: 6.2%;
  margin-left: 2%;
}
.icon {
  color: white;
  margin-top: 1.4%;
  margin-right: 2%;
}
.icon-size {
  font-size: 19px;
  margin-bottom: 3px;
}
.line {
  margin-left: 0%;
  width: 90%;
}
</style>
