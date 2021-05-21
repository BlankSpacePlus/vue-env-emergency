<template>
  <el-container class="container" style="width:100%">
    <el-collapse-transition>
      <div class="whole" v-show="true">
        <h1 style="color: #364766; font-size: 30px">管理员子系统介绍</h1>
        <el-row :span="24" :gutter="20">
          <el-col :span="8" class="block">
            <strong>系统管理员只做一件事，即管理用户，实际业务主要由工作人员、指挥人员和专家完成。<br><br>子功能包括：</strong>
            <ul>
              <li>
                人员维护
                <ul>
                  <li>
                    用户信息管理
                  </li>
                </ul>
              </li>
            </ul>
          </el-col>
        </el-row>
      </div>
    </el-collapse-transition>
    <router-view/>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      user: {
        username: "",
      }
    }
  },
  beforeCreate(){
    this.user.username = sessionStorage.getItem("username");
  },
}
</script>

<style scoped>
.main {
  width: 100%;
}
.whole {
  margin-left: 70px;
}
.block {
  color: #364766;
  -webkit-border-radius: 15px;
  border-radius: 20px;
  width: 400px;
  height: 100%;
  padding: 15px 15px 15px;
  background-color: #99a9bf;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 20px #cac6c6;
  background-image: linear-gradient(to right, #99a9bf, #d3dce6);
  margin: 20px;
}
</style>
