<template>
  <el-container class="container" style="width:100%">
    <div class="whole">
      <h1 style="color: #364766; font-size: 30px">专家子系统介绍</h1>
      <el-row :span="24" :gutter="20">
        <el-col :span="8" class="block">
        </el-col>
      </el-row>
    </div>
    <router-view/>
  </el-container>
</template>

<script>
export default {
  name: "expert_initial",
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
  background: #99a9bf;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 20px #cac6c6;
  background-image: linear-gradient(to right, #99a9bf, #d3dce6);
  margin: 20px;
}
</style>
