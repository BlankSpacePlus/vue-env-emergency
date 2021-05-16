<template>
  <section>
    <el-col style="font-size:22px; font-weight: bold; padding-bottom: 40px">用户信息管理</el-col>
    <el-col :span="24" class="toolbar" style="padding-bottom: 0;">
      <el-form :inline="true" :model="filters">
        <el-form-item label="用户ID">
          <el-input v-model="filters.input_id" placeholder="请输入用户ID"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" v-on:click="getUserInfo">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-goods" @click="addUserInfo" style="margin-left: 600px">添加用户</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <template>
      <el-table ref="multipleTable" :data="userItem" highlight-current-row v-loading="loading" tooltip-effect="dark" style="width: 100%;" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="id" label="ID" width="120" sortable></el-table-column>
        <el-table-column prop="username" label="用户名" width="160"></el-table-column>
        <el-table-column prop="password" label="密码" width="160"></el-table-column>
        <el-table-column prop="name" label="姓名" width="160" sortable></el-table-column>
        <el-table-column prop="sex" label="性别" width="160" sortable></el-table-column>
        <el-table-column prop="birthday" label="出生日期" width="300" sortable></el-table-column>
        <el-table-column prop="type" label="用户类型" min-width="160"></el-table-column>
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
            <el-form-item label="性别" :label-width="formLabelWidth">
              <el-select v-model="registerForm.new_sex" placeholder="请选择性别" style="width: 200px">
                <el-option value="男" label="男">男</el-option>
                <el-option value="女" label="女">女</el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="出生日期" :label-width="formLabelWidth">
              <el-date-picker type="date" placeholder="选择出生时间" v-model="registerForm.new_birthday"
                              style="width: 200px;" value-format="yyyy-MM-dd" format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="用户类型" :label-width="formLabelWidth">
              <el-select v-model="registerForm.new_type" placeholder="请选择用户类型" style="width: 200px">
                <el-option value="指挥人员" label="指挥人员">指挥人员</el-option>
                <el-option value="专家" label="专家">专家</el-option>
                <el-option value="工作人员" label="工作人员">工作人员</el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取消</el-button>
            <el-button type="primary" @click="dialogClick">添加</el-button>
          </div>
        </el-dialog>
      </el-table>
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
      userItem: [],
      multipleSelection: null,
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
      }
    };
  },
  methods: {
    getUserInfo() {
      this.userItem = [
        {
          id: 1,
          username: "admin",
          password: "admin",
          name: "王二",
          sex: "男",
          birthday: "1978-03-09",
          type: "管理员"
        },
        {
          id: 2,
          username: "cmd",
          password: "cmd",
          name: "李华",
          sex: "男",
          birthday: "1980-10-04",
          type: "指挥人员"
        },
        {
          id: 3,
          username: "expert",
          password: "expert",
          name: "张强",
          sex: "男",
          birthday: "1970-05-25",
          type: "专家"
        },
        {
          id: 4,
          username: "stuff",
          password: "stuff",
          name: "王喆",
          sex: "男",
          birthday: "1990-12-12",
          type: "工作人员"
        }
      ];
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
        type: this.registerForm.new_type
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
    }
  }
};
</script>
