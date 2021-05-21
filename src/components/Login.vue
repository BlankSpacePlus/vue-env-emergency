<template>
  <div class="login-container">
    <div class="login_box">
      <router-link to="/auth">
        <div class="login_close"></div>
      </router-link>
      <div class="login_panel">
        <div class="login_title">
          <img src="../assets/大白菜猫.jpeg" alt="图片消失啦">
          <p class="p1">环保应急管理系统</p>
          <p class="p2">请输入账号密码进行安全登录</p>
        </div>
        <label style="margin-top: 35px">账号：</label>
        <el-input placeholder="请输入用户名" v-model="user.username" @keyup.enter.native="submit()"></el-input>
        <label>密码：</label>
        <el-input placeholder="请输入密码" v-model="user.password" show-password @keyup.enter.native="submit()"></el-input>
        <el-tooltip content="点我登录" placement="bottom" effect="light">
          <input class="bt" @click="submit" type="submit" value="登录">
        </el-tooltip>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        username: "",
        password: "",
        identity: "",
        icon: "",
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
      sessionStorage.setItem("username", this.user.username);
      if (this.user.username === "admin" && this.user.password === "admin") {
        const loading = this.$loading({
          lock: true,
          target: document.querySelector(".div1")
        });
        this.user.identity = "管理员";
        sessionStorage.setItem("user_identity", this.user.identity);
        setTimeout(() => {
          loading.close();
          this.$router.push({ path: "/home-admin/initial" });
          this.$message({
            message: "登陆成功！",
            type: "success"
          });
        }, 100);
      } else if (this.user.username === "cmd" && this.user.password === "cmd") {
        const loading = this.$loading({
          lock: true,
          target: document.querySelector(".div1")
        });
        this.user.identity = "指挥人员";
        sessionStorage.setItem("user_identity", this.user.identity);
        setTimeout(() => {
          loading.close();
          this.$router.push({ path: "/home-commander/initial" });
          this.$message({
            message: "登陆成功！",
            type: "success"
          });
        }, 100);
      } else if (this.user.username === "expert" && this.user.password === "expert") {
        const loading = this.$loading({
          lock: true,
          target: document.querySelector(".div1")
        });
        this.user.identity = "专家";
        sessionStorage.setItem("user_identity", this.user.identity);
        setTimeout(() => {
          loading.close();
          this.$router.push({ path: "/home-expert/initial" });
          this.$message({
            message: "登陆成功！",
            type: "success"
          });
        }, 100);
      } else if (this.user.username === "staff" && this.user.password === "staff") {
        const loading = this.$loading({
          lock: true,
          target: document.querySelector(".div1")
        });
        this.user.identity = "工作人员";
        sessionStorage.setItem("user_identity", this.user.identity);
        setTimeout(() => {
          loading.close();
          this.$router.push({ path: "/home-staff/initial" });
          this.$message({
            message: "登陆成功！",
            type: "success"
          });
        }, 100);
      } else {
        this.$message({
          message: '用户名或密码错误！',
          type: 'error'
        });
      }
    }
  }
};
</script>

<style scoped>
.login-container {
  width: 100%;
  height: 100%;
  background-image: url("../assets/background.jpg");
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
.login_box {
  z-index: 99;
  position: absolute;
  width: 380px;
  height: 540px;
  top: 50%;
  left: 50%;
  margin-left: -190px;
  margin-top: -270px;
  border-radius: 6px;
  background-color: #fff;
  box-shadow: 0 2px 10px #999;
}
.login_close {
  position: absolute;
  top: 0;
  right: 0;
  width: 64px;
  height: 64px;
  background: url(../assets/qrcode-change.png) no-repeat right top;
  background-size: 100% 100%;
  border-top-right-radius: 5px;
  cursor: pointer;
  z-index: 99;
}
.login_panel {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 280px;
  height: 540px;
  padding: 0 55px;
  transform: translate(-50%, -50%);
  border-radius: 6px;
  overflow: hidden;
}
.login_panel .login_title {
  text-align: center;
}
.login_panel .login_title img {
  margin-top: 30px;
  height: 70px;
  width: 70px;
  border-radius: 50%;
  padding: 10px;
  border: 3px solid #d7e8fc;
}
.p1 {
  margin-top: 30px;
  color: #353535;
  font-size: 30px;
}
.p2 {
  margin-top: 20px;
  color: #353535;
  font-size: 20px;
}
.login_panel label {
  display: block;
  font-size: 12px;
  line-height: 18px;
  color: #a9a8a5;
  margin-top: 10px;
}
.login_panel input {
  display: inline;
  height: 42px;
  padding: 0 5%;
  line-height: 42px;
  font-size: 14px;
  color: #333333;
  border-radius: 4px;
  outline: 0;
  border: 0;
  width: 90%;
  background: #d7e8fc;
}
.login_panel /deep/ .el-input__inner {
  color: #333333;
  background-color: #d7e8fc;
}
/* 按钮 */
.login_panel .bt {
  margin-top: 35px;
  width: 100%;
  color: #ffffff;
  background: #379df6;
  cursor: pointer;
}
.login_panel .bt:hover {
  background-color: #2f86f6;
}
</style>
