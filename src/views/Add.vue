<template>
  <el-row>
    <el-col :span="6"></el-col>
    <el-col :span="12">
      <p>上传文件添加文献</p>
      <el-upload
        class="upload"
        action="http://localhost:8900/csv-add-literature"
        method="post"
        :before-upload="beforeUpload"
        accept=".csv"
        name="csvFile"
        drag
        multiple
        ref="upload"
      >
        <div class="el-upload__text">将文件拖到此处或<em>点击上传</em></div>
        <template #tip>
          <div class="el-upload__tip">上传文件支持.csv格式</div>
        </template>
      </el-upload>
      <p>单个文献添加</p>
      <el-form
        label-width="120px"
        class="add-form"
        :model="form"
        ref="form"
        :rules="rules"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="标题" prop="title">
              <el-input v-model="this.form.title"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="作者" prop="author">
              <el-input v-model="this.form.author"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="机构" prop="organization">
              <el-input v-model="this.form.organization"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="关键字" prop="keyword">
              <el-input
                v-model="this.form.keyword"
                placeholder="不同关键字用';'分开"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="摘要" prop="literatureAbstract">
          <el-input
            v-model="this.form.literatureAbstract"
            :autosize="{ minRows: 2, maxRows: 4 }"
            type="textarea"
          ></el-input>
        </el-form-item>

        <el-row>
          <el-col :span="8">
            <el-form-item label="期刊/会议 名称" prop="origin">
              <el-input v-model="this.form.origin"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="发表时间" prop="publicationTime">
              <el-date-picker
                v-model="this.form.publicationTime"
                type="date"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="文献类型" prop="literatureType">
              <el-select v-model="this.form.literatureType">
                <el-option label="期刊" value="期刊"></el-option>
                <el-option label="会议" value="会议"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item>
          <el-button type="primary" @click="submitForm('form')">提交</el-button>
          <el-button @click="resetForm('form')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <el-col :span="6"></el-col>
  </el-row>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      form: {
        title: "",
        author: "",
        organization: "",
        keyword: "",
        literatureAbstract: "",
        origin: "",
        publicationTime: "",
        literatureType: "",
      },
      csvFile: "",
      rules: {
        title: [{ required: true, trigger: "blur", message: "标题不能为空" }],
        author: [{ required: true, trigger: "blur", message: "作者不能为空" }],
        organization: [
          { required: true, trigger: "blur", message: "机构不能为空" },
        ],
        keyword: [
          { required: true, trigger: "blur", message: "关键字不能为空" },
        ],
        literatureAbstract: [
          { required: true, trigger: "blur", message: "摘要不能为空" },
        ],
        origin: [
          {
            required: true,
            trigger: "blur",
            message: "期刊/会议 名称不能为空",
          },
        ],
        publicationTime: [
          { required: true, trigger: "change", message: "发表时间不能为空" },
        ],
        literatureType: [
          { required: true, trigger: "change", message: "文献类型不能为空" },
        ],
      },
    };
  },
  methods: {
    beforeUpload(file) {
      const isCSV = file.type === "application/vnd.ms-excel";
      if (!isCSV) {
        this.$message.error("上传文件仅支持.csv格式");
        return false;
      }
    },
    /*handleRemove(file) {
      console.log(file)
    },
    beforeRemove(file) {
      return this.$confirm(`取消${file.name}上传?`)
    },*/
    submitForm(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          submitHttp(this);
        } else {
          console.log("error submit");
          this.$message.error("提交失败，表单请填完整！");
          return false;
        }
      });
    },
    resetForm(form) {
      this.$refs[form].resetFields();
    },
  },
  // myUpload(item) {
  // this.csvFile.append('csvFile', item.file)
  // axios.post('http://localhost:8900/csv-add-literature',this.csvFile)
  // }
};

function submitHttp(that) {
  let json = {
    title: that.form.title,
    author: that.form.author,
    organization: that.form.organization,
    keyword: that.form.keyword,
    literatureAbstract: that.form.literatureAbstract,
    origin: that.form.origin,
    publicationTime: that.form.publicationTime,
    literatureType: that.form.literatureType,
  };
  axios
    .post("http://localhost:8900/single-add-literature", json)
    .then((response) => {
      alert("submit success!!");
      console.log(response);
    })
    .catch(function () {
      console.log("submit error!!");
    });
}
</script>

<style scoped>
</style>