<template>
  <section>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="padding-bottom: 40px">
      <el-tooltip content="点我返回首页" placement="bottom" effect="light">
        <el-breadcrumb-item :to="{path: '/home-commander/initial'}">指挥人员首页</el-breadcrumb-item>
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
      </el-form>
    </el-col>
    <template>
      <el-table stripe ref="multipleTable" :data="searchAlertItem" highlight-current-row v-loading="loading" tooltip-effect="dark" style="width: 100%;" @selection-change="handleSelectionChange">
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
        <el-table-column prop="process_state" label="流程状态" width="100" align="center"></el-table-column>
        <el-table-column label="操作" align="center" min-width="200">
          <template scope="scope">
            <el-button size="small" type="primary" @click="handleApprove(scope.$index, scope.row)">审批</el-button>
            <el-button size="small" type="primary" @click="handleReport(scope.$index, scope.row)">上报</el-button>
          </template>
        </el-table-column>
        <el-dialog title="添加接报" :visible.sync="dialogFormVisible" width="500px" :append-to-body="true" center>
          <el-form :model="addAlertItem">
            <el-form-item label="接报ID：" :label-width="formLabelWidth">
              <el-input v-model="addAlertItem.new_id" style="width: 200px"></el-input>
            </el-form-item>
            <el-form-item label="接报名称：" :label-width="formLabelWidth">
              <el-input v-model="addAlertItem.new_emergency_name" style="width: 200px"></el-input>
            </el-form-item>
            <el-form-item label="风险企业编号：" :label-width="formLabelWidth">
              <el-input v-model="addAlertItem.new_company_code" style="width: 200px"></el-input>
            </el-form-item>
            <el-form-item label="事件代码：" :label-width="formLabelWidth">
              <el-input v-model="addAlertItem.new_code" style="width: 200px"></el-input>
            </el-form-item>
            <el-form-item label="流程ID：" :label-width="formLabelWidth">
              <el-input v-model="addAlertItem.new_process_id" style="width: 200px"></el-input>
            </el-form-item>
            <el-form-item label="报警人：" :label-width="formLabelWidth">
              <el-input v-model="addAlertItem.new_p_name" style="width: 200px"></el-input>
            </el-form-item>
            <el-form-item label="报警人联系电话：" :label-width="formLabelWidth">
              <el-input v-model="addAlertItem.new_p_tel" style="width: 200px"></el-input>
            </el-form-item>
            <el-form-item label="接报时间：" :label-width="formLabelWidth">
              <el-date-picker type="date" placeholder="选择接报时间" v-model="addAlertItem.new_alert_time" style="width: 200px;" value-format="yyyy-MM-dd" format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="流程创建者：" :label-width="formLabelWidth">
              <el-input v-model="addAlertItem.new_process_p_name" style="width: 200px"></el-input>
            </el-form-item>
            <el-form-item label="流程创建时间：" :label-width="formLabelWidth">
              <el-date-picker type="date" placeholder="选择流程创建时间" v-model="addAlertItem.new_process_create" style="width: 200px;" value-format="yyyy-MM-dd" format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="最后更新者编号：" :label-width="formLabelWidth">
              <el-input v-model="addAlertItem.new_update_id" style="width: 200px"></el-input>
            </el-form-item>
            <el-form-item label="最后更新时间：" :label-width="formLabelWidth">
              <el-date-picker type="date" placeholder="选择最后更新时间" v-model="addAlertItem.new_process_update" style="width: 200px;" value-format="yyyy-MM-dd" format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="流程状态：" :label-width="formLabelWidth">
              <el-input v-model="addAlertItem.new_process_state" style="width: 200px"></el-input>
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
        <el-dialog title="审批意见" :visible.sync="passFormVisible" :append-to-body="true" width="500px" center>
          <el-form :model="passForm" ref="editForm">
            <el-form-item>
              <el-row type="flex" justify="center">
                <el-col>
                  <el-input type="textarea" maxlength="50" show-word-limit v-model="passForm.text" :rows="5"></el-input>
                </el-col>
              </el-row>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click.native="passFormVisible=false">不通过</el-button>
            <el-button type="primary" @click.native="editSubmit">通过</el-button>
          </div>
        </el-dialog>
        <el-dialog title="上报说明" :visible.sync="reportFormVisible" :append-to-body="true" width="500px" center>
          <el-form :model="reportForm" ref="editForm">
            <el-form-item>
              <el-row type="flex" justify="center">
                <el-col>
                  <el-input type="textarea" maxlength="50" show-word-limit v-model="reportForm.text" :rows="5"></el-input>
                </el-col>
              </el-row>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click.native="reportFormVisible=false">取消</el-button>
            <el-button type="primary" @click.native="report()">上报</el-button>
          </div>
        </el-dialog>
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
                     style="float:right;" :page-sizes="[10, 15, 20, 25, 30]" :page-size="10"
                     layout="total, sizes, prev, pager, next, jumper" :total="200" background>
      </el-pagination>
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
          process_state: "待审批"
        }
      ],
      searchAlertItem: [],
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
      },
      passForm: {
        text: ""
      },
      passFormVisible: false,
      passFormId: 0,
      reportForm: {
        text: ""
      },
      reportFormVisible: false,
      reportFormId: 0
    };
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页${val}条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    handleApprove(index, row) {
      this.passFormVisible = true;
      this.passFormId = row.id;
    },
    handleReport(index, row) {
      this.reportFormVisible = true;
      this.reportFormId = row.id;
    },
    getAlertInfo() {
      this.loading = false;
      if (this.filters.input_id === "") {
        this.searchAlertItem = JSON.parse(JSON.stringify(this.alertItem));
      } else {
        this.searchAlertItem = [];
        for (let item in this.alertItem) {
          if (JSON.stringify(this.alertItem[item]).search(this.filters.input_id) !== -1) {
            this.searchAlertItem.push(this.alertItem[item]);
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
          this.searchAlertItem = JSON.parse(JSON.stringify(this.alertItem));
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
            this.alertItem.forEach(item => {
              if (item.id === this.passFormId) {
                item.process_state = "已审批";
              }
            });
            this.searchAlertItem = JSON.parse(JSON.stringify(this.alertItem));
            this.loading = false;
            this.passFormVisible = false;
            this.$message({
              message: "提交成功",
              type: "success"
            });
            this.editFormVisible = false;
          }, 10);
        });
      });
    },
    report() {
      this.$confirm("确认上报吗?", "提示", {
        type: "warning"
      }).then(() => {
        this.loading = true;
        setTimeout(() => {
          this.reportFormVisible=false;
          this.loading = false;
          this.$message({
            message: "上报成功！",
            company_code: "success"
          });
        }, 10);
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
          this.searchAlertItem = JSON.parse(JSON.stringify(this.alertItem));
          this.loading = false;
          this.$confirm("确认提交吗？", "提示", {}).then(() => {
            //
          });
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
