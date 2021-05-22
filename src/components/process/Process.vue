<template>
  <section>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="padding-bottom: 40px">
      <el-tooltip content="点我返回首页" placement="bottom" effect="light">
        <el-breadcrumb-item :to="{path: '/home-staff/initial'}">工作人员首页</el-breadcrumb-item>
      </el-tooltip>
      <el-breadcrumb-item>流程信息维护</el-breadcrumb-item>
      <el-breadcrumb-item>流程信息管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-col :span="24" class="toolbar" style="padding-bottom: 0;">
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <el-input v-model="filters.input_id" placeholder="请输入关键词"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" v-on:click="getProcessInfo">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-circle-plus" @click="addProcessInfo">添加流程</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <template>
      <el-table ref="multipleTable" :data="searchProcessList" highlight-current-row v-loading="loading" tooltip-effect="dark" style="width: 100%;" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="50"></el-table-column>
        <el-table-column prop="id" label="ID" width="70" align="left" sortable></el-table-column>
        <el-table-column prop="name" label="流程名称" width="150" align="center"></el-table-column>
        <el-table-column prop="type" label="流程类型" width="300" align="center"></el-table-column>
        <el-table-column prop="code" label="流程编码" width="150" align="center"></el-table-column>
        <el-table-column prop="detail" label="流程内容" width="300" align="center"></el-table-column>
        <el-table-column label="操作" align="center" min-width="200">
          <template scope="scope">
            <el-button size="small" icon="el-icon-edit-outline" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="small" icon="el-icon-remove" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
        <el-dialog title="添加流程" :visible.sync="dialogFormVisible" width="500px" :append-to-body="true" center>
          <el-form :model="addProcessItem">
            <el-form-item label="流程ID：" :label-width="formLabelWidth">
              <el-input v-model="addProcessItem.id" style="width: 200px"></el-input>
            </el-form-item>
            <el-form-item label="流程名称：" :label-width="formLabelWidth">
              <el-input v-model="addProcessItem.name" maxlength="10" show-word-limit style="width: 200px"></el-input>
            </el-form-item>
            <el-form-item label="流程类型：" :label-width="formLabelWidth">
              <el-select v-model="addProcessItem.type" placeholder="请选择流程类型" style="width: 200px">
                <el-option value="流程" label="流程">流程</el-option>
                <el-option value="模板" label="模板">模板</el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="流程编码：" :label-width="formLabelWidth">
              <el-input v-model="addProcessItem.code" style="width: 200px"></el-input>
            </el-form-item>
            <el-form-item label="流程内容：" :label-width="formLabelWidth">
              <el-input type="textarea" maxlength="30" show-word-limit v-model="addProcessItem.detail" style="width: 200px"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible=false">取消</el-button>
            <el-button type="primary" @click="dialogClick">添加</el-button>
          </div>
        </el-dialog>
        <el-dialog title="编辑" :visible.sync="editFormVisible" :append-to-body="true" width="500px" center>
          <el-form :model="editForm" ref="editForm">
            <el-form-item label="流程ID：" :label-width="formLabelWidth">
              <el-input v-model="editForm.id" style="width: 200px"></el-input>
            </el-form-item>
            <el-form-item label="流程名称：" :label-width="formLabelWidth">
              <el-input v-model="editForm.name" maxlength="10" show-word-limit style="width: 200px"></el-input>
            </el-form-item>
            <el-form-item label="流程类型：" :label-width="formLabelWidth">
              <el-select v-model="editForm.type" placeholder="请选择流程类型" style="width: 200px">
                <el-option value="流程" label="流程">流程</el-option>
                <el-option value="模板" label="模板">模板</el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="流程编码：" :label-width="formLabelWidth">
              <el-input v-model="editForm.code" style="width: 200px"></el-input>
            </el-form-item>
            <el-form-item label="流程内容：" :label-width="formLabelWidth">
              <el-input type="textarea" maxlength="30" show-word-limit v-model="editForm.detail" style="width: 200px"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click.native="editFormVisible=false">取消</el-button>
            <el-button type="primary" @click.native="editSubmit">提交</el-button>
          </div>
        </el-dialog>
      </el-table>
      <el-col :span="24" class="toolbar" style="margin-top: 20px">
        <el-button type="danger" icon="el-icon-delete-solid" @click="batchRemove" :disabled="this.multipleSelection.length===0">批量删除</el-button>
        <el-button type="primary" icon="el-icon-upload2" @click="">批量导入</el-button>
        <el-button type="primary" icon="el-icon-download" @click="">批量导出</el-button>
        <el-pagination background layout="prev, pager, next" :page-size="10" :total="200" style="float:right;" @current-change="handleCurrentChange"></el-pagination>
      </el-col>
    </template>
  </section>
</template>

<script>
export default {
  data() {
    return {
      filters: {
        input_id: "",
      },
      loading: false,
      processList: [
        {
          id: 1,
          name: "流程一",
          type: "流程",
          code: "XX0001",
          detail: "卷狗必死"
        },
        {
          id: 2,
          name: "模板五",
          type: "模板",
          code: "YY8921",
          detail: "我要烤糊了"
        },
        {
          id: 3,
          name: "流程四",
          type: "流程",
          code: "TT12138",
          detail: "天天写作业烦不烦啊"
        }
      ],
      searchProcessList: [],
      multipleSelection: [],
      dialogFormVisible: false,
      formLabelWidth: "150px",
      addProcessItem: {
        id: "",
        name: "",
        type: "",
        code: "",
        detail: ""
      },
      editFormVisible: false,
      editFormId: 0,
      editForm: {
        id: "",
        name: "",
        type: "",
        code: "",
        detail: ""
      }
    };
  },
  methods: {
    getProcessInfo() {
      this.loading = false;
      if (this.filters.input_id === "") {
        this.searchProcessList = JSON.parse(JSON.stringify(this.processList));
      } else {
        this.searchProcessList = [];
        for (let item in this.processList) {
          if (JSON.stringify(this.processList[item]).search(this.filters.input_id) !== -1) {
            this.searchProcessList.push(this.processList[item]);
          }
        }
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    addProcessInfo() {
      this.dialogFormVisible = true;
    },
    dialogClick() {
      this.dialogFormVisible = false;
      this.processList.push(JSON.parse(JSON.stringify(this.addProcessItem)));
      this.getProcessInfo();
      this.addProcessItem.id = "";
      this.addProcessItem.name = "";
      this.addProcessItem.type = "";
      this.addProcessItem.code = "";
      this.addProcessItem.detail = "";
      this.$message({
        message: "添加成功！",
        type: "success"
      });
    },
    handleEdit: function(index, row) {
      this.editFormVisible = true;
      this.editFormId = row.id;
      this.editForm = Object.assign({}, row);
    },
    handleDelete: function(index, row) {
      this.$confirm("确认删除该流程吗?", "提示", {
        type: "warning"
      }).then(() => {
        this.loading = true;
        setTimeout(() => {
          this.processList.splice(index, 1);
          this.searchProcessList = JSON.parse(JSON.stringify(this.processList));
          this.loading = false;
          this.$message({
            message: "删除成功",
            type: "success"
          });
        }, 10);
      });
    },
    editSubmit: function() {
      this.$refs.editForm.validate(valid => {
        this.$confirm("确认提交吗？", "提示", {}).then(() => {
          this.loading = true;
          setTimeout(() => {
            this.processList.forEach(item => {
              if (item.id === this.editFormId) {
                item.id = this.editForm.id;
                item.name = this.editForm.name;
                item.type = this.editForm.type;
                item.code = this.editForm.code;
                item.detail = this.editForm.detail;
              }
            });
            this.searchProcessList = JSON.parse(JSON.stringify(this.processList));
            this.loading = false;
            this.$message({
              message: "提交成功",
              type: "success"
            });
            this.editFormVisible = false;
          }, 10);
        });
      });
    },
    batchRemove: function() {
      this.$confirm("确认是否删除这些流程信息?", "提示", {
        type: "warning"
      }).then(() => {
        this.loading = true;
        setTimeout(() => {
          let tempItem = [];
          this.processList.forEach(item => {
            let hasItem = false;
            this.multipleSelection.forEach(sele => {
              if (sele.id === item.id) {
                hasItem = true;
              }
            });
            if (!hasItem) {
              tempItem.push(item);
            }
          });
          this.processList = tempItem;
          this.searchProcessList = JSON.parse(JSON.stringify(this.processList));
          this.loading = false;
          this.$message({
            message: "删除成功",
            type: "success"
          });
        }, 10);
      });
    }
  }
};
</script>
