<template>
  <div class="header" style="display: inline-block;">
    <el-col :span="18">
      <div class="glowIn" style="vertical-align: middle;">
        <img class="logo" src="../../assets/logo.svg" alt="图片不见啦"/>
        环保应急管理系统
      </div>
    </el-col>
    <el-col :span="6">
      <div class="user-info">
        <el-dropdown style="float: right" @command="handleCommand">
          <span class="el-dropdown-link">
            <el-avatar icon="el-icon-user-solid" style="margin-top: 10px" size="large" :src="user.icon" :key="user.icon"></el-avatar><i class="el-icon-arrow-down el-icon--right"></i>
           </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="logout" v-text="user.identity + ' - ' + user.username" disabled="true" style="color: #364766"></el-dropdown-item>
            <el-tooltip content="点我退出" placement="bottom" effect="light">
              <el-dropdown-item command="logout" icon="el-icon-warning" divided="true">退出登录</el-dropdown-item>
            </el-tooltip>
          </el-dropdown-menu>
          </el-dropdown>
      </div>
    </el-col>
  </div>
</template>

<script>
export default {
  data() {
    return {
      img_src: "../../assets/logo.svg",
      user: {
        username: "",
        permission: "",
        identit: "",
        icon: ""
      }
    }
  },
  beforeCreate() {
    // document.querySelector('body').setAttribute('style', 'margin = 0;')
  },
  created() {
    this.user.username = sessionStorage.getItem("username");
    this.user.identity = sessionStorage.getItem("user_identity")
    this.user.permission = sessionStorage.getItem("permission");
    if (this.user.username === "admin") {
      this.user.icon = "https://img-blog.csdnimg.cn/20210519010649226.jpeg";
    } else if (this.user.username === "cmd") {
      this.user.icon = "https://img-blog.csdnimg.cn/20210519010649216.jpg";
    } else if (this.user.username === "expert") {
      this.user.icon = "https://img-blog.csdnimg.cn/20210519010649211.jpg";
    } else if (this.user.username === "stuff") {
      this.user.icon = "https://img-blog.csdnimg.cn/20210519010649197.jpg";
    } else {
      this.user.icon = "../../assets/logo.svg";
    }
  },
  methods: {
    handleCommand(command) {
      if (command === 'logout') {
        this.$confirm('确认退出吗?', '提示', {}).then(() => {
          sessionStorage.removeItem('user');
          this.$router.push('/login');
          this.$message({
            message: '注销成功！',
            type: 'success'
          });
        })
      }
    }
  }
}
</script>

<style scoped>
.header {
  position: relative;
  box-sizing: border-box;
  padding-left: 50px;
  width: 100%;
  height: 70px;
  font-size: 22px;
  line-height: 70px;
  color: #fff;
  background: linear-gradient(to top right, #d3dce6, #e5e9f2, #99a9bf);
  margin: 0;
  filter: alpha(Opacity=85);
  -moz-opacity: 0.75;
  opacity: 0.75;
}
.user-info {
  float: right;
  padding-right: 50px;
  font-size: 16px;
  color: #fff;
}
.user-info .user-logo {
  position: absolute;
  left: 0;
  top: 15px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.el-dropdown-menu__item {
  text-align: center;
}
.glowIn {
  color: #364766;
  font-size: 30px;
  font-weight: bolder;
  animation: glow-in 0.8s both;
  height: 50px;
}
@keyframes glow-in {
  from {
    opacity: 0;
  }
  65% {
    opacity: 1;
    text-shadow: 0 0 25px white;
  }
  75% {
    opacity: 1;
  }
  to {
    opacity: 0.7;
  }
}
.logo {
  width: 35px;
  vertical-align: middle;
}
</style>
