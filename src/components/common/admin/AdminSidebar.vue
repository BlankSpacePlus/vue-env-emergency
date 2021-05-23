<template>
  <div class="sidebar">
    <el-menu :default-active="$route.path" class="el-menu-vertical-demo" unique-opened router @open="handleOpen" @close="handleClose" :collapse="isCollapse">
      <el-submenu index="1" class="submenu">
        <template slot="title"><i class="el-icon-menu"></i><span>人员维护</span></template>
        <el-menu-item index="/home-admin/register"><span>用户信息管理</span></el-menu-item>
      </el-submenu>
      <el-submenu index="2" class="submenu">
        <template slot="title"><i class="el-icon-menu"></i><span>系统维护</span></template>
        <el-menu-item index="/home-admin/rate"><span>系统评分</span></el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isCollapsed: false
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    handleSelect(key, keyPath) {
      this.isCollapsed = !this.isCollapsed;
    }
  }
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
