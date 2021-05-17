<template>
  <section>
    <el-col style="font-size:22px; font-weight: bold; padding-bottom: 40px">城市信息管理</el-col>
    <el-col :span="24" class="toolbar" style="padding-bottom: 0;">
      <el-form :inline="true" :model="filters">
        <el-form-item label="城市ID">
          <el-input v-model="filters.input_id" placeholder="请输入城市ID"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" v-on:click="getMaterialInfo">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-circle-plus" @click="addMaterialInfo">添加城市</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <template>
      <el-table ref="multipleTable" :data="cityItem" highlight-current-row v-loading="loading" tooltip-effect="dark" style="width: 100%;" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="50"></el-table-column>
        <el-table-column prop="id" label="城市ID" width="120" align="center" sortable></el-table-column>
        <el-table-column prop="name" label="城市名称" width="180" align="center"></el-table-column>
        <el-table-column prop="code" label="城市编码" width="180" align="center"></el-table-column>
        <el-table-column prop="province" label="城市所属省份" width="180" align="center"></el-table-column>
        <el-table-column prop="p_num" label="城市救援人数" width="180" align="center"></el-table-column>
        <el-table-column prop="car_num" label="城市救援车辆数" width="180" align="center"></el-table-column>
        <el-table-column label="操作" align="center" min-width="200">
          <template scope="scope">
            <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
        <el-dialog title="添加城市" :visible.sync="dialogFormVisible" width="500px" :append-to-body="true" center>
          <el-form :model="addcityItem">
            <el-form-item label="城市ID：" :label-width="formLabelWidth">
              <el-input v-model="addcityItem.new_id" style="width: 200px"></el-input>
            </el-form-item>
            <el-form-item label="城市名称：" :label-width="formLabelWidth">
              <el-input v-model="addcityItem.new_name" style="width: 200px"></el-input>
            </el-form-item>
            <el-form-item label="城市编码：" :label-width="formLabelWidth">
              <el-input v-model="addcityItem.new_code" style="width: 200px"></el-input>
            </el-form-item>
            <el-form-item label="城市所属省份：" :label-width="formLabelWidth">
              <el-input v-model="addcityItem.new_province" style="width: 200px"></el-input>
            </el-form-item>
            <el-form-item label="城市救援人数：" :label-width="formLabelWidth">
              <el-input v-model="addcityItem.new_p_num" style="width: 200px"></el-input>
            </el-form-item>
            <el-form-item label="城市救援车辆数：" :label-width="formLabelWidth">
              <el-input v-model="addcityItem.new_car_num" style="width: 200px"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible=false">取消</el-button>
            <el-button type="primary" @click="dialogClick">添加</el-button>
          </div>
        </el-dialog>
        <el-dialog title="编辑" :visible.sync="editFormVisible" :append-to-body="true" width="500px" center>
          <el-form :model="editForm" ref="editForm">
            <el-form-item label="城市ID：" :label-width="formLabelWidth">
              <el-input v-model="editForm.id" style="width: 200px"></el-input>
            </el-form-item>
            <el-form-item label="城市名称：" :label-width="formLabelWidth">
              <el-input v-model="editForm.name" style="width: 200px"></el-input>
            </el-form-item>
            <el-form-item label="城市编码：" :label-width="formLabelWidth">
              <el-input v-model="editForm.code" style="width: 200px"></el-input>
            </el-form-item>
            <el-form-item label="城市所属省份：" :label-width="formLabelWidth">
              <el-input v-model="editForm.province" style="width: 200px"></el-input>
            </el-form-item>
            <el-form-item label="城市救援人数：" :label-width="formLabelWidth">
              <el-input v-model="editForm.p_num" style="width: 200px"></el-input>
            </el-form-item>
            <el-form-item label="城市救援车辆数：" :label-width="formLabelWidth">
              <el-input v-model="editForm.car_num" style="width: 200px"></el-input>
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
      cityItem: [
        {
          id: 1,
          name: "青岛",
          code: "qingdao",
          province: "山东",
          p_num: "1000",
          car_num: "200"
        },
        {
          id: 2,
          name: "成都",
          code: "chengdu",
          province: "四川",
          p_num: "1200",
          car_num: "250"
        },
        {
          id: 3,
          name: "厦门",
          code: "xiamen",
          province: "福建",
          p_num: "700",
          car_num: "220"
        }
      ],
      multipleSelection: [],
      dialogFormVisible: false,
      formLabelWidth: "150px",
      addcityItem: {
        new_id: "",
        new_name: "",
        new_code: "",
        new_province: "",
        new_p_num: "",
        new_car_num: ""
      },
      editFormVisible: false,
      editFormId: 0,
      editForm: {
        id: "",
        name: "",
        code: "",
        province: "",
        p_num: "",
        car_num: ""
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
        id: this.addcityItem.new_id,
        name: this.addcityItem.new_name,
        code: this.addcityItem.new_code,
        province: this.addcityItem.new_province,
        p_num: this.addcityItem.new_p_num,
        car_num: this.addcityItem.new_car_num
      };
      this.cityItem.push(new_obj);
      this.addcityItem.new_id = "";
      this.addcityItem.new_name = "";
      this.addcityItem.new_code = "";
      this.addcityItem.new_province = "";
      this.addcityItem.new_p_num = "";
      this.addcityItem.new_car_num = "";
      this.$message({
        message: "添加成功！",
        code: "success"
      });
    },
    handleEdit: function(index, row) {
      this.editFormVisible = true;
      this.editFormId = row.id;
      this.editForm = Object.assign({}, row);
    },
    handleDelete: function(index, row) {
      this.$confirm("确认删除该城市信息吗?", "提示", {
        type: "warning"
      }).then(() => {
        this.loading = true;
        setTimeout(() => {
          this.cityItem.splice(index, 1);
          this.loading = false;
          this.$message({
            message: "删除成功",
            code: "success"
          });
        }, 1500);
      });
    },
    editSubmit: function() {
      this.$refs.editForm.validate(valid => {
        this.$confirm("确认提交吗？", "提示", {}).then(() => {
          this.loading = true;
          setTimeout(() => {
            this.cityItem.forEach(item => {
              if (item.id === this.editFormId) {
                item.id = this.editForm.id;
                item.name = this.editForm.name;
                item.code = this.editForm.code;
                item.province = this.editForm.province;
                item.p_num = this.editForm.p_num;
                item.car_num = this.editForm.car_num;
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
      this.$confirm("确认是否删除这些城市信息?", "提示", {
        type: "warning"
      }).then(() => {
        this.loading = true;
        setTimeout(() => {
          let tempItem = [];
          this.cityItem.forEach(item => {
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
          this.cityItem = tempItem;
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
