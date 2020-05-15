<template>
  <div>
    <van-nav-bar title="云音乐" left-arrow>
      <template #left>
        <van-icon name="bars" @click="showPopup" size="18" />
      </template>
      <template #right>
        <van-icon name="search" size="18" />
      </template>
    </van-nav-bar>
<van-tabs v-model="activeName">
  <van-tab title="推荐" name="a"><Recommend></Recommend></van-tab>
  <van-tab title="排行榜" name="b">排行榜</van-tab>
  <van-tab title="歌手" name="c">歌手</van-tab>
</van-tabs>
    <van-popup v-model="show" position="left" :style="{ height: '100%',width: '80%' }" >
        <Person></Person>
    </van-popup>
  </div>
</template>

<script>
export default {
  name: "Nav",
  data() {
    return {
        activeName: 'a',
      show: false
    };
  },
  components: {
      Person: require('../components/Person').default,
      Recommend: require('../components/Recommend').default
  },
  created() {
  },
  mounted() {},
  methods: {
    showPopup() {
      this.show = true;
    }
  },
  computed: {}
};
</script>
<style scoped>
</style>
