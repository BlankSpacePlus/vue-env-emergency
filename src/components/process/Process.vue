<template>
  <section>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="padding-bottom: 40px">
      <el-tooltip content="点我返回首页" placement="bottom" effect="light">
        <el-breadcrumb-item :to="{path: '/home-stuff/initial'}">工作人员首页</el-breadcrumb-item>
      </el-tooltip>
      <el-breadcrumb-item>流程信息维护</el-breadcrumb-item>
      <el-breadcrumb-item>流程信息管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-col :span="24" class="toolbar" style="padding-bottom: 0;">
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <el-input v-model="filters.input_id" placeholder="请输入流程ID"></el-input>
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
      <el-table ref="multipleTable" :data="searchProcessItem" highlight-current-row v-loading="loading" tooltip-effect="dark" style="width: 100%;" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="50"></el-table-column>
        <el-table-column prop="id" label="ID" width="70" align="left" sortable></el-table-column>
        <el-table-column prop="name" label="流程名称" width="150" align="center"></el-table-column>
        <el-table-column prop="type" label="流程类型" width="300" align="center"></el-table-column>
        <el-table-column prop="code" label="流程编码" width="150" align="center"></el-table-column>
        <el-table-column prop="detail" label="流程内容" width="300" align="center"></el-table-column>
        <el-table-column label="操作" align="center" min-width="200">
          <template scope="scope">
            <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
        <el-dialog title="添加流程" :visible.sync="dialogFormVisible" width="500px" :append-to-body="true" center>
          <el-form :model="addProcessItem">
            <el-form-item label="流程ID：" :label-width="formLabelWidth">
              <el-input v-model="addProcessItem.new_id" style="width: 200px"></el-input>
            </el-form-item>
            <el-form-item label="流程名称：" :label-width="formLabelWidth">
              <el-input v-model="addProcessItem.new_name" style="width: 200px"></el-input>
            </el-form-item>
            <!--可以改成多选框-->
            <el-form-item label="流程类型：" :label-width="formLabelWidth">
              <el-input v-model="addProcessItem.new_type" style="width: 200px"></el-input>
            </el-form-item>
            <el-form-item label="流程编码：" :label-width="formLabelWidth">
              <el-input v-model="addProcessItem.new_code" style="width: 200px"></el-input>
            </el-form-item>
            <el-form-item label="流程内容：" :label-width="formLabelWidth">
              <el-input v-model="addProcessItem.new_detail" style="width: 200px"></el-input>
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
              <el-input v-model="editForm.name" style="width: 200px"></el-input>
            </el-form-item>
            <el-form-item label="流程类型：" :label-width="formLabelWidth">
              <el-input v-model="editForm.type" style="width: 200px"></el-input>
            </el-form-item>
            <el-form-item label="流程编码：" :label-width="formLabelWidth">
              <el-input v-model="editForm.code" style="width: 200px"></el-input>
            </el-form-item>
            <el-form-item label="流程内容：" :label-width="formLabelWidth">
              <el-input v-model="editForm.detail" style="width: 200px"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click.native="editFormVisible=false">取消</el-button>
            <el-button type="primary" @click.native="editSubmit">提交</el-button>
          </div>
        </el-dialog>
      </el-table>
      <el-col :span="24" class="toolbar" style="margin-top: 20px">
        <el-button type="danger" @click="batchRemove" :disabled="this.multipleSelection.length===0">批量删除</el-button>
        <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="10" :total="10" style="float:right;"></el-pagination>
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
      processItem: [
        {
          id: 1,
          name: "流程一",
          type: "卷页数卷方法卷套路卷关系",
          code: "XX0001",
          detail: "卷狗必死"
        },
        {
          id: 2,
          name: "模板五",
          type: "课堂考课后考期中考期末考",
          code: "YY8921",
          detail: "我要烤糊了"
        },
        {
          id: 3,
          name: "流程四",
          type: "平时作业小作业大作业",
          code: "TT12138",
          detail: "天天写作业NM烦不烦啊"
        }
      ],
      searchProcessItem: [],
      multipleSelection: [],
      dialogFormVisible: false,
      formLabelWidth: "150px",
      addProcessItem: {
        new_id: "",
        new_name: "",
        new_type: "",
        new_code: "",
        new_detail: ""
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
        this.searchProcessItem = JSON.parse(JSON.stringify(this.processItem));
      } else {
        this.searchProcessItem = [];
        for (let item in this.processItem) {
          if (JSON.stringify(this.processItem[item]).search(this.filters.input_id) !== -1) {
            this.searchProcessItem.push(this.processItem[item]);
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
      let new_obj = {
        id: this.addProcessItem.new_id,
        name: this.addProcessItem.new_name,
        type: this.addProcessItem.new_type,
        code: this.addProcessItem.new_code,
        detail: this.addProcessItem.new_detail,
      };
      this.processItem.push(new_obj);
      this.addProcessItem.new_id = "";
      this.addProcessItem.new_name = "";
      this.addProcessItem.new_type = "";
      this.addProcessItem.new_code = "";
      this.addProcessItem.new_detail = "";
      this.searchProcessItem = JSON.parse(JSON.stringify(this.processItem));
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
          this.processItem.splice(index, 1);
          this.searchProcessItem = JSON.parse(JSON.stringify(this.processItem));
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
            this.processItem.forEach(item => {
              if (item.id === this.editFormId) {
                item.id = this.editForm.id;
                item.name = this.editForm.name;
                item.type = this.editForm.type;
                item.code = this.editForm.code;
                item.detail = this.editForm.detail;
              }
            });
            this.searchProcessItem = JSON.parse(JSON.stringify(this.processItem));
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
          this.processItem.forEach(item => {
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
          this.processItem = tempItem;
          this.searchProcessItem = JSON.parse(JSON.stringify(this.processItem));
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
