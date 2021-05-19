<template>
  <el-container class="container" style="width:100%">
    <div class="whole">
      <h1 style="color: #364766; font-size: 30px">指挥人员子系统介绍</h1>
      <el-row :span="24" :gutter="20">
        <el-col :span="8" class="block">
          <strong>指挥人员与工作人员共享接报信息，只是不能删改这些信息而已。<br>指挥人员处理接报或者向专家上报紧急情况。<br><br>子功能包括：</strong>
          <ul>
            <li>
              接报维护
              <ul>
                <li>
                  接报信息管理
                </li>
              </ul>
            </li>
          </ul>
        </el-col>
      </el-row>
    </div>
    <router-view/>
  </el-container>
</template>

<script>
export default {
  name: "commander_initial",
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
