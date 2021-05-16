<template>
  <div class="login-container">
    <div class="login_form">
      <el-form
        :model="user"
        status-icon
        ref="user"
        label-position="left"
        label-width="0px"
        class="demo-ruleForm login-page"
      >
        <h2 class="title"><img src="../assets/logo.svg" class="logo">环保应急管理系统登录</h2>
        <el-form-item prop="username">
          <el-input
            autofocus
            type="text"
            v-model="user.username"
            placeholder="用户名"
            @keyup.enter.native="submit()"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            v-model="user.password"
            placeholder="密码"
            @keyup.enter.native="submit()"
          ></el-input>
        </el-form-item>
        <el-form-item style="width:100%; margin-top: 50px">
          <el-button type="primary" style="width:100%;" @click="submit">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        username: "",
        password: ""
      },
      permisson: "",
      url: '',
      urlList: [],
      timer: null
    };
  },
  beforeCreate() {
    // document.querySelector('body').setAttribute('style', 'margin = 0;')
  },
  methods: {
    submit() {
      sessionStorage.setItem("user", this.user.username);
      const loading = this.$loading({
        lock: true,
        target: document.querySelector(".div1")
      });
      //设置登陆延迟
      setTimeout(() => {
        loading.close();
        this.$router.push({ path: "/home-admin/initial" });
        this.$message({
          message: "登陆成功！",
          type: "success"
        });
      }, 2000);
    }
  }
};
</script>

<style scoped>
.login-container {
  width: 100%;
  height: 100%;
  background-image: url("../assets/bird.jpg");
  background-size: 100% 100%;
  position: fixed;
}
.login-page {
  -webkit-border-radius: 15px;
  border-radius: 20px;
  margin: 180px auto;
  width: 350px;
  padding: 55px 35px 45px;
  background: #99a9bf;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 20px #cac6c6;
  filter:alpha(Opacity=85);
  -moz-opacity:0.75;
  opacity: 0.75;
}
.title {
  text-align: center;
  margin-bottom: 50px;
}
.logo {
  width: 35px;
  vertical-align: middle;
}
</style>
