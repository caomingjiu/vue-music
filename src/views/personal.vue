<template>
  <div class="cc-col bg">
    <img src="../assets/css/image/背景.jpg" alt="bg-img" class="bg-image" />
    <div class="header">
      <van-nav-bar style="background-color:black">
        <template #left>
          <router-link to="/">
            <i class="iconfont" style="color:white">&#xe602;</i>
          </router-link>
        </template>
        <template #right>
          <i class="iconfont" style="color:white" @click="showShare = true">&#xe77d;</i>
        </template>
      </van-nav-bar>
    </div>

    <div class="card cc-shadow">
      <div class="cc-col" style="margin-top:-45%;margin-left:5%" v-if="user!=null">
        <img :src="user.avatarUrl" alt class="avatar" />
        <p class="nickname-font">{{user.nickname}}</p>
        <div class="cc-df">
          <p class="fontSize">关注 {{user.follows}}</p>
          <div class="line"></div>
          <p class="fontSize">粉丝 {{user.followeds}}</p>
        </div>
        <van-tag round class="tag">Lv.{{user.vipType}}</van-tag>
      </div>
      <div class="card-header cc-df">
           <van-tabs v-model="activeName" class="tab-size">
  <van-tab title="推荐" name="a">
      <div class="cc-mtop cc-mleft cc-mright">
          <div class="cc-df-between ">
              <div class="cc-df">
                 <p class="base-font"><b>基本信息</b></p>
              <p style="font-size:9px;margin-top:1%">（信息展示可在隐私设置修改）</p> 
              </div>
              <van-tag plain>跟多信息</van-tag>
          </div>
          <p style="font-size:9px;margin-top:3%">村龄：{{users.createDays}}天  ({{time | formatDate}}注册)</p> 
          <p style="font-size:9px;margin-top:3%">生日：{{user.birthday | formatDate1}}</p> 
      </div>
  </van-tab>
  <van-tab title="排行榜" name="b">
      <div>
          <p class="font-active">暂时还没有动态呦</p>
      </div>
  </van-tab>
</van-tabs>
      </div>
    </div>
    <van-share-sheet v-model="showShare" title="立即分享给好友" :options="options" />
  </div>
</template>

<script>
export default {
  name: "personal",
  data() {
    return {
      user: this.$store.state.user,
      token: this.$store.state.token,
      showShare: false,
      options: [
        [
          { name: "微信", icon: "wechat" },
          { name: "微博", icon: "weibo" },
          { name: "QQ", icon: "qq" }
        ],
        [
          { name: "复制链接", icon: "link" },
          { name: "分享海报", icon: "poster" },
          { name: "二维码", icon: "qrcode" }
        ]
      ],
      activeName: 'a',
      show: false,
      time: 1516703495241,
      users:{}
    };
  },
  filters:{
       formatDate: function (value) {
        let date = new Date(value);
        let y = date.getFullYear();
        let MM = date.getMonth() + 1;
        MM = MM < 10 ? ('0' + MM) : MM;
        // let d = date.getDate();
        // d = d < 10 ? ('0' + d) : d;
        // let h = date.getHours();
        // h = h < 10 ? ('0' + h) : h;
        // let m = date.getMinutes();
        // m = m < 10 ? ('0' + m) : m;
        // let s = date.getSeconds();
        // s = s < 10 ? ('0' + s) : s;
        return y + '年' + MM + '月';
      },
      formatDate1: function (value) {
        let date = new Date(value);
        let y = date.getFullYear();
        let MM = date.getMonth() + 1;
        MM = MM < 10 ? ('0' + MM) : MM;
        let d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        // let h = date.getHours();
        // h = h < 10 ? ('0' + h) : h;
        // let m = date.getMinutes();
        // m = m < 10 ? ('0' + m) : m;
        // let s = date.getSeconds();
        // s = s < 10 ? ('0' + s) : s;
        return y + '年' + MM + '月' +d +'日';
      }
  },
  components: {},
  created() {
      console.log(this.user)
    this.$axios({
      method: "get",
      url: this.GLOBAL.baseUrl + "/user/detail?uid="+this.user.userId
    })
      .then(res => {
        console.log(res);
        this.time=res.data.createTime
        this.users=res.data
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  mounted() {},
  methods: {},
  computed: {}
};
</script>

<style scoped lang="scss">
.bg {
  height: 1000px;
}
.bg-image {
  height: 100%;
}
.card {
  z-index: 10;
  margin-top: -200%;
  width: 100%;
  height: 80%;
  background-color: white;
}
.tab-size{
    width: 100%;
    margin-top: 4%;
}
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
}
.avatar {
  width: 20%;
  border-radius: 50%;
}
.nickname-font {
  color: white;
  margin-top: 2%;
}
.line {
  margin-top: 2%;
  width: 0.5px;
  background-color: white;
  margin-left: 2%;
  margin-right: 2%;
}
.fontSize {
  color: white;
  font-size: 12px;
  margin-top: 2%;
}
.tag {
  width: 15%;
  margin-top: 2%;
  padding-left: 4%;
}
.font-active{
    font-size: 12px;
    margin-top: 10%;
    margin-left: 34%;
}
.base-font{
    font-size: 11;
}
</style>
