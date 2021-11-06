<template>
  <div class="home">
    <img src="./../assets/文献管理系统.png" alt="" height="160" width="600">
    <p></p><p></p>
    <el-popover :visible="advancedSearchVisible" placement="bottom" :width="300">
      <div style="margin: 0">
        <el-form label-width="100px">
          <el-form-item label="检索词：" required>
            <el-input
                size="small"
                v-model="this.advancedSearch.retrievalWord"
                placeholder="多个检索词以逗号，分隔"
                clearable
            >
            </el-input>
          </el-form-item>
          <el-form-item label="检索类型：" required>
            <el-select size="small" v-model="this.advancedSearch.retrievalWordType" placeholder="请选择检索类型">
              <el-option
                  v-for="item in retrievalWordTypeOptions"
                  :key="item.value"
                  :value="item.value"
                  :label="item.label">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="作 者：">
            <el-input
                size="small"
                v-model="this.advancedSearch.author"
                clearable
            >
            </el-input>
          </el-form-item>
          <el-form-item label="单 位：">
            <el-input
                size="small"
                v-model="this.advancedSearch.organization"
                clearable
            >
            </el-input>
          </el-form-item>
          <el-form-item label="文献来源：">
            <el-input
                size="small"
                v-model="this.advancedSearch.origin"
                clearable
            >
            </el-input>
          </el-form-item>
          <el-form-item label="发表时间：">
            <el-date-picker
                size="small"
                v-model="this.advancedSearch.publicationTime"
                type="date"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                style="width: auto">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="文献类型：">
            <el-select size="small" v-model="this.advancedSearch.literatureType" placeholder="请选择文献类型">
              <el-option
                  v-for="item in literatureTypeOptions"
                  :key="item.value"
                  :value="item.value"
                  :label="item.label">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div align="center">
          <el-button type="primary" size="mini" @click="mysqlSearch()" :icon="Search">
            MySQL检索
          </el-button>
          <el-button type="primary" size="mini" @click="elasticsearchSearch()" :icon="Search">
            Elasticsearch检索
          </el-button>
        </div>
      </div>
      <template #reference>
        <el-button plain @click="advancedSearchVisible = !advancedSearchVisible">
          <span style="color:#1890ff">高级检索</span>
        </el-button>
      </template>
    </el-popover>
    <span>&nbsp;</span>
    <el-input
        style="width: 300px"
        v-model="this.retrievalWord"
        clearable>
    </el-input>
    <span>&nbsp;&nbsp;&nbsp;</span>
    <el-button :icon="Search" circle type="primary" @click="search()"></el-button>
  </div>
</template>

<script>

import { Search } from '@element-plus/icons'
export default {
  data() {
    return {
      Search,
      advancedSearchVisible: false,
      retrievalWord: "",
      advancedSearch: {
        retrievalWord: "",
        retrievalWordType: "",
        author: "",
        organization: "",
        origin: "",
        publicationTime: "",
        literatureType: ""
      },
      retrievalWordTypeOptions: [{
        value: "0",
        label: '包含全部检索词'
      }, {
        value: "1",
        label: '包含全部精确检索词'
      }, {
        value: "2",
        label: '包含至少一个检索词'
      }, {
        value: "3",
        label: '不包含检索词'
      }],
      literatureTypeOptions: [{
        value: "期刊",
        label: "期刊"
      }, {
        value: "会议",
        label: "会议"
      }]
    }
  },
  methods: {
    mysqlSearch() {
      this.$router.push({
        path:'/search',
        query:{
          retrievalWord: this.advancedSearch.retrievalWord,
          retrievalWordType: this.advancedSearch.retrievalWordType,
          author: this.advancedSearch.author,
          organization: this.advancedSearch.organization,
          origin: this.advancedSearch.origin,
          publicationTime: this.advancedSearch.publicationTime,
          literatureType: this.advancedSearch.literatureType,
          type: "MySQL"
        }
      })
    },
    elasticsearchSearch() {
      this.$router.push({
        path:'/search',
        query:{
          retrievalWord: this.advancedSearch.retrievalWord,
          retrievalWordType: this.advancedSearch.retrievalWordType,
          author: this.advancedSearch.author,
          organization: this.advancedSearch.organization,
          origin: this.advancedSearch.origin,
          publicationTime: this.advancedSearch.publicationTime,
          literatureType: this.advancedSearch.literatureType,
          type: "Elasticsearch"
        }
      })
    },
    search() {
      this.$router.push({
        path:'/search',
        query:{
          retrievalWord: this.retrievalWord,
          retrievalWordType: "0",
          author: "",
          organization: "",
          origin: "",
          publicationTime: "",
          literatureType: "",
          type: "MySQL"
        }
      })
    }
  }
}

</script>

<style scoped>
.home{
  padding: 80px 0 0 0;
}
.el-form-item {margin-bottom: 5px;}
</style>
