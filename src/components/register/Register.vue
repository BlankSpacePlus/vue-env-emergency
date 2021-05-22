<template>
  <section>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="padding-bottom: 40px">
      <el-tooltip content="点我返回首页" placement="bottom" effect="light">
        <el-breadcrumb-item :to="{path: '/home-admin/initial'}">管理员首页</el-breadcrumb-item>
      </el-tooltip>
      <el-breadcrumb-item>人员维护</el-breadcrumb-item>
      <el-breadcrumb-item>用户信息管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-col :span="24" class="toolbar" style="padding-bottom: 0;">
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <el-input v-model="filters.input_id" placeholder="请输入关键词"></el-input>
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
      <el-table ref="multipleTable" :data="searchUserList" highlight-current-row v-loading="loading" tooltip-effect="dark" style="width: 100%;" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="id" label="ID" width="70" align="left" sortable></el-table-column>
        <el-table-column prop="username" label="用户名" width="130" align="center"></el-table-column>
        <el-table-column prop="password" label="密码" width="130" align="center"></el-table-column>
        <el-table-column prop="name" label="姓名" width="130" align="center" sortable></el-table-column>
        <el-table-column prop="sex" label="性别" width="120" align="center" sortable></el-table-column>
        <el-table-column prop="birthday" label="出生日期" width="130" align="center" sortable></el-table-column>
        <el-table-column prop="type" label="用户类型" min-width="130" align="center"></el-table-column>
        <el-table-column prop="state" label="账号状态" min-width="130" align="center">
          <template scope="scope">
            <el-switch style="display: block" v-model="scope.row.state" active-color="#13ce66" inactive-color="#ff4949"
                       active-text="正常" inactive-text="禁用" @change="handleSwitch(scope.$index, scope.row)">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" min-width="200">
          <template scope="scope">
            <el-button size="small" icon="el-icon-edit-outline" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="small" icon="el-icon-remove" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
        <el-dialog title="添加用户" :visible.sync="dialogFormVisible" width="400px" :append-to-body="true" center>
          <el-form :model="addUserItem">
            <el-form-item label="ID：" :label-width="formLabelWidth">
              <el-input v-model="addUserItem.id" style="width: 200px"></el-input>
            </el-form-item>
            <el-form-item label="用户名：" :label-width="formLabelWidth">
              <el-input v-model="addUserItem.username" style="width: 200px"></el-input>
            </el-form-item>
            <el-form-item label="密码：" :label-width="formLabelWidth">
              <el-input v-model="addUserItem.password" style="width: 200px"></el-input>
            </el-form-item>
            <el-form-item label="姓名：" :label-width="formLabelWidth">
              <el-input v-model="addUserItem.name" style="width: 200px"></el-input>
            </el-form-item>
            <el-form-item label="性别：" :label-width="formLabelWidth">
              <el-radio v-model="addUserItem.sex" label="男">男</el-radio>
              <el-radio v-model="addUserItem.sex" label="女">女</el-radio>
            </el-form-item>
            <el-form-item label="出生日期：" :label-width="formLabelWidth">
              <el-date-picker type="date" placeholder="选择出生时间" v-model="addUserItem.birthday" style="width: 200px;" value-format="yyyy-MM-dd" format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="用户类型：" :label-width="formLabelWidth">
              <el-select v-model="addUserItem.type" placeholder="请选择用户类型" style="width: 200px">
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
              <el-radio v-model="editForm.sex" label="男">男</el-radio>
              <el-radio v-model="editForm.sex" label="女">女</el-radio>
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
      userList: [
        {
          id: "1",
          username: "admin",
          password: "admin",
          name: "王二",
          sex: "男",
          birthday: "1978-03-09",
          type: "管理员",
          state: true
        },
        {
          id: "2",
          username: "cmd",
          password: "cmd",
          name: "李华",
          sex: "男",
          birthday: "1980-10-04",
          type: "指挥人员",
          state: true
        },
        {
          id: "3",
          username: "expert",
          password: "expert",
          name: "张强",
          sex: "男",
          birthday: "1970-05-25",
          type: "专家",
          state: true
        },
        {
          id: "4",
          username: "staff",
          password: "staff",
          name: "王喆",
          sex: "男",
          birthday: "1990-12-12",
          type: "工作人员",
          state: true
        }
      ],
      searchUserList: [],
      multipleSelection: [],
      dialogFormVisible: false,
      formLabelWidth: "100px",
      addUserItem: {
        id: "",
        username: "",
        password: "",
        name: "",
        sex: "男",
        birthday: "",
        type: "",
        state: true
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
        type: ""
      }
    };
  },
  methods: {
    getUserInfo() {
      this.loading = false;
      if (this.filters.input_id === "") {
        this.searchUserList = JSON.parse(JSON.stringify(this.userList));
      } else {
        this.searchUserList = [];
        for (let item in this.userList) {
          if (JSON.stringify(this.userList[item]).search(this.filters.input_id) !== -1) {
            this.searchUserList.push(this.userList[item]);
          }
        }
      }
    },
    handleSwitch(index, row) {
      let rowId = this.searchUserList[index].id;
      this.userList.forEach(item => {
        if (item.id === rowId) {
          item.state = this.searchUserList[index].state;
        }
      });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    addUserInfo() {
      this.dialogFormVisible = true;
    },
    dialogClick() {
      this.dialogFormVisible = false;
      this.userList.push(JSON.parse(JSON.stringify(this.addUserItem)));
      this.getUserInfo();
      this.addUserItem.id = "";
      this.addUserItem.username = "";
      this.addUserItem.password = "";
      this.addUserItem.name = "";
      this.addUserItem.sex = "男";
      this.addUserItem.birthday = "";
      this.addUserItem.type = "";
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
          let deleteId = this.searchUserList[index].id;
          this.searchUserList.splice(index, 1);
          let i = -1;
          this.userList.some(function (value, index, _arr) {
            i++;
            return value.id === deleteId;
          });
          this.userList.splice(i, 1);
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
            let i = -1, id = this.editFormId;
            this.userList.some(function (value, index, _arr) {
              i++;
              return value.id === id;
            });
            this.userList[i] = JSON.parse(JSON.stringify(this.editForm));
            this.getUserInfo();
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
      this.$confirm("确认是否删除这些用户信息?", "提示", {
        type: "warning"
      }).then(() => {
        this.loading = true;
        setTimeout(() => {
          let tempList = [];
          this.searchUserList.forEach(item => {
            let hasItem = false;
            this.multipleSelection.forEach(sele => {
              if (sele.id === item.id) {
                hasItem = true;
              }
            });
            if (!hasItem) {
              tempList.push(item);
            }
          });
          this.searchUserList = tempList;
          tempList = [];
          this.userList.forEach(item => {
            let hasItem = false;
            this.multipleSelection.forEach(sele => {
              if (sele.id === item.id) {
                hasItem = true;
              }
            });
            if (!hasItem) {
              tempList.push(item);
            }
          });
          this.userList = tempList;
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
