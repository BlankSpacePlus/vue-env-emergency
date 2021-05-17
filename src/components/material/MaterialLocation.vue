<template>
  <section>
    <el-col style="font-size:22px; font-weight: bold; padding-bottom: 40px">物资位置信息管理</el-col>
    <el-col :span="24" class="toolbar" style="padding-bottom: 0;">
      <el-form :inline="true" :model="filters">
        <el-form-item label="物资位置ID">
          <el-input v-model="filters.input_id" placeholder="请输入物资位置ID"></el-input>
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
      <el-table ref="multipleTable" :data="materialItem" highlight-current-row v-loading="loading" tooltip-effect="dark" style="width: 100%;" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="50"></el-table-column>
        <el-table-column prop="id" label="物资位置ID" width="100" align="center" sortable></el-table-column>
        <el-table-column prop="p_name" label="物资位置名称" width="300" align="center"></el-table-column>
        <el-table-column prop="m_name" label="物资内容" width="600" align="center"></el-table-column>
        <el-table-column label="操作" align="center" min-width="200">
          <template scope="scope">
            <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
        <el-dialog title="添加物资位置" :visible.sync="dialogFormVisible" width="500px" :append-to-body="true" center>
          <el-form :model="addMaterialItem">
            <el-form-item label="物资位置ID：" :label-width="formLabelWidth">
              <el-input v-model="addMaterialItem.new_id" style="width: 200px"></el-input>
            </el-form-item>
            <el-form-item label="物资位置名称：" :label-width="formLabelWidth">
              <el-input v-model="addMaterialItem.new_p_name" style="width: 200px"></el-input>
            </el-form-item>
            <!--可以改成多选框-->
            <el-form-item label="物资内容：" :label-width="formLabelWidth">
              <el-input v-model="addMaterialItem.new_m_name" style="width: 200px"></el-input>
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
              <el-input v-model="editForm.p_name" style="width: 200px"></el-input>
            </el-form-item>
            <el-form-item label="物资内容：" :label-width="formLabelWidth">
              <el-input v-model="editForm.m_name" style="width: 200px"></el-input>
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
      materialItem: [
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
      multipleSelection: [],
      dialogFormVisible: false,
      formLabelWidth: "150px",
      addMaterialItem: {
        new_id: "",
        new_p_name: "",
        new_m_name: "",
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
      // TODO 完善一下查询
      this.loading = false;
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    addMaterialInfo() {
      this.dialogFormVisible = true;
    },
    dialogClick() {
      this.dialogFormVisible = false;
      let new_obj = {
        id: this.addMaterialItem.new_id,
        p_name: this.addMaterialItem.new_p_name,
        m_name: this.addMaterialItem.new_m_name
      };
      this.materialItem.push(new_obj);
      this.addMaterialItem.new_id = "";
      this.addMaterialItem.new_p_name = "";
      this.addMaterialItem.new_m_name = "";
      this.$message({
        message: "添加成功！",
        m_name: "success"
      });
    },
    handleEdit: function(index, row) {
      this.editFormVisible = true;
      this.editFormId = row.id;
      this.editForm = Object.assign({}, row);
    },
    handleDelete: function(index, row) {
      this.$confirm("确认删除该物资位置信息吗?", "提示", {
        type: "warning"
      }).then(() => {
        this.loading = true;
        setTimeout(() => {
          this.materialItem.splice(index, 1);
          this.loading = false;
          this.$message({
            message: "删除成功",
            m_name: "success"
          });
        }, 1500);
      });
    },
    editSubmit: function() {
      this.$refs.editForm.validate(valid => {
        this.$confirm("确认提交吗？", "提示", {}).then(() => {
          this.loading = true;
          setTimeout(() => {
            this.materialItem.forEach(item => {
              if (item.id === this.editFormId) {
                item.id = this.editForm.id;
                item.p_name = this.editForm.p_name;
                item.m_name = this.editForm.m_name;
              }
            });
            this.loading = false;
            this.$message({
              message: "提交成功",
              type: "success"
            });
            this.editFormVisible = false;
          }, 1500);
        });
      });
    },
    batchRemove: function() {
      this.$confirm("确认是否删除这些企业位置信息?", "提示", {
        type: "warning"
      }).then(() => {
        this.loading = true;
        setTimeout(() => {
          let tempItem = [];
          this.materialItem.forEach(item => {
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
          this.materialItem = tempItem;
          this.loading = false;
          this.$message({
            message: "删除成功",
            type: "success"
          });
        }, 1500);
      });
    }
  }
};
</script>
