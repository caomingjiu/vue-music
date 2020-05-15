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
        class="cc-mtop size"
        v-model="phoneForm.sms"
        center
        clearable
        label="短信验证码"
        placeholder="请输入短信验证码"
      >
        <template #button>
          <van-button size="small" type="primary" @click="checkPhone()">发送验证码</van-button>
        </template>
      </van-field>
      <van-field v-model="phoneForm.nickname" label="昵称" class="cc-mtop size"/>
      <van-field
        type="password"
        label="密码"
        clickable
        :value="phoneForm.passwordInput"
        @touchstart.native.stop="show1 = true"
        class="size cc-mtop"
      />
      <div class="cc-df-between cc-mtop">
        <div class="cc-df"></div>
        <router-link to="/login">
          <p style="color:blue">返回登录</p>
        </router-link>
      </div>
      <van-button type="info" class="btn-size" @click="msg()">注册</van-button>
    </div>

    <van-number-keyboard
      v-model="phoneForm.phoneNumber"
      :show="show"
      :maxlength="11"
      @blur="show = false"
    />
    <van-number-keyboard v-model="phoneForm.passwordInput" :show="show1" @blur="show1 = false" />
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
        text:'',
      checked: true,
      istrue: true,
      show: false,
      show1: false,
      value: true,
      users: {},
      phoneForm: {
        phoneNumber: "",
        passwordInput: "",
        sms: "",
        nickname: "",
        tips: null
      },
      schema: {
        phoneNumber: [
          { required: true, error: "手机号不能为空" },
          {
            regex: /^1[3|4|5|6|7|8][0-9]{9}$/,
            error: "手机号格式不对"
          }
        ],
        passwordInput: [{ required: true, error: "密码不能为空" }],
        sms: [{ required: true, error: "验证码不能为空" }],
        nickname: [{ required: true, error: "昵称不能为空" }]
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
    register() {
      this.$axios({
        method: "get",
        url:
          this.GLOBAL.baseUrl +
          "/register/cellphone?phone=" +
          this.phoneForm.phoneNumber +
          "&password=" +
          this.phoneForm.passwordInput +
          "&captcha=" +
          this.phoneForm.sms +
          "&nickname=" +
          this.phoneForm.nickname
      })
        .then(res => {
          console.log(res);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    checkPhone() {
      this.$axios({
        method: "get",
        url:
          this.GLOBAL.baseUrl +
          "/cellphone/existence/check?phone=" +
          this.phoneForm.phoneNumber
      })
        .then(res => {
          console.log(res.data.exist);
          if (res.data.exist == -1) {
            this.sendMessage();
          }
          if (res.data.exist == 1) {
            this.$notify({ type: "warning", message: "手机号已被注册" });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    msg() {
      this.$axios({
        method: "get",
        url:
          this.GLOBAL.baseUrl +
          "/captcha/verify?phone=" +
          this.phoneForm.phoneNumber +
          "&captcha=" +
          this.phoneForm.sms
      })
        .then(res => {
          console.log(res.data.code);
          if(res.data.code==200){
              this.register()
          }
          if (this.phoneForm.tips == "手机号不能为空") {
            this.$notify({ type: "warning", message: "手机号不能为空" });
          }
          if (this.phoneForm.tips == "密码不能为空") {
            this.$notify({ type: "warning", message: "手机号不能为空" });
          }
          if (this.phoneForm.tips == "昵称不能为空") {
            this.$notify({ type: "warning", message: "手机号不能为空" });
          }
          if (this.phoneForm.tips == "验证码不能为空") {
            this.$notify({ type: "warning", message: "手机号不能为空" });
          }
          if (this.phoneForm.tips == "手机号格式不对") {
            this.$notify({ type: "warning", message: "手机号格式不对" });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    sendMessage() {
      this.$axios({
        method: "get",
        url:
          this.GLOBAL.baseUrl +
          "/captcha/sent?phone=" +
          this.phoneForm.phoneNumber
      })
        .then(res => {
          console.log(res);
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
