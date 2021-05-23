<template>
  <section>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="padding-bottom: 40px">
      <el-tooltip content="点我返回首页" placement="bottom" effect="light">
        <el-breadcrumb-item :to="{path: '/home-staff/initial'}">工作人员首页</el-breadcrumb-item>
      </el-tooltip>
      <el-breadcrumb-item>接报信息维护</el-breadcrumb-item>
      <el-breadcrumb-item>接报信息管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-col :span="24" class="toolbar" style="padding-bottom: 0;">
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <el-input v-model="filters.input_id" placeholder="请输入关键词"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" v-on:click="getAlertInfo">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-circle-plus" @click="addAlertInfo">添加接报</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <template>
      <el-table stripe ref="multipleTable" :data="searchAlertList" highlight-current-row v-loading="loading" tooltip-effect="dark" style="width: 100%;" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="30"></el-table-column>
        <el-table-column prop="id" label="ID" width="70" align="left" sortable></el-table-column>
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
        <el-table-column prop="process_state" label="流程状态" width="100" align="center">
<!--          <template slot-scope="scope">-->
<!--            <el-popover trigger="hover" placement="top">-->
<!--              <p>姓名: {{1}}</p>-->
<!--              <p>住址: {{2}}</p>-->
<!--              <div slot="reference" class="name-wrapper">-->
<!--                <el-tag size="medium">{{3}}</el-tag>-->
<!--              </div>-->
<!--            </el-popover>-->
<!--          </template>-->
        </el-table-column>
        <el-table-column label="操作" align="center" min-width="200">
          <template scope="scope">
            <el-button size="small" icon="el-icon-edit-outline" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="small" icon="el-icon-remove" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
        <el-dialog title="添加接报" :visible.sync="dialogFormVisible" width="500px" :append-to-body="true" center>
          <el-form :model="addAlertItem">
            <el-form-item label="接报ID：" :label-width="formLabelWidth">
              <el-input v-model="addAlertItem.id" style="width: 200px"></el-input>
            </el-form-item>
            <el-form-item label="接报名称：" :label-width="formLabelWidth">
              <el-input v-model="addAlertItem.emergency_name" style="width: 200px"></el-input>
            </el-form-item>
            <el-form-item label="风险企业编号：" :label-width="formLabelWidth">
              <el-input v-model="addAlertItem.company_code" style="width: 200px"></el-input>
            </el-form-item>
            <el-form-item label="事件代码：" :label-width="formLabelWidth">
              <el-input v-model="addAlertItem.code" style="width: 200px"></el-input>
            </el-form-item>
            <el-form-item label="流程ID：" :label-width="formLabelWidth">
              <el-input v-model="addAlertItem.process_id" style="width: 200px"></el-input>
            </el-form-item>
            <el-form-item label="报警人：" :label-width="formLabelWidth">
              <el-input v-model="addAlertItem.p_name" style="width: 200px"></el-input>
            </el-form-item>
            <el-form-item label="报警人联系电话：" :label-width="formLabelWidth">
              <el-input v-model="addAlertItem.p_tel" style="width: 200px"></el-input>
            </el-form-item>
            <el-form-item label="接报时间：" :label-width="formLabelWidth">
              <el-date-picker type="date" placeholder="选择接报时间" v-model="addAlertItem.alert_time" style="width: 200px;" value-format="yyyy-MM-dd" format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="流程创建者：" :label-width="formLabelWidth">
              <el-input v-model="addAlertItem.process_p_name" style="width: 200px"></el-input>
            </el-form-item>
            <el-form-item label="流程创建时间：" :label-width="formLabelWidth">
              <el-date-picker type="date" placeholder="选择流程创建时间" v-model="addAlertItem.process_create" style="width: 200px;" value-format="yyyy-MM-dd" format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="最后更新者编号：" :label-width="formLabelWidth">
              <el-input v-model="addAlertItem.update_id" style="width: 200px"></el-input>
            </el-form-item>
            <el-form-item label="最后更新时间：" :label-width="formLabelWidth">
              <el-date-picker type="date" placeholder="选择最后更新时间" v-model="addAlertItem.process_update" style="width: 200px;" value-format="yyyy-MM-dd" format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="流程状态：" :label-width="formLabelWidth">
              <el-input v-model="addAlertItem.process_state" style="width: 200px"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible=false">取消</el-button>
            <el-button type="primary" @click="dialogClick">添加</el-button>
          </div>
        </el-dialog>
        <el-dialog title="编辑" :visible.sync="editFormVisible" :append-to-body="true" width="500px" center>
          <el-form :model="editForm" ref="editForm">
            <el-form-item label="接报ID：" :label-width="formLabelWidth">
              <el-input v-model="editForm.id" style="width: 200px"></el-input>
            </el-form-item>
            <el-form-item label="接报名称：" :label-width="formLabelWidth">
              <el-input v-model="editForm.emergency_name" style="width: 200px"></el-input>
            </el-form-item>
            <el-form-item label="风险企业编号：" :label-width="formLabelWidth">
              <el-input v-model="editForm.company_code" style="width: 200px"></el-input>
            </el-form-item>
            <el-form-item label="事件代码：" :label-width="formLabelWidth">
              <el-input v-model="editForm.code" style="width: 200px"></el-input>
            </el-form-item>
            <el-form-item label="流程ID：" :label-width="formLabelWidth">
              <el-input v-model="editForm.process_id" style="width: 200px"></el-input>
            </el-form-item>
            <el-form-item label="报警人：" :label-width="formLabelWidth">
              <el-input v-model="editForm.p_name" style="width: 200px"></el-input>
            </el-form-item>
            <el-form-item label="报警人联系电话：" :label-width="formLabelWidth">
              <el-input v-model="editForm.p_tel" style="width: 200px"></el-input>
            </el-form-item>
            <el-form-item label="接报时间：" :label-width="formLabelWidth">
              <el-date-picker type="date" placeholder="选择接报时间" v-model="editForm.alert_time" style="width: 200px;" value-format="yyyy-MM-dd" format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="流程创建者：" :label-width="formLabelWidth">
              <el-input v-model="editForm.process_p_name" style="width: 200px"></el-input>
            </el-form-item>
            <el-form-item label="流程创建时间：" :label-width="formLabelWidth">
              <el-date-picker type="date" placeholder="选择流程创建时间" v-model="editForm.process_create" style="width: 200px;" value-format="yyyy-MM-dd" format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="最后更新者编号：" :label-width="formLabelWidth">
              <el-input v-model="editForm.update_id" style="width: 200px"></el-input>
            </el-form-item>
            <el-form-item label="最后更新时间：" :label-width="formLabelWidth">
              <el-date-picker type="date" placeholder="选择最后更新时间" v-model="editForm.process_update" style="width: 200px;" value-format="yyyy-MM-dd" format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="流程状态：" :label-width="formLabelWidth">
              <el-input v-model="editForm.process_state" style="width: 200px"></el-input>
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
      alertList: [
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
          process_state: "待审批"
        }
      ],
      searchAlertList: [],
      multipleSelection: [],
      dialogFormVisible: false,
      formLabelWidth: "150px",
      addAlertItem: {
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
    handleSizeChange(val) {
      console.log(`每页${val}条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    getAlertInfo() {
      this.loading = false;
      if (this.filters.input_id === "") {
        this.searchAlertList = JSON.parse(JSON.stringify(this.alertList));
      } else {
        this.searchAlertList = [];
        for (let item in this.alertList) {
          if (JSON.stringify(this.alertList[item]).search(this.filters.input_id) !== -1) {
            this.searchAlertList.push(this.alertList[item]);
          }
        }
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    addAlertInfo() {
      this.dialogFormVisible = true;
    },
    dialogClick() {
      this.dialogFormVisible = false;
      let obj = {
        id: this.addAlertItem.id,
        emergency_name: this.addAlertItem.emergency_name,
        company_code: this.addAlertItem.company_code,
        code: this.addAlertItem.code,
        process_id: this.addAlertItem.process_id,
        p_name: this.addAlertItem.p_name,
        p_tel: this.addAlertItem.p_tel,
        alert_time: this.addAlertItem.alert_time,
        process_p_name: this.addAlertItem.process_p_name,
        process_create: this.addAlertItem.process_create,
        update_id: this.addAlertItem.update_id,
        process_update: this.addAlertItem.process_update,
        process_state: this.addAlertItem.process_state
      };
      this.alertList.push(obj);
      this.addAlertItem.id = "";
      this.addAlertItem.emergency_name = "";
      this.addAlertItem.company_code = "";
      this.addAlertItem.code = "";
      this.addAlertItem.process_id = "";
      this.addAlertItem.p_name = "";
      this.addAlertItem.p_tel = "";
      this.addAlertItem.alert_time = "";
      this.addAlertItem.process_p_name = "";
      this.addAlertItem.process_create = "";
      this.addAlertItem.update_id = "";
      this.addAlertItem.process_update = "";
      this.addAlertItem.process_state = ""
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
          this.alertList.splice(index, 1);
          this.searchAlertList = JSON.parse(JSON.stringify(this.alertList));
          this.loading = false;
          this.$message({
            message: "删除成功",
            company_code: "success"
          });
        }, 10);
      });
    },
    editSubmit: function() {
      this.$refs.editForm.validate(valid => {
        this.$confirm("确认提交吗？", "提示", {}).then(() => {
          this.loading = true;
          setTimeout(() => {
            this.alertList.forEach(item => {
              if (item.id === this.editFormId) {
                item.id = this.editForm.id;
                item.emergency_name = this.editForm.emergency_name;
                item.code = this.editForm.code;
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
            this.searchAlertList = JSON.parse(JSON.stringify(this.alertList));
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
      this.$confirm("确认是否删除这些接报信息?", "提示", {
        type: "warning"
      }).then(() => {
        this.loading = true;
        setTimeout(() => {
          let tempItem = [];
          this.alertList.forEach(item => {
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
          this.alertList = tempItem;
          this.searchAlertList = JSON.parse(JSON.stringify(this.alertList));
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
