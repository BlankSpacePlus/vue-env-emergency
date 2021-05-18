<template>
  <section>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="padding-bottom: 40px">
      <el-tooltip content="点我返回首页" placement="bottom" effect="light">
        <el-breadcrumb-item :to="{path: '/home-admin/initial'}">管理员首页</el-breadcrumb-item>
      </el-tooltip>
      <el-breadcrumb-item>人员维护</el-breadcrumb-item>
      <el-breadcrumb-item>用户信息管理</el-breadcrumb-item>
    </el-breadcrumb>
<!--    <el-col style="font-size:22px; font-weight: bold; padding-bottom: 40px">用户信息管理</el-col>-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0;">
      <el-form :inline="true" :model="filters">
        <el-form-item label="用户ID">
          <el-input v-model="filters.input_id" placeholder="请输入用户ID"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" v-on:click="getUserInfo">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-circle-plus" @click="addUserInfo">添加用户</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <template>
      <el-table ref="multipleTable" :data="userItem" highlight-current-row v-loading="loading" tooltip-effect="dark" style="width: 100%;" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="id" label="ID" width="120" align="center" sortable></el-table-column>
        <el-table-column prop="username" label="用户名" width="130" align="center"></el-table-column>
        <el-table-column prop="password" label="密码" width="130" align="center"></el-table-column>
        <el-table-column prop="name" label="姓名" width="130" align="center" sortable></el-table-column>
        <el-table-column prop="sex" label="性别" width="120" align="center" sortable></el-table-column>
        <el-table-column prop="birthday" label="出生日期" width="130" align="center" sortable></el-table-column>
        <el-table-column prop="type" label="用户类型" min-width="130" align="center"></el-table-column>
        <el-table-column prop="state" label="账号状态" min-width="130" align="center"></el-table-column>
        <el-table-column label="操作" align="center" min-width="200">
          <template scope="scope">
            <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
        <el-dialog title="添加用户" :visible.sync="dialogFormVisible" width="400px" :append-to-body="true" center>
          <el-form :model="registerForm">
            <el-form-item label="ID：" :label-width="formLabelWidth">
              <el-input v-model="registerForm.new_id" style="width: 200px"></el-input>
            </el-form-item>
            <el-form-item label="用户名：" :label-width="formLabelWidth">
              <el-input v-model="registerForm.new_username" style="width: 200px"></el-input>
            </el-form-item>
            <el-form-item label="密码：" :label-width="formLabelWidth">
              <el-input v-model="registerForm.new_password" style="width: 200px"></el-input>
            </el-form-item>
            <el-form-item label="姓名：" :label-width="formLabelWidth">
              <el-input v-model="registerForm.new_name" style="width: 200px"></el-input>
            </el-form-item>
            <el-form-item label="性别：" :label-width="formLabelWidth">
              <el-select v-model="registerForm.new_sex" placeholder="请选择性别" style="width: 200px">
                <el-option value="男" label="男">男</el-option>
                <el-option value="女" label="女">女</el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="出生日期：" :label-width="formLabelWidth">
              <el-date-picker type="date" placeholder="选择出生时间" v-model="registerForm.new_birthday" style="width: 200px;" value-format="yyyy-MM-dd" format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="用户类型：" :label-width="formLabelWidth">
              <el-select v-model="registerForm.new_type" placeholder="请选择用户类型" style="width: 200px">
                <el-option value="指挥人员" label="指挥人员">指挥人员</el-option>
                <el-option value="专家" label="专家">专家</el-option>
                <el-option value="工作人员" label="工作人员">工作人员</el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible=false">取消</el-button>
            <el-button type="primary" @click="dialogClick">添加</el-button>
          </div>
        </el-dialog>
        <el-dialog title="编辑" :visible.sync="editFormVisible" :append-to-body="true" width="400px" center>
          <el-form :model="editForm" ref="editForm">
            <el-form-item label="ID：" :label-width="formLabelWidth">
              <el-input v-model="editForm.id" style="width: 200px"></el-input>
            </el-form-item>
            <el-form-item label="用户名：" :label-width="formLabelWidth">
              <el-input v-model="editForm.username" style="width: 200px"></el-input>
            </el-form-item>
            <el-form-item label="密码：" :label-width="formLabelWidth">
              <el-input v-model="editForm.password" style="width: 200px"></el-input>
            </el-form-item>
            <el-form-item label="姓名：" :label-width="formLabelWidth">
              <el-input v-model="editForm.name" style="width: 200px"></el-input>
            </el-form-item>
            <el-form-item label="性别：" :label-width="formLabelWidth">
              <el-select v-model="editForm.sex" placeholder="请选择性别" style="width: 200px">
                <el-option value="男" label="男">男</el-option>
                <el-option value="女" label="女">女</el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="出生日期：" :label-width="formLabelWidth">
              <el-date-picker type="date" placeholder="选择出生时间" v-model="editForm.birthday" style="width: 200px;" value-format="yyyy-MM-dd" format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="用户类型：" :label-width="formLabelWidth">
              <el-select v-model="editForm.type" placeholder="请选择用户类型" style="width: 200px">
                <el-option value="指挥人员" label="指挥人员">指挥人员</el-option>
                <el-option value="专家" label="专家">专家</el-option>
                <el-option value="工作人员" label="工作人员">工作人员</el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="账号状态：" :label-width="formLabelWidth">
              <el-select v-model="editForm.state" placeholder="请选择账号状态" style="width: 200px">
                <el-option value="正常" label="正常">正常</el-option>
                <el-option value="停用" label="停用">停用</el-option>
              </el-select>
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
      userItem: [
        {
          id: 1,
          username: "admin",
          password: "admin",
          name: "王二",
          sex: "男",
          birthday: "1978-03-09",
          type: "管理员",
          state: "正常"
        },
        {
          id: 2,
          username: "cmd",
          password: "cmd",
          name: "李华",
          sex: "男",
          birthday: "1980-10-04",
          type: "指挥人员",
          state: "正常"
        },
        {
          id: 3,
          username: "expert",
          password: "expert",
          name: "张强",
          sex: "男",
          birthday: "1970-05-25",
          type: "专家",
          state: "正常"
        },
        {
          id: 4,
          username: "stuff",
          password: "stuff",
          name: "王喆",
          sex: "男",
          birthday: "1990-12-12",
          type: "工作人员",
          state: "正常"
        }
      ],
      multipleSelection: [],
      dialogFormVisible: false,
      formLabelWidth: "100px",
      registerForm: {
        new_id: "",
        new_username: "",
        new_password: "",
        new_name: "",
        new_sex: "",
        new_birthday: "",
        new_type: ""
      },
      editFormVisible: false,
      editFormId: 0,
      editForm: {
        id: "",
        username: "",
        password: "",
        name: "",
        sex: "",
        birthday: "",
        type: "",
        state: ""
      }
    };
  },
  methods: {
    getUserInfo() {
      // TODO 完善一下查询
      this.loading = false;
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    addUserInfo() {
      this.dialogFormVisible = true;
    },
    dialogClick() {
      this.dialogFormVisible = false;
      let new_obj = {
        id: this.registerForm.new_id,
        username: this.registerForm.new_username,
        password: this.registerForm.new_password,
        name: this.registerForm.new_name,
        sex: this.registerForm.new_sex,
        birthday: this.registerForm.new_birthday,
        type: this.registerForm.new_type,
        state: "正常"
      };
      this.userItem.push(new_obj);
      this.registerForm.new_id = "";
      this.registerForm.new_username = "";
      this.registerForm.new_password = "";
      this.registerForm.new_name = "";
      this.registerForm.new_sex = "";
      this.registerForm.new_birthday = "";
      this.registerForm.new_type = "";
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
      this.$confirm("确认删除该用户吗?", "提示", {
        type: "warning"
      }).then(() => {
        this.loading = true;
        setTimeout(() => {
          this.userItem.splice(index, 1);
          this.loading = false;
          this.$message({
            message: "删除成功",
            type: "success"
          });
        }, 1500);
      });
    },
    editSubmit: function() {
      this.$refs.editForm.validate(valid => {
        this.$confirm("确认提交吗？", "提示", {}).then(() => {
          this.loading = true;
          setTimeout(() => {
            this.userItem.forEach(item => {
              if (item.id === this.editFormId) {
                item.id = this.editForm.id;
                item.username = this.editForm.username;
                item.password = this.editForm.password;
                item.name = this.editForm.name;
                item.sex = this.editForm.sex;
                item.birthday = this.editForm.birthday;
                item.type = this.editForm.type;
                item.state = this.editForm.state;
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
      this.$confirm("确认是否删除这些用户信息?", "提示", {
        type: "warning"
      }).then(() => {
        this.loading = true;
        setTimeout(() => {
          let tempItem = [];
          this.userItem.forEach(item => {
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
          this.userItem = tempItem;
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
