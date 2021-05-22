<template>
  <section>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="padding-bottom: 40px">
      <el-tooltip content="点我返回首页" placement="bottom" effect="light">
        <el-breadcrumb-item :to="{path: '/home-staff/initial'}">工作人员首页</el-breadcrumb-item>
      </el-tooltip>
      <el-breadcrumb-item>物资信息维护</el-breadcrumb-item>
      <el-breadcrumb-item>物资位置信息管理</el-breadcrumb-item>
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
          <el-button type="primary" icon="el-icon-circle-plus" @click="addMaterialInfo">添加物资位置</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <template>
      <el-table ref="multipleTable" :data="searchMaterialLocationList" highlight-current-row v-loading="loading" tooltip-effect="dark" style="width: 100%;" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="50"></el-table-column>
        <el-table-column prop="id" label="ID" width="70" align="left" sortable></el-table-column>
        <el-table-column prop="p_name" label="物资位置名称" width="300" align="center"></el-table-column>
        <el-table-column prop="m_name" label="物资内容" width="600" align="center"></el-table-column>
        <el-table-column label="操作" align="center" min-width="200">
          <template scope="scope">
            <el-button size="small" icon="el-icon-edit-outline" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="small" icon="el-icon-remove" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
        <el-dialog title="添加物资位置" :visible.sync="dialogFormVisible" width="500px" :append-to-body="true" center>
          <el-form :model="addMaterialItem">
            <el-form-item label="物资位置ID：" :label-width="formLabelWidth">
              <el-input v-model="addMaterialItem.id" style="width: 200px"></el-input>
            </el-form-item>
            <el-form-item label="物资位置名称：" :label-width="formLabelWidth">
              <el-input v-model="addMaterialItem.p_name" maxlength="10" show-word-limit style="width: 200px"></el-input>
            </el-form-item>
            <el-form-item label="物资内容：" :label-width="formLabelWidth">
              <el-input type="textarea" maxlength="30" show-word-limit v-model="addMaterialItem.m_name" style="width: 200px"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible=false">取消</el-button>
            <el-button type="primary" @click="dialogClick">添加</el-button>
          </div>
        </el-dialog>
        <el-dialog title="编辑" :visible.sync="editFormVisible" :append-to-body="true" width="500px" center>
          <el-form :model="editForm" ref="editForm">
            <el-form-item label="物资位置ID：" :label-width="formLabelWidth">
              <el-input v-model="editForm.id" style="width: 200px"></el-input>
            </el-form-item>
            <el-form-item label="物资位置名称：" :label-width="formLabelWidth">
              <el-input v-model="editForm.p_name" maxlength="10" show-word-limit style="width: 200px"></el-input>
            </el-form-item>
            <el-form-item label="物资内容：" :label-width="formLabelWidth">
              <el-input type="textarea" maxlength="30" show-word-limit v-model="editForm.m_name" style="width: 200px"></el-input>
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
      materialLocationList: [
        {
          id: 1,
          p_name: "补给三件套",
          m_name: "矿泉水,肉罐头,压缩饼干"
        },
        {
          id: 2,
          p_name: "救火三件套",
          m_name: "高压水枪,灭火器,救生梯"
        },
        {
          id: 3,
          p_name: "精神补给两件套",
          m_name: "歪比巴卜,歪比歪比"
        }
      ],
      searchMaterialLocationList: [],
      multipleSelection: [],
      dialogFormVisible: false,
      formLabelWidth: "150px",
      addMaterialItem: {
        id: "",
        p_name: "",
        m_name: "",
      },
      editFormVisible: false,
      editFormId: 0,
      editForm: {
        id: "",
        p_name: "",
        m_name: ""
      }
    };
  },
  methods: {
    getMaterialInfo() {
      this.loading = false;
      if (this.filters.input_id === "") {
        this.searchMaterialLocationList = JSON.parse(JSON.stringify(this.materialLocationList));
      } else {
        this.searchMaterialLocationList = [];
        for (let item in this.materialLocationList) {
          if (JSON.stringify(this.materialLocationList[item]).search(this.filters.input_id) !== -1) {
            this.searchMaterialLocationList.push(this.materialLocationList[item]);
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
        p_name: this.addMaterialItem.p_name
      };
      this.materialLocationList.push(obj);
      this.addMaterialItem.id = "";
      this.addMaterialItem.m_name = "";
      this.addMaterialItem.p_name = "";
      this.searchMaterialLocationList = JSON.parse(JSON.stringify(this.materialLocationList));
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
          this.materialLocationList.splice(index, 1);
          this.searchMaterialLocationList = JSON.parse(JSON.stringify(this.materialLocationList));
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
            this.materialLocationList.forEach(item => {
              if (item.id === this.editFormId) {
                item.id = this.editForm.id;
                item.m_name = this.editForm.m_name;
                item.p_name = this.editForm.p_name;
              }
            });
            this.searchMaterialLocationList = JSON.parse(JSON.stringify(this.materialLocationList));
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
          this.materialLocationList.forEach(item => {
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
          this.materialLocationList = tempItem;
          this.searchMaterialLocationList = JSON.parse(JSON.stringify(this.materialLocationList));
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
