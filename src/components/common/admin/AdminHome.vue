<template>
  <div class="wrapper">
    <v-head></v-head>
    <el-container class="container" style="width:100%">
      <el-aside width="220px"><v-sidebar></v-sidebar></el-aside>
      <el-main class="main">
        <router-view/>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import vHead from '../Header';
import vSidebar from './AdminSidebar';
export default {
  components:{
    vHead, vSidebar
  },
  created() {
  }
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
  height: 250px;
  padding: 15px 15px 15px;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 20px #cac6c6;
  background: #99a9bf linear-gradient(to right, #99a9bf, #d3dce6);
  margin: 20px;
}
</style>
