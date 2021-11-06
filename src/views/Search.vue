<template>
  <div class="Search">
    <el-row :gutter="16">
      <el-col :span="4">
        <div class="grid-content bg-purple">
          <el-collapse v-model="activeNames2">
            <el-collapse-item title="时间" name="1">
              <div class="filterBlock">
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
      <el-col :span="18">
        <el-collapse v-model="activeNames">
          <el-collapse-item title="高级检索" name="1">
            <div class="filterBlock">
              <div class="filterBlockItem">
                <span>标题：</span>
                <el-input
                  size="small"
                  style="width: 240px"
                  placeholder="请输入标题"
                  prefix-icon="el-icon-search"
                >
                </el-input>
              </div>
              <div class="filterBlockItem">
                <span>作者：</span>
                <el-input
                  size="small"
                  style="width: 240px"
                  placeholder="请输入作者"
                  prefix-icon="el-icon-search"
                >
                </el-input>
              </div>
              <div class="filterBlockItem">
                <span>单位：</span>
                <el-input
                  size="small"
                  style="width: 240px"
                  placeholder="请输入单位"
                  prefix-icon="el-icon-search"
                >
                </el-input>
              </div>
            </div>
            <p></p>
            <p></p>
            <div class="filterBlockItem">
              <!--              <span>操作：</span>-->
              <el-button type="primary" size="small">搜索</el-button>
              <el-button size="small">重置条件</el-button>
            </div>
          </el-collapse-item>
        </el-collapse>
        <p></p>
        <p></p>
        <el-table
          border
          stripe
          style="width: 100%"
          :header-cell-style="{ background: 'aliceblue' }"
        >
          <el-table-column type="index" width="55" align="center">
          </el-table-column>
          <el-table-column
            prop="name"
            label="标题"
            align="center"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="uid"
            label="作者"
            width="200"
            align="center"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="workAdress"
            label="单位"
            align="center"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="startDay"
            label="发表时间"
            align="center"
            width="150"
          >
          </el-table-column>
          <el-table-column align="center" width="100" label="操作">
            <!--            <template v-slot:object="scope">-->
            <el-button type="primary" size="small">查看详情</el-button>
            <!--            </template>-->
          </el-table-column>
        </el-table>
        <!--        <div class="pagination">-->
        <!--          <el-pagination-->
        <!--              @size-change="sizeChange"-->
        <!--              @current-change="currentChange"-->
        <!--              :current-page="pageNo"-->
        <!--              :page-sizes="[10, 25, 50, 100]"-->
        <!--              :page-size="pageSize"-->
        <!--              layout="total, sizes, prev, pager, next, jumper"-->
        <!--              :total="tableDataNum">-->
        <!--          </el-pagination>-->
        <!--        </div>-->
      </el-col>
      <el-col :span="2"></el-col>
    </el-row>
    <el-dialog title="查看详情" width="60%">
      <el-descriptions
        title="基于智能微服务架构的智慧校园融合门户模型建设"
        border
      >
        <el-descriptions-item
          label="作 者"
          align="center"
          width="200px"
          label-class-name="my-label"
          content-class-name="my-content"
        >
          刘姣;薛云霞;肖琴;周君仪
        </el-descriptions-item>
        <el-descriptions-item label="单 位" align="center"
          >江苏科技大学信息化建设与管理办公室</el-descriptions-item
        >
        <el-descriptions-item label="关键词" align="center"
          >智慧校园;微服务;智能推荐;</el-descriptions-item
        >
        <el-descriptions-item label="卷 期" align="center"
          >江苏科技信息2021,38(30)</el-descriptions-item
        >
        <el-descriptions-item label="发表时间" align="center"
          >2021-10-14</el-descriptions-item
        >
        <el-descriptions-item label="文献类型" align="center"
          >期刊</el-descriptions-item
        >
        <el-descriptions-item label="摘 要" align="center"
          >信息门户是三大平台的重要组成部分,信息门户的聚合能力已无法满足现在智慧校园建设的步伐。文章以"微服务"为基础,以"智慧校园"为抓手,充分使用"5G、大数据、人工智能、云计算、智能推荐引擎"等技术的推动力,确立"一体三端九模块N应用群+统一服务入口"的智慧校园整体框架,构建全新的"互联网+"校园融合服务模型。最后,通过江苏科技大学融合门户/协同办公平台的建设实践表明:"一号申请、一站式服务、多渠道通办"为核心的融合服务体系能满足智慧校园融合门户服务师生的多元化需求,为校园信息化建设提供了有益的参考。</el-descriptions-item
        >
      </el-descriptions>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Search",
  data() {
    return {
      activeNames: "1",
      activeNames2: "1",
    };
  },
  methods: {},
  mounted: function () {
    getData();
  },
};

function getData() {
  var json = {
    retrievalWord: "微服务",
    retrievalWordType: 1,
    author: "",
    organization: "",
    origin: "",
    publicationTime: "",
    literatureType: "",
  };

  axios.post("http://106.13.127.90:8900/es/advanced-query", json);

  // eslint-disable-next-line no-undef
  // $.ajax({
  //   type: "post",
  //   url: "http://106.13.127.90:8900/es/advanced-query",
  //   data: JSON.stringify(json),//需要传递的参数
  //   dataType: "application/json",//数据响应格式
  //   success: function(data){
  //     console.log(data)
  //   }
  // });
}
</script>

<style scoped>
.Search {
  /*padding: 0 0 0 10px;*/
  /*max-height: 686px;*/
  /*overflow-y: auto;*/
}
.el-collapse-item__content {
  padding: 0 5px 12px 24px;
  display: block;
}
.filterBlock {
  display: flex;
  flex-wrap: wrap;
}
.filterBlockItem {
  margin-right: 12px;
  margin-top: 8px;
  font-size: 15px;
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

.el-table--enable-row-transition .el-table__body td,
.el-table td,
.el-table th {
  padding: 0px;
}

.el-table th.is-leaf,
tr .gutter {
  background: aliceblue;
}
.el-collapse-item__header {
  padding: 0 0 0 24px;
  color: #000;
  font-size: 18px;
  font-weight: bold;
}
.pagination {
  display: flex;
  justify-content: flex-end;
  margin-top: 8px;
}
.el-table th.gutter {
  display: table-cell !important;
}
/*表格偶数行颜色*/
.el-table--striped .el-table__body tr.el-table__row--striped td {
  background-color: #f5f5f5;
}
/* 设置table悬浮颜色 */
.el-table--enable-row-hover .el-table__body tr:hover > td {
  background-color: #e7f5ff;
}
.el-table thead {
  color: #333333;
}
.bg-purple {
  /*background: #d3dce6;*/
  /*min-height: 670px;*/
}
</style>