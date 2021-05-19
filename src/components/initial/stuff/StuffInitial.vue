<template>
  <el-container class="container" style="width:100%">
    <div class="whole">
      <h1 style="color: #364766; font-size: 30px">工作人员子系统介绍</h1>
      <el-row :span="24" :gutter="20">
        <el-col :span="8" class="block">
          <strong>整个系统几乎所有的功能都集中在工作人员身上。<br><br>子功能包括：</strong>
          <ul>
            <li>
              事件维护
              <ul>
                <li>
                  紧急事件管理
                </li>
              </ul>
            </li>
            <li>
              物资信息维护
              <ul>
                <li>
                  物资信息管理
                </li>
                <li>
                  物资位置信息管理
                </li>
              </ul>
            </li>
            <li>
              流程信息维护
              <ul>
                <li>
                  流程信息管理
                </li>
              </ul>
            </li>
            <li>
              风险企业信息维护
              <ul>
                <li>
                  风险企业信息管理
                </li>
              </ul>
            </li>
            <li>
              城市信息维护
              <ul>
                <li>
                  城市信息管理
                </li>
              </ul>
            </li>
            <li>
              接报信息维护
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
  name: "stuff_initial",
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
