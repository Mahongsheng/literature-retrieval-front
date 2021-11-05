<template>
  <div class="Search">
    <el-row :gutter="16">
      <el-col :span="4">
        <div class="grid-content bg-purple">
          <el-collapse v-model="activeNames2">
            <el-collapse-item title="&nbsp;&nbsp;&nbsp;&nbsp;时间" name="1">
              <div class="filterBlock" style="padding: 0 0 0 15px">
                <el-radio label="1">2021年以来</el-radio>
                <p></p>
                <el-radio label="2">2020年以来</el-radio>
                <p></p>
                <el-radio label="3">2019年以来</el-radio>
                <p></p>
              </div>
            </el-collapse-item>
          </el-collapse>
        </div>
      </el-col>
      <el-col :span="19">
        <el-collapse v-model="activeNames">
          <el-collapse-item title="高级检索" name="1">
            <div class="filterBlock">
              <el-form label-width="100px">
                <el-row :gutter="5">
                  <el-col :span="6">
                    <el-form-item label="检索词：" required>
                      <el-input
                          size="small"
                          v-model="this.advancedSearch.retrievalWord"
                          placeholder="多个检索词以逗号，分隔"
                          clearable>
                      </el-input>
                    </el-form-item>
                    <el-form-item label="文献来源：">
                      <el-input
                          size="small"
                          v-model="this.advancedSearch.origin"
                          clearable>
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
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
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="作 者：">
                      <el-input
                          size="small"
                          v-model="this.advancedSearch.author"
                          clearable>
                      </el-input>
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
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="单 位：">
                      <el-input
                          size="small"
                          v-model="this.advancedSearch.organization"
                          clearable>
                      </el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </div>
            <div align="center">
              <el-button type="primary" size="small" @click="mysqlSearch()">
                MySQL检索
              </el-button>
              <el-button type="primary" size="small" @click="elasticsearchSearch()">
                Elasticsearch检索
              </el-button>
              <el-button size="small" @click="reset()">
                重 置
              </el-button>
            </div>
          </el-collapse-item>
        </el-collapse>
        <p></p><p></p>
        <el-table
            :data="tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)"
            v-loading="loading"
            border
            stripe
            style="width: 100%"
            :header-cell-style="{background: 'aliceblue'}">
          <el-table-column
              type="index"
              width="55"
              align="center">
          </el-table-column>
          <el-table-column
              prop="title"
              label="标 题"
              align="center"
              show-overflow-tooltip>
          </el-table-column>
          <el-table-column
              prop="author"
              label="作 者"
              width="200"
              align="center"
              show-overflow-tooltip>
          </el-table-column>
          <el-table-column
              prop="organization"
              label="单 位"
              align="center"
              show-overflow-tooltip>
          </el-table-column>
          <el-table-column
              prop="publicationTime"
              label="发表时间"
              align="center"
              width="140">
          </el-table-column>
          <el-table-column
              align="center"
              width="110"
              label="操 作">
            <template v-slot="scope">
              <el-button type="primary" size="small" @click="details(scope.row)">查看详情</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination">
          <el-pagination
              @size-change="sizeChange"
              @current-change="currentChange"
              :current-page="currentPage"
              :page-sizes="[10, 25, 50, 100]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="tableData.length">
          </el-pagination>
        </div>
      </el-col>
      <el-col :span="1">
        <el-backtop/>
      </el-col>
    </el-row>
    <el-dialog
        :title="this.detailData.title"
        width="48%"
        v-model="dialogVisible">
      <div class="dialogBlock">
        <el-form label-width="100px">
          <el-row :gutter="5">
            <el-col :span="12">
              <el-form-item label="作 者：">
                <el-input
                    size="small"
                    v-model="this.detailData.author"
                    readonly
                >
                </el-input>
              </el-form-item>
              <el-form-item label="文献来源：">
                <el-input
                    size="small"
                    v-model="this.detailData.origin"
                    readonly
                >
                </el-input>
              </el-form-item>
              <el-form-item label="关键词：">
                <el-input
                    size="small"
                    v-model="this.detailData.keyword"
                    readonly
                >
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="单 位：">
                <el-input
                    size="small"
                    v-model="this.detailData.organization"
                    readonly
                >
                </el-input>
              </el-form-item>
              <el-form-item label="发表时间：">
                <el-date-picker
                    size="small"
                    v-model="this.detailData.publicationTime"
                    type="date"
                    format="YYYY-MM-DD"
                    value-format="YYYY-MM-DD"
                    style="width: auto"
                    readonly>
                </el-date-picker>
              </el-form-item>
              <el-form-item label="文献类型：">
                <el-input
                    size="small"
                    v-model="this.detailData.literatureType"
                    readonly
                >
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="摘 要：">
            <el-input
                type="textarea"
                :autosize="{ minRows: 5}"
                v-model="this.detailData.literatureAbstract"
                readonly
            >
            </el-input>
          </el-form-item>
          <el-form-item label="相似文献：">
            <el-table
                :data="similarData"
                v-loading="similarLoading"
                stripe
                style="width: 100%"
                :show-header="false">
              <el-table-column
                  type="index"
                  width="55"
                  align="center">
              </el-table-column>
              <el-table-column
                  prop="title"
                  align="center"
                  show-overflow-tooltip>
              </el-table-column>
              <el-table-column
                  align="center"
                  width="110">
                <template v-slot="scope">
                  <el-button type="primary" size="small" @click="details(scope.row)">查看详情</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>

import axios from 'axios'

export default {
  name: "Search",
  data() {
    return {
      activeNames: "1",
      activeNames2: "1",
      dialogVisible: false,
      retrievalWord: "",
      tableData: [],
      currentPage: 1,
      pageSize: 10,
      loading: false,
      similarData: [],
      similarPage: 1,
      similarSize: 5,
      similarLoading: false,
      advancedSearch: {
        retrievalWord: "",
        retrievalWordType: "",
        author: "",
        organization: "",
        origin: "",
        publicationTime: "",
        literatureType: ""
      },
      detailData: {
        id: 0,
        title: "",
        author: "",
        organization: "",
        keyword: "",
        literatureAbstract: "",
        origin: "",
        publicationTime: "",
        literatureType: ""
      },
      type:"",
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
    };
  },
  methods: {
    mysqlSearch() {
      this.type = "MySQL"
      search(this, "MySQL")
    },
    elasticsearchSearch() {
      this.type = "ElasticsearchSearch"
      search(this, "ElasticsearchSearch")
    },
    reset() {
      this.advancedSearch = {
        retrievalWord: "",
        retrievalWordType: "",
        author: "",
        organization: "",
        origin: "",
        publicationTime: "",
        literatureType: ""
      }
    },
    details(data) {
      this.dialogVisible = true
      this.detailData = data
      similarSearch(this)
    },
    sizeChange: function (size) {
      this.pageSize = size;
    },
    currentChange: function(currentPage){
      this.currentPage = currentPage;
    },
  },
  mounted: function() {
  },
  created: function() {
    getParams(this)
  }
}

function getParams(that) {
  if (that.$route.query) {
    that.advancedSearch.retrievalWord = that.$route.query.retrievalWord
    that.advancedSearch.retrievalWordType = that.$route.query.retrievalWordType
    that.advancedSearch.author = that.$route.query.author
    that.advancedSearch.organization = that.$route.query.organization
    that.advancedSearch.origin = that.$route.query.origin
    that.advancedSearch.publicationTime = that.$route.query.publicationTime
    that.advancedSearch.literatureType = that.$route.query.literatureType
    that.type = that.$route.query.type
    search(that,that.type)
  }
}

function search(that, type) {
  that.loading = true
  let json = {
    retrievalWord: that.advancedSearch.retrievalWord,
    retrievalWordType: that.advancedSearch.retrievalWordType,
    author: that.advancedSearch.author,
    organization: that.advancedSearch.organization,
    origin: that.advancedSearch.origin,
    publicationTime: that.advancedSearch.publicationTime,
    literatureType: that.advancedSearch.literatureType
  }
  if (type === "MySQL") {
    axios.post("http://106.13.127.90:8900/mysql/advanced-query",json)
        .then(res=>{
          that.tableData = res.data
        })
        .catch(function(){
          alert('MySQL检索失败！')
        })
  }
  else {
    axios.post("http://106.13.127.90:8900/es/advanced-query",json)
        .then(res=>{
          that.tableData = res.data
        })
        .catch(function(){
          alert('ElasticsearchSearch检索失败！')
        })
  }
  that.loading = false
}

function similarSearch(that) {
  that.similarLoading = true
  axios.get("http://106.13.127.90:8900/es/similar-query?originKeywords=" + that.detailData.keyword + "&page=1&size=5")
      .then(res=>{
        that.similarData = res.data
      })
      .catch(function(){
        alert('相似文献检索失败！')
      })
  that.similarLoading = false
}

</script>

<style scoped>
  .Search {
    padding: 0 0 40px 0;
    /*max-height: 686px;*/
    /*overflow-y: auto;*/
  }
  .el-collapse-item__content {
    padding: 0 5px 12px 24px;
    display: block;
  }
  .filterBlock{
    display: flex;
    flex-wrap: wrap;
    padding: 0 20px 0 0;
  }

  .dialogBlock{
    max-height: 500px;
    overflow-y: auto;
    padding: 0 30px 0;
  }
  .dialogBlock::-webkit-scrollbar{
    width:5px;
    height:10px;
    /**/
  }
  .dialogBlock::-webkit-scrollbar-track{
    background: rgb(239, 239, 239);
    border-radius:2px;
  }
  .dialogBlock::-webkit-scrollbar-thumb{
    background: #bfbfbf;
    border-radius:10px;
  }
  .dialogBlock::-webkit-scrollbar-corner{
    background: #179a16;
  }

  /* 设置table行高 */
  .el-table th > .cell {
    height: 40px;
    line-height: 40px;
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* 设置table行高 */
  .el-table__row .cell {
    /*height: 45px;*/
    line-height: 45px;
    font-size: 16px;
    color: #606266;
    /*display: flex;*/
    /*align-items: center;*/
    /*justify-content: center;*/
  }

  .el-table--enable-row-transition .el-table__body td, .el-table td, .el-table th {
    padding: 0;
  }

  .el-table th.is-leaf, tr .gutter {
    background: aliceblue;
  }
  .el-collapse-item__header {
     padding: 0 0 0 24px;
     color: #000;
     font-size: 18px;
     font-weight: bold;
   }
  .pagination{
    display: flex;
    justify-content: flex-end;
    margin-top: 8px;
  }
  .el-table th.gutter{
    display: table-cell!important;
  }
  /*表格偶数行颜色*/
  .el-table--striped .el-table__body tr.el-table__row--striped td{
    background-color: #f5f5f5;
  }
  /* 设置table悬浮颜色 */
  .el-table--enable-row-hover .el-table__body tr:hover>td{
    background-color: #e7f5ff;
  }
  .el-table thead{
    color: #333333
  }
  .bg-purple {
    /*background: #d3dce6;*/
    /*min-height: 670px;*/
  }
  .el-collapse >>> .el-collapse-item__header {
    --el-collapse-header-font-size: 15
  }

</style>