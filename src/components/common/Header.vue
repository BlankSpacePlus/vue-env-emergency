<template>
  <div class="header" style="display: inline-block;">
    <el-col :span="18">
      <div class="glowIn" style="vertical-align: middle;">环保应急管理系统</div>
    </el-col>
    <el-col :span="6">
      <div class="user-info">
        <el-dropdown trigger="click" @command="handleCommand">
          <span class="el-dropdown-link" style="color: #364766;"><img src="../../assets/logo.svg" class="logo" ></span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="logout" v-text="'用户： ' + user.username + '管理员'" disabled="true" style="color: #364766"></el-dropdown-item>
            <el-dropdown-item command="logout" divided="true">退出登陆</el-dropdown-item>
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
        permission: ""
      }
    }
  },
  beforeCreate() {
    // document.querySelector('body').setAttribute('style', 'margin = 0;')
  },
  created() {
    this.user.username = sessionStorage.getItem("user");
    this.user.permission = sessionStorage.getItem("permission");
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
  font-font-weight: bolder;
  animation: glow-in 0.8s both;
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
  margin-left: 10px;
}
</style>
