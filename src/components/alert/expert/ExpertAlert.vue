<template>
  <section>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="padding-bottom: 40px">
      <el-tooltip content="点我返回首页" placement="bottom" effect="light">
        <el-breadcrumb-item :to="{path: '/home-expert/initial'}">专家首页</el-breadcrumb-item>
      </el-tooltip>
      <el-breadcrumb-item>接报维护</el-breadcrumb-item>
      <el-breadcrumb-item>接报信息管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-col :span="24" class="toolbar" style="padding-bottom: 0;">
      <el-form :inline="true" :model="filters">
        <el-form-item label="接报ID">
          <el-input v-model="filters.input_id" placeholder="请输入接报ID"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" v-on:click="getAlertInfo">查询</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <template>
      <el-table ref="multipleTable" :data="alertItem" highlight-current-row v-loading="loading" tooltip-effect="dark" style="width: 100%;" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="30"></el-table-column>
        <el-table-column prop="id" label="接报ID" width="100" align="center" sortable></el-table-column>
        <el-table-column prop="emergency_name" label="事件名称" width="100" align="center"></el-table-column>
        <el-table-column prop="company_code" label="企业编号" width="100" align="center"></el-table-column>
        <el-table-column prop="code" label="事件代码" width="100" align="center"></el-table-column>
        <el-table-column prop="process_id" label="流程ID" width="80" align="center"></el-table-column>
        <el-table-column prop="p_name" label="报警人" width="100" align="center"></el-table-column>
        <el-table-column prop="p_tel" label="报警人电话" width="100" align="center"></el-table-column>
        <el-table-column prop="alert_time" label="接报时间" width="100" align="center"></el-table-column>
        <el-table-column prop="process_p_name" label="流程创建者" width="100" align="center"></el-table-column>
        <el-table-column prop="process_create" label="流程创建时间" width="120" align="center"></el-table-column>
        <el-table-column prop="update_id" label="最后更新者编号" width="120" align="center"></el-table-column>
        <el-table-column prop="process_update" label="最后更新时间" width="120" align="center"></el-table-column>
        <el-table-column prop="process_state" label="流程状态" width="100" align="center"></el-table-column>
        <el-table-column label="操作" align="center" min-width="100">
          <template scope="scope">
            <el-button size="small" type="danger" @click="handleEdit(scope.$index, scope.row)">处理</el-button>
          </template>
        </el-table-column>
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
      alertItem: [
        {
          id: 1,
          emergency_name: "事件1",
          company_code: "XX01",
          code: "YY01",
          process_id: "1",
          p_name: "王小明",
          p_tel: "123456",
          alert_time: "2021-05-10",
          process_p_name: "丛林",
          process_create: "2021-05-10",
          update_id: "3",
          process_update: "2021-05-10",
          process_state: "已结束"
        },
        {
          id: 2,
          emergency_name: "事件2",
          company_code: "XX02",
          code: "YY02",
          process_id: "2",
          p_name: "周志强",
          p_tel: "234567",
          alert_time: "2021-05-10",
          process_p_name: "丛林",
          process_create: "2021-05-11",
          update_id: "3",
          process_update: "2021-05-13",
          process_state: "已结束"
        },
        {
          id: 3,
          emergency_name: "事件3",
          company_code: "XX03",
          code: "YY03",
          process_id: "3",
          p_name: "李莉",
          p_tel: "345678",
          alert_time: "2021-05-10",
          process_p_name: "丛林",
          process_create: "2021-05-15",
          update_id: "3",
          process_update: "2021-05-17",
          process_state: "已结束"
        }
      ],
      multipleSelection: [],
      dialogFormVisible: false,
      formLabelWidth: "150px",
      addAlertItem: {
        new_id: "",
        new_emergency_name: "",
        new_company_code: "",
        new_code: "",
        new_process_id: "",
        new_p_name: "",
        new_p_tel: "",
        new_alert_time: "",
        new_process_p_name: "",
        new_process_create: "",
        new_update_id: "",
        new_process_update: "",
        new_process_state: ""
      },
      editFormVisible: false,
      editFormId: 0,
      editForm: {
        id: "",
        emergency_name: "",
        company_code: "",
        code: "",
        process_id: "",
        p_name: "",
        p_tel: "",
        alert_time: "",
        process_p_name: "",
        process_create: "",
        update_id: "",
        process_update: "",
        process_state: ""
      }
    };
  },
  methods: {
    getAlertInfo() {
      // TODO 完善一下查询
      this.loading = false;
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    addAlertInfo() {
      this.dialogFormVisible = true;
    },
    dialogClick() {
      this.dialogFormVisible = false;
      let new_obj = {
        id: this.addAlertItem.new_id,
        emergency_name: this.addAlertItem.new_emergency_name,
        company_code: this.addAlertItem.new_company_code,
        code: this.addAlertItem.new_code,
        process_id: this.addAlertItem.new_process_id,
        p_name: this.addAlertItem.new_p_name,
        p_tel: this.addAlertItem.new_p_tel,
        alert_time: this.addAlertItem.new_alert_time,
        process_p_name: this.addAlertItem.new_process_p_name,
        process_create: this.addAlertItem.new_process_create,
        update_id: this.addAlertItem.new_update_id,
        process_update: this.addAlertItem.new_process_update,
        process_state: this.addAlertItem.new_process_state
      };
      this.alertItem.push(new_obj);
      this.addAlertItem.new_id = "";
      this.addAlertItem.new_emergency_name = "";
      this.addAlertItem.new_company_code = "";
      this.addAlertItem.new_code = "";
      this.addAlertItem.new_process_id = "";
      this.addAlertItem.new_p_name = "";
      this.addAlertItem.new_p_tel = "";
      this.addAlertItem.new_alert_time = "";
      this.addAlertItem.new_process_p_name = "";
      this.addAlertItem.new_process_create = "";
      this.addAlertItem.new_update_id = "";
      this.addAlertItem.new_process_update = "";
      this.addAlertItem.new_process_state = ""
      this.$message({
        message: "添加成功！",
        company_code: "success"
      });
    },
    handleEdit: function(index, row) {
      this.editFormVisible = true;
      this.editFormId = row.id;
      this.editForm = Object.assign({}, row);
    },
    handleDelete: function(index, row) {
      this.$confirm("确认删除该接报信息吗?", "提示", {
        type: "warning"
      }).then(() => {
        this.loading = true;
        setTimeout(() => {
          this.alertItem.splice(index, 1);
          this.loading = false;
          this.$message({
            message: "删除成功",
            company_code: "success"
          });
        }, 1500);
      });
    },
    editSubmit: function() {
      this.$refs.editForm.validate(valid => {
        this.$confirm("确认提交吗？", "提示", {}).then(() => {
          this.loading = true;
          setTimeout(() => {
            this.alertItem.forEach(item => {
              if (item.id === this.editFormId) {
                item.id = this.editForm.id;
                item.emergency_name = this.editForm.emergency_name;
                item.new_code = this.editForm.code;
                item.company_code = this.editForm.company_code;
                item.process_id = this.editForm.process_id;
                item.p_name = this.editForm.p_name;
                item.p_tel = this.editForm.p_tel;
                item.alert_time = this.editForm.alert_time;
                item.process_p_name = this.editForm.process_p_name;
                item.process_create = this.editForm.process_create;
                item.update_id = this.editForm.update_id;
                item.process_update = this.editForm.process_update;
                item.process_state = this.editForm.process_state;
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
      this.$confirm("确认是否删除这些接报信息?", "提示", {
        type: "warning"
      }).then(() => {
        this.loading = true;
        setTimeout(() => {
          let tempItem = [];
          this.alertItem.forEach(item => {
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
          this.alertItem = tempItem;
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
