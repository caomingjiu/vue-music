<template>
  <div class="bg">
    <van-swipe :autoplay="3000" style="height:30%;">
  <van-swipe-item v-for="(image, index) in MVs" :key="index">
    <img :src="image.picUrl" alt="" >
  </van-swipe-item>
</van-swipe>
<van-tabs v-model="active" style="background-color: whitesmoke;">
  <van-tab title="每日新歌">
    <div class="cc-df-between cc-mleft cc-mright">
      <div class="cc-df" style="width:50%">
        <van-icon name="play-circle-o" class="icon"/>
        <p>播放全部</p>
      </div>
      <div class="cc-df" style="width:17%">
        <van-icon name="bars" class="icon"/>
        <p>多选</p>
      </div>
    </div>
    <div v-for="(item,index) in songs" :key="index">
     <div class="cc-df-between cc-mleft cc-mright cc-mtop">
      <div class="cc-df" style="width:70%">
        <img :src="item.picUrl" alt="" class="avatar">
        <div class="cc-col cc-mleft" >
          <p style="font-size:10px;margin-top:5px;">{{item.name}}</p>
          <div class="cc-df">
            <div v-for="(item1,index1) in item.song.artists" :key="index1">
              <div style="margin-right:4px;margin-top:20px;">
                <span style="font-size:10px;">{{item1.name}}</span>
              </div>
          </div>
          </div>
          
        </div>
      </div>
      <div class="cc-df" >
        <i class="iconfont" style="font-size:25px">&#xe7fb;</i>
      </div>
    </div>
    </div>
  </van-tab>
  <van-tab title="推荐歌单">
    <div class="cc-df-warp">
        <div v-for="(item,index) in songLists" :key="index">
          <div class="card cc-mtop">
            <img :src="item.picUrl" alt="" style="width:100%">
            <p style="font-size:10px">{{item.name}}</p>
          </div>
        </div>
    </div>
  </van-tab>
  <van-tab title="推荐MV">
    <div v-for="(item,index) in MVs" :key="index">
     <div class="cc-df-between cc-mleft cc-mright cc-mtop">
      <div class="cc-df" style="width:85%;">
        <img :src="item.picUrl" alt="" class="avatar1">
        <div class="cc-col cc-mleft" >
          <p style="font-size:10px;margin-top:5px;">{{item.name}}</p>
          <div class="cc-df">
            <div v-for="(item1,index1) in item.artists" :key="index1">
              <div style="margin-right:4px;margin-top:20px;">
                <span style="font-size:10px;">{{item1.name}}</span>
              </div>
          </div>
          </div>
          
        </div>
      </div>
      <div class="cc-df" >
        <i class="iconfont" style="font-size:25px">&#xe7fb;</i>
      </div>
    </div>
    </div>
  </van-tab>
  <van-tab title="推荐电台">
    <div class="cc-df-warp">
        <div v-for="(item,index) in radios" :key="index">
          <div class="card">
            <img :src="item.picUrl" alt="" style="width:100%">
            <p style="font-size:10px">{{item.name}}</p>
          </div>
        </div>
    </div>
  </van-tab>
</van-tabs>
  </div>
</template>

<script>
export default {
 name: 'recommend',
 props: "",
  data() {
    return {
      active: 0,
      images: [
        'https://img.yzcdn.cn/vant/apple-1.jpg',
        'https://img.yzcdn.cn/vant/apple-2.jpg',
      ],
      songs:[],
      songLists:[],
      MVs:[],
      radios:[]
    }
  },
  components: {},
  created() {
    this.selectSong()
    this.selectSongList()
    this.selectMV()
    this.selectRadio()
  },
  mounted() {},
  methods: {
    selectSong(){
      this.$axios({
      method: "get",
      url: this.GLOBAL.baseUrl + "/personalized/newsong"
    })
      .then(res => {
        console.log(res.data);
        this.songs=res.data.result
        console.log(this.songs[1].song.artists[0])
      })
      .catch(function(error) {
        console.log(error);
      });
    },
    selectSongList(){
      this.$axios({
      method: "get",
      url: this.GLOBAL.baseUrl + "/personalized?limit=12"
    })
      .then(res => {
        console.log(res);
        this.songLists=res.data.result
      })
      .catch(function(error) {
        console.log(error);
      });
    },
    selectMV(){
      this.$axios({
      method: "get",
      url: this.GLOBAL.baseUrl + "/personalized/mv"
    })
      .then(res => {
        console.log(res.data);
        this.MVs=res.data.result
      })
      .catch(function(error) {
        console.log(error);
      });
    },
    selectRadio(){
      this.$axios({
      method: "get",
      url: this.GLOBAL.baseUrl + "/personalized/djprogram"
    })
      .then(res => {
        console.log(res.data);
        this.radios=res.data.result
      })
      .catch(function(error) {
        console.log(error);
      });
    }
  },
  computed: {}
}
</script>

<style scoped lang="scss">
.bg{
  height: 550px;
}
.icon{
  font-size: 20px;
  margin-top: 1%;
  margin-right: 2%;
}
.avatar{
  width: 25%;
}
.avatar1{
    width: 40%;
}
.card{
  width: 100px;
  margin-left: 15px;
}
</style>
