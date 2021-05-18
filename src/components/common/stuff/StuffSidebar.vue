<template>
  <div class="sidebar">
    <el-menu :default-active="$route.path" class="el-menu-vertical-demo" unique-opened router @select="handleSelect">
      <el-submenu index="1" class="submenu">
        <template slot="title"><i class="el-icon-menu"></i>事件维护</template>
        <el-menu-item index="/home-stuff/emergency">紧急事件管理</el-menu-item>
      </el-submenu>
      <el-submenu index="2" class="submenu">
        <template slot="title"><i class="el-icon-menu"></i>物资信息维护</template>
        <el-menu-item index="/home-stuff/material">物资信息管理</el-menu-item>
        <el-menu-item index="/home-stuff/material-location">物资位置信息管理</el-menu-item>
      </el-submenu>
      <el-submenu index="3" class="submenu">
        <template slot="title"><i class="el-icon-menu"></i>流程信息维护</template>
        <el-menu-item index="/home-stuff/process">流程信息管理</el-menu-item>
      </el-submenu>
      <el-submenu index="4" class="submenu">
        <template slot="title"><i class="el-icon-menu"></i>风险企业信息维护</template>
        <el-menu-item index="/home-stuff/company">风险企业信息管理</el-menu-item>
      </el-submenu>
      <el-submenu index="5" class="submenu">
        <template slot="title"><i class="el-icon-menu"></i>城市信息维护</template>
        <el-menu-item index="/home-stuff/city">城市信息管理</el-menu-item>
      </el-submenu>
      <el-submenu index="6" class="submenu">
        <template slot="title"><i class="el-icon-menu"></i>接报信息维护</template>
        <el-menu-item index="/home-stuff/alert">接报信息管理</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {}
};
</script>

<style scoped>
.sidebar {
  display: block;
  position: absolute;
  width: 220px;
  left: 0;
  top: 70px;
  bottom: 0;
}
.el-menu-vertical-demo {
  background: #d3dce6;
  background: white;
  filter:alpha(Opacity=85);
  -moz-opacity:0.75;
  opacity: 0.75;
}
.sidebar>ul {
  height: 100%;
}
.submenu {
}
</style>
