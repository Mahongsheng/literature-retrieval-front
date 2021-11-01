<template>
  <div id="nav">
    <el-menu
        :default-active="$router.path"
        router
        class="el-menu-demo"
        mode="horizontal"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        @select="handleSelect"
    >
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
  <router-view/>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  setup() {
    // const activeIndex = ref('1')
    const handleSelect = (key, keyPath) => {
      console.log(key, keyPath)
    }
    return {
      handleSelect,
    }
  },
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.el-main{
  width: 100%;height: 100%;text-align: center;background-color: rgba(251,252,252,1);
  padding:0;
}

#nav {
  /*padding: 30px;*/
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #0000ff
;
}
</style>
