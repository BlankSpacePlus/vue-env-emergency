<template>
  <section>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="padding-bottom: 40px">
      <el-tooltip content="点我返回首页" placement="bottom" effect="light">
        <el-breadcrumb-item :to="{path: '/home-staff/initial'}">工作人员首页</el-breadcrumb-item>
      </el-tooltip>
      <el-breadcrumb-item>物资信息维护</el-breadcrumb-item>
      <el-breadcrumb-item>物资信息管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-col :span="24" class="toolbar" style="padding-bottom: 0;">
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <el-input v-model="filters.input_id" placeholder="请输入关键词"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" v-on:click="getMaterialInfo">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-circle-plus" @click="addMaterialInfo">添加物资</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <template>
      <el-table stripe ref="multipleTable" :data="searchMaterialList" highlight-current-row v-loading="loading" tooltip-effect="dark" style="width: 100%;" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="30"></el-table-column>
        <el-table-column prop="id" label="ID" width="70" align="left" sortable></el-table-column>
        <el-table-column prop="m_name" label="物资名称" width="130" align="center"></el-table-column>
        <el-table-column prop="num" label="物资数量" width="130" align="center" sortable></el-table-column>
        <el-table-column prop="type" label="物资类型" width="130" align="center"></el-table-column>
        <el-table-column prop="name" label="物资清点人" width="120" align="center"></el-table-column>
        <el-table-column prop="tel" label="物资清点人电话" width="150" align="center"></el-table-column>
        <el-table-column prop="code" label="物资编号" width="130" align="center"></el-table-column>
        <el-table-column prop="ddl" label="物资清点时间" min-width="130" align="center" sortable></el-table-column>
        <el-table-column label="操作" align="center" min-width="200">
          <template scope="scope">
            <el-button size="small" icon="el-icon-edit-outline" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="small" icon="el-icon-remove" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
        <el-dialog title="添加物资" :visible.sync="dialogFormVisible" width="500px" :append-to-body="true" center>
          <el-form :model="addMaterialItem">
            <el-form-item label="物资ID：" :label-width="formLabelWidth">
              <el-input v-model="addMaterialItem.id" style="width: 200px"></el-input>
            </el-form-item>
            <el-form-item label="物资名称：" :label-width="formLabelWidth">
              <el-input v-model="addMaterialItem.m_name" maxlength="10" show-word-limit style="width: 200px"></el-input>
            </el-form-item>
            <el-form-item label="物资数量：" :label-width="formLabelWidth">
              <el-input-number v-model="addMaterialItem.num" @change="handleChange" :min="1" style="width: 200px"></el-input-number>
            </el-form-item>
            <el-form-item label="物资类型：" :label-width="formLabelWidth">
              <el-select v-model="addMaterialItem.type" placeholder="请选择物资类型" style="width: 200px">
                <el-option value="器材工具" label="器材工具">器材工具</el-option>
                <el-option value="生命救助" label="生命救助">生命救助</el-option>
                <el-option value="精神救助" label="精神救助">精神救助</el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="物资清点人：" :label-width="formLabelWidth">
              <el-select v-model="addMaterialItem.name" placeholder="请选择物资清点人" style="width: 200px">
                <el-option value="萌萌" label="萌萌">萌萌</el-option>
                <el-option value="海洋哥" label="海洋哥">海洋哥</el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="物资清点人电话：" :label-width="formLabelWidth">
              <el-input v-model="addMaterialItem.tel" style="width: 200px"></el-input>
            </el-form-item>
            <el-form-item label="物资编号：" :label-width="formLabelWidth">
              <el-input v-model="addMaterialItem.code" style="width: 200px"></el-input>
            </el-form-item>
            <el-form-item label="物资清点时间：" :label-width="formLabelWidth">
              <el-date-picker type="date" placeholder="选择物资清点时间" v-model="addMaterialItem.ddl" style="width: 200px;" value-format="yyyy-MM-dd" format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible=false">取消</el-button>
            <el-button type="primary" @click="dialogClick">添加</el-button>
          </div>
        </el-dialog>
        <el-dialog title="编辑" :visible.sync="editFormVisible" :append-to-body="true" width="500px" center>
          <el-form :model="editForm" ref="editForm">
            <el-form-item label="物资ID：" :label-width="formLabelWidth">
              <el-input v-model="editForm.id" style="width: 200px"></el-input>
            </el-form-item>
            <el-form-item label="物资名称：" :label-width="formLabelWidth">
              <el-input v-model="editForm.m_name" maxlength="10" show-word-limit style="width: 200px"></el-input>
            </el-form-item>
            <el-form-item label="物资数量：" :label-width="formLabelWidth">
              <el-input-number v-model="editForm.num" @change="handleChange" :min="1" style="width: 200px"></el-input-number>
            </el-form-item>
            <el-form-item label="物资类型：" :label-width="formLabelWidth">
              <el-select v-model="editForm.type" placeholder="请选择物资类型" style="width: 200px">
                <el-option value="器材工具" label="器材工具">器材工具</el-option>
                <el-option value="生命救助" label="生命救助">生命救助</el-option>
                <el-option value="精神救助" label="精神救助">精神救助</el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="物资清点人：" :label-width="formLabelWidth">
              <el-select v-model="editForm.name" placeholder="请选择物资清点人" style="width: 200px">
                <el-option value="萌萌" label="萌萌">萌萌</el-option>
                <el-option value="海洋哥" label="海洋哥">海洋哥</el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="物资清点人电话：" :label-width="formLabelWidth">
              <el-input v-model="editForm.tel" style="width: 200px"></el-input>
            </el-form-item>
            <el-form-item label="物资编号：" :label-width="formLabelWidth">
              <el-input v-model="editForm.code" style="width: 200px"></el-input>
            </el-form-item>
            <el-form-item label="物资清点时间：" :label-width="formLabelWidth">
              <el-date-picker type="date" placeholder="选择物资清点时间" v-model="editForm.ddl" style="width: 200px;" value-format="yyyy-MM-dd" format="yyyy-MM-dd">
              </el-date-picker>
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
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
                       style="float:right;" :page-sizes="[10, 15, 20, 25, 30]" :page-size="10"
                       layout="total, sizes, prev, pager, next, jumper" :total="200" background>
        </el-pagination>
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
      currentPage: 1,
      materialList: [
        {
          id: 1,
          m_name: "高压水枪",
          num: 3,
          type: "器材工具",
          name: "萌萌",
          tel: "1008610010",
          code: "112ipre1jd",
          ddl: "2021-05-20"
        },
        {
          id: 2,
          m_name: "灭火器",
          num: 10,
          type: "器材工具",
          name: "萌萌",
          tel: "1008610010",
          code: "ca8casj9cq",
          ddl: "2021-06-06"
        },
        {
          id: 3,
          m_name: "歪比巴卜",
          num: 10000,
          type: "精神救助",
          name: "萌萌",
          tel: "1008610010",
          code: "xabsiowiqno12",
          ddl: "2021-06-21"
        },
        {
          id: 4,
          m_name: "矿泉水",
          num: 10000,
          type: "生命救助",
          name: "海洋哥",
          tel: "1001010086",
          code: "xoop032yxnaj",
          ddl: "2021-05-29"
        },
        {
          id: 5,
          m_name: "肉罐头",
          num: 1000,
          type: "生命救助",
          name: "海洋哥",
          tel: "1001010086",
          code: "xoop032yxnaj",
          ddl: "2021-05-29"
        }
      ],
      searchMaterialList: [],
      multipleSelection: [],
      dialogFormVisible: false,
      formLabelWidth: "150px",
      addMaterialItem: {
        id: "",
        m_name: "",
        num: "",
        type: "",
        name: "",
        tel: "",
        code: "",
        ddl: ""
      },
      editFormVisible: false,
      editFormId: 0,
      editForm: {
        id: "",
        m_name: "",
        num: "",
        type: "",
        name: "",
        tel: "",
        code: "",
        ddl: ""
      }
    };
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页${val}条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    getMaterialInfo() {
      this.loading = false;
      if (this.filters.input_id === "") {
        this.searchMaterialList = JSON.parse(JSON.stringify(this.materialList));
      } else {
        this.searchMaterialList = [];
        for (let item in this.materialList) {
          if (JSON.stringify(this.materialList[item]).search(this.filters.input_id) !== -1) {
            this.searchMaterialList.push(this.materialList[item]);
          }
        }
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    addMaterialInfo() {
      this.dialogFormVisible = true;
    },
    dialogClick() {
      this.dialogFormVisible = false;
      let obj = {
        id: this.addMaterialItem.id,
        m_name: this.addMaterialItem.m_name,
        num: this.addMaterialItem.num,
        type: this.addMaterialItem.type,
        name: this.addMaterialItem.name,
        tel: this.addMaterialItem.tel,
        code: this.addMaterialItem.code,
        ddl: this.addMaterialItem.ddl
      };
      this.materialList.push(obj);
      this.addMaterialItem.id = "";
      this.addMaterialItem.m_name = "";
      this.addMaterialItem.num = "";
      this.addMaterialItem.type = "";
      this.addMaterialItem.name = "";
      this.addMaterialItem.tel = "";
      this.addMaterialItem.code = "";
      this.addMaterialItem.ddl = "";
      this.searchMaterialList = JSON.parse(JSON.stringify(this.materialList));
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
      this.$confirm("确认删除该物资吗?", "提示", {
        type: "warning"
      }).then(() => {
        this.loading = true;
        setTimeout(() => {
          this.materialList.splice(index, 1);
          this.searchMaterialList = JSON.parse(JSON.stringify(this.materialList));
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
            this.materialList.forEach(item => {
              if (item.id === this.editFormId) {
                item.id = this.editForm.id;
                item.m_name = this.editForm.m_name;
                item.num = this.editForm.num;
                item.type = this.editForm.type;
                item.name = this.editForm.name;
                item.tel = this.editForm.tel;
                item.code = this.editForm.code;
                item.ddl = this.editForm.ddl;
              }
            });
            this.searchMaterialList = JSON.parse(JSON.stringify(this.materialList));
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
      this.$confirm("确认是否删除这些物资信息?", "提示", {
        type: "warning"
      }).then(() => {
        this.loading = true;
        setTimeout(() => {
          let tempItem = [];
          this.materialList.forEach(item => {
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
          this.materialList = tempItem;
          this.searchMaterialList = JSON.parse(JSON.stringify(this.materialList));
          this.loading = false;
          this.$message({
            message: "删除成功",
            type: "success"
          });
        }, 10);
      });
    },
    handleChange(value) {
      console.log(value);
    }
  }
};
</script>
