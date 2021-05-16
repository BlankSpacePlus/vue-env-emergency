<template>
  <div class="sidebar">
    <el-menu :default-active="$route.path" class="el-menu-vertical-demo" unique-opened router @select="handleSelect">
      <el-submenu index="1" class="submenu">
        <template slot="title"><i class="el-icon-menu"></i>接报维护</template>
        <el-menu-item index="/home-expert/alert">接报信息管理</el-menu-item>
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
