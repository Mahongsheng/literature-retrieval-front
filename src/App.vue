<template>
  <div id="nav">
    <el-menu
      :default-active="$route.path"
      router
      class="el-menu-demo"
      mode="horizontal"
      background-color="#606266"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item>文献管理系统</el-menu-item>
      <el-menu-item index="/">首 页</el-menu-item>
      <el-menu-item index="/search">检索文献</el-menu-item>
      <el-menu-item index="/add">添加文献</el-menu-item>
    </el-menu>

    <!--    <el-button>-->
    <!--      <router-link to="/">检索文献</router-link>-->
    <!--    </el-button>-->
    <!--    <el-button>-->
    <!--      <router-link to="/add">添加文献</router-link>-->
    <!--    </el-button>-->
  </div>
  <router-view />
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.el-main {
  width: 100%;
  height: 100%;
  text-align: center;
  background-color: rgba(251, 252, 252, 1);
  padding: 0;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #0000ff;
}
</style>
