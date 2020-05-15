<template>
  <div class="bg">
    <div>
      <p>音乐系统登录</p>
      <van-field
        label="手机号"
        clickable
        :value="phoneForm.phoneNumber"
        @touchstart.native.stop="show = true"
        class="cc-mtop size"
      />
      <van-field
        type="password"
        label="密码"
        clickable
        :value="passwordInput"
        @touchstart.native.stop="show1 = true"
        class="size cc-mtop"
      />
      <div class="cc-df-between cc-mtop">
          <div class="cc-df">
              
          </div>
          <router-link to="/registered" ><p style="color:blue">注册新用户</p></router-link>
      </div>
      <van-button type="info" class="btn-size" @click="submit()">登录</van-button>
    </div>

    <van-number-keyboard
      v-model="phoneForm.phoneNumber"
      :show="show"
      :maxlength="11"
      @blur="show = false"
    />
    <van-number-keyboard
      v-model="passwordInput"
      :show="show1"
      @blur="show1 = false"
    />
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      checked: true,
      istrue: true,
      show: false,
      show1: false,
      value: true,
      users: {},
      passwordInput: "",
      phoneForm: {
        phoneNumber: "",
        tips: null
      },
      schema: {
        phoneNumber: [
          { required: true, error: "手机号不能为空" },
          {
            regex: /^1[3|4|5|6|7|8][0-9]{9}$/,
            error: "手机号格式不对"
          }
        ]
      }
    };
  },
  components: {},
  created() {
    // console.log(this.validate(this.schema, this.phoneForm));
  },
  mounted() {},
  methods: {
    validate(schema, values) {
      this.phoneForm.tips = null;
      const valArr = schema;
      for (const field in schema) {
        if (Object.prototype.hasOwnProperty.call(schema, field)) {
          for (const key of schema[field]) {
            if (key.required) {
              if (!values[field]) {
                valArr.tips = key.error;
                this.phoneForm.tips = valArr.tips;
                console.log(valArr.tips);
                return false;
              }
            } else if (key.regex) {
              if (!new RegExp(key.regex).test(values[field])) {
                valArr.tips = key.error;
                this.phoneForm.tips = valArr.tips;
                console.log(valArr.tips);
                return false;
              }
            }
          }
        }
      }
      return true;
    },
    submit() {
      this.validate(this.schema, this.phoneForm);
      if (this.phoneForm.tips == null) {
           this.$axios({
        method: "get",
        url:
          this.GLOBAL.baseUrl +
          "/login/cellphone?phone=" +
          this.phoneForm.phoneNumber +
          "&password=" +
          this.passwordInput
        // data: {
        //   currentPage: this.page,
        //   pageSize: 8
        // },
        //  headers:{
        //   'Authorization': localStorage.getItem('token'),
        //   'id' : JSON.parse(localStorage.getItem('user')).id
        //   }
      })
        .then(res => {
            console.log(res)
          if (res.data.code == 200) {
            localStorage.setItem("token", res.data.token);
            this.$store.commit("setToken", res.data.token);
            localStorage.setItem("user", JSON.stringify( res.data.profile));
            this.$store.commit("setUser",  res.data.profile);
            this.$notify({ type: "success", message: "登录成功" });
            this.$router.push("/");
          }
          if (res.data.code == 502) {
            this.$notify({ type: "warning", message: "密码错误" });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
      }
      if (this.phoneForm.tips == "手机号不能为空") {
          this.$notify({ type: "warning", message: "手机号不能为空" });
      }
      if (this.phoneForm.tips == "手机号格式不对") {
          this.$notify({ type: "warning", message: "手机号格式不对" });
      }
     
    }
  },
  computed: {}
};
</script>

<style scoped lang="scss">
.verify {
  width: 90px;
  height: 40px;
  margin-top: 7px;
}
.bg {
  background: -webkit-linear-gradient(to bottom, #7bc6cc, #be93c5);
  background: linear-gradient(
    to bottom,
    #7bc6cc,
    #be93c5
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  opacity: 0.8;
  height: 100vh;
  display: flex;
  justify-content: center;
}
.size {
  width: 350px;
  height: 50px;
}
.btn-size {
  width: 350px;
  height: 40px;
  margin-top: 20px;
}
</style>
