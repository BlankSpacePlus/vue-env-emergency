<template>
  <section>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="padding-bottom: 40px">
      <el-tooltip content="点我返回首页" placement="bottom" effect="light">
        <el-breadcrumb-item :to="{path: '/home-staff/initial'}">工作人员首页</el-breadcrumb-item>
      </el-tooltip>
      <el-breadcrumb-item>风险企业信息维护</el-breadcrumb-item>
      <el-breadcrumb-item>风险企业信息管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-col :span="24" class="toolbar" style="padding-bottom: 0;">
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <el-input v-model="filters.input_id" placeholder="请输入关键词"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" v-on:click="getCompanyInfo">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-circle-plus" @click="addCompanyInfo">添加风险企业</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <template>
      <el-table stripe ref="multipleTable" :data="searchCompanyList" highlight-current-row v-loading="loading" tooltip-effect="dark" style="width: 100%;" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="50"></el-table-column>
        <el-table-column prop="id" label="ID" width="70" align="left" sortable></el-table-column>
        <el-table-column prop="name" label="风险企业名称" width="150" align="center"></el-table-column>
        <el-table-column prop="corporate" label="企业法人" width="150" align="center"></el-table-column>
        <el-table-column prop="tel" label="企业法人联系方式" width="150" align="center"></el-table-column>
        <el-table-column prop="location" label="企业位置" width="150" align="center"></el-table-column>
        <el-table-column prop="position" label="企业经纬度" width="150" align="center"></el-table-column>
        <el-table-column prop="type" label="企业类型" width="150" align="center"></el-table-column>
        <el-table-column label="操作" align="center" min-width="200">
          <template scope="scope">
            <el-button size="small" icon="el-icon-edit-outline" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="small" icon="el-icon-remove" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
        <el-dialog title="添加风险企业" :visible.sync="dialogFormVisible" width="500px" :append-to-body="true" center>
          <el-form :model="addCompanyItem">
            <el-form-item label="风险企业ID：" :label-width="formLabelWidth">
              <el-input v-model="addCompanyItem.id" style="width: 200px"></el-input>
            </el-form-item>
            <el-form-item label="风险企业名称：" :label-width="formLabelWidth">
              <el-input v-model="addCompanyItem.name" style="width: 200px"></el-input>
            </el-form-item>
            <el-form-item label="企业法人：" :label-width="formLabelWidth">
              <el-input maxlength="10" show-word-limit v-model="addCompanyItem.corporate" style="width: 200px"></el-input>
            </el-form-item>
            <el-form-item label="企业法人联系方式：" :label-width="formLabelWidth">
              <el-input v-model="addCompanyItem.tel" style="width: 200px"></el-input>
            </el-form-item>
            <el-form-item label="企业位置：" :label-width="formLabelWidth">
              <el-input v-model="addCompanyItem.location" style="width: 200px"></el-input>
            </el-form-item>
            <el-form-item label="企业经纬度：" :label-width="formLabelWidth">
              <el-input v-model="addCompanyItem.position" style="width: 200px"></el-input>
            </el-form-item>
            <el-form-item label="企业类型：" :label-width="formLabelWidth">
              <el-select v-model="addCompanyItem.type" placeholder="请选择企业风险类型" style="width: 200px">
                <el-option value="易燃易爆" label="易燃易爆">易燃易爆</el-option>
                <el-option value="易发生产事故" label="易发生产事故">易发生产事故</el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible=false">取消</el-button>
            <el-button type="primary" @click="dialogClick">添加</el-button>
          </div>
        </el-dialog>
        <el-dialog title="编辑" :visible.sync="editFormVisible" :append-to-body="true" width="500px" center>
          <el-form :model="editForm" ref="editForm">
            <el-form-item label="风险企业ID：" :label-width="formLabelWidth">
              <el-input v-model="editForm.id" style="width: 200px" :readonly="true"></el-input>
            </el-form-item>
            <el-form-item label="风险企业名称：" :label-width="formLabelWidth">
              <el-input maxlength="10" show-word-limit v-model="editForm.name" style="width: 200px"></el-input>
            </el-form-item>
            <el-form-item label="企业法人：" :label-width="formLabelWidth">
              <el-input maxlength="10" show-word-limit v-model="editForm.corporate" style="width: 200px"></el-input>
            </el-form-item>
            <el-form-item label="企业法人联系方式：" :label-width="formLabelWidth">
              <el-input v-model="editForm.tel" style="width: 200px"></el-input>
            </el-form-item>
            <el-form-item label="企业位置：" :label-width="formLabelWidth">
              <el-input v-model="editForm.location" style="width: 200px"></el-input>
            </el-form-item>
            <el-form-item label="企业经纬度：" :label-width="formLabelWidth">
              <el-input v-model="editForm.position" style="width: 200px"></el-input>
            </el-form-item>
            <el-form-item label="企业类型：" :label-width="formLabelWidth">
              <el-select v-model="editForm.type" placeholder="请选择企业风险类型" style="width: 200px">
                <el-option value="易燃易爆" label="易燃易爆">易燃易爆</el-option>
                <el-option value="易发生产事故" label="易发生产事故">易发生产事故</el-option>
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
      companyList: [
        {
          id: 1,
          name: "QAQ毛纺厂",
          corporate: "阿Q",
          tel: "178000012344",
          location: "宁夏",
          position: "38N,106E",
          type: "易燃易爆"
        },
        {
          id: 2,
          name: "锅爷煤矿",
          corporate: "郭锅锅",
          tel: "199699699699",
          location: "沈阳",
          position: "41N,123E",
          type: "易发生产事故"
        },
        {
          id: 3,
          name: "铁娃面粉厂",
          corporate: "李静",
          tel: "188288728902",
          location: "南京",
          position: "31N,118E",
          type: "易燃易爆"
        },
        {
          id: 4,
          name: "北大印刷厂",
          corporate: "贝达",
          tel: "184359822182",
          location: "北京",
          position: "46N,901E",
          type: "易燃"
        },
        {
          id: 5,
          name: "清华钢铁厂",
          corporate: "秦化",
          tel: "13582863181",
          location: "北京",
          position: "47N,900E",
          type: "易爆"
        },
        {
          id: 6,
          name: "复旦化工厂",
          corporate: "付丹",
          tel: "115742728735",
          location: "上海",
          position: "33N,298E",
          type: "易燃易爆"
        }
      ],
      searchCompanyList: [],
      multipleSelection: [],
      dialogFormVisible: false,
      formLabelWidth: "150px",
      addCompanyItem: {
        id: "",
        name: "",
        corporate: "",
        tel: "",
        location: "",
        position: "",
        type: ""
      },
      editFormVisible: false,
      editFormId: 0,
      editForm: {
        id: "",
        name: "",
        corporate: "",
        tel: "",
        location: "",
        position: "",
        type: ""
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
    getCompanyInfo() {
      this.loading = false;
      if (this.filters.input_id === "") {
        this.searchCompanyList = JSON.parse(JSON.stringify(this.companyList));
      } else {
        this.searchCompanyList = [];
        for (let item in this.companyList) {
          if (JSON.stringify(this.companyList[item]).search(this.filters.input_id) !== -1) {
            this.searchCompanyList.push(this.companyList[item]);
          }
        }
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    addCompanyInfo() {
      this.dialogFormVisible = true;
    },
    dialogClick() {
      this.dialogFormVisible = false;
      let obj = {
        id: this.addCompanyItem.id,
        name: this.addCompanyItem.name,
        corporate: this.addCompanyItem.corporate,
        tel: this.addCompanyItem.tel,
        location: this.addCompanyItem.location,
        position: this.addCompanyItem.position,
        type: this.addCompanyItem.type
      };
      this.companyList.push(obj);
      this.addCompanyItem.id = "";
      this.addCompanyItem.name = "";
      this.addCompanyItem.corporate = "";
      this.addCompanyItem.tel = "";
      this.addCompanyItem.location = "";
      this.addCompanyItem.position = "";
      this.addCompanyItem.type = "";
      this.searchCompanyList = JSON.parse(JSON.stringify(this.companyList));
      this.$message({
        message: "添加成功！",
        corporate: "success"
      });
    },
    handleEdit: function(index, row) {
      this.editFormVisible = true;
      this.editFormId = row.id;
      this.editForm = Object.assign({}, row);
    },
    handleDelete: function(index, row) {
      this.$confirm("确认删除该风险企业信息吗?", "提示", {
        type: "warning"
      }).then(() => {
        this.loading = true;
        setTimeout(() => {
          this.companyList.splice(index, 1);
          this.searchCompanyList = JSON.parse(JSON.stringify(this.companyList));
          this.loading = false;
          this.$message({
            message: "删除成功",
            corporate: "success"
          });
        }, 10);
      });
    },
    editSubmit: function() {
      this.$refs.editForm.validate(valid => {
        this.$confirm("确认提交吗？", "提示", {}).then(() => {
          this.loading = true;
          setTimeout(() => {
            this.companyList.forEach(item => {
              if (item.id === this.editFormId) {
                item.id = this.editForm.id;
                item.name = this.editForm.name;
                item.corporate = this.editForm.corporate;
                item.tel = this.editForm.tel;
                item.location = this.editForm.location;
                item.position = this.editForm.position;
                item.type = this.editForm.type;
              }
            });
            this.searchCompanyList = JSON.parse(JSON.stringify(this.companyList));
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
      this.$confirm("确认是否删除这些风险企业信息?", "提示", {
        type: "warning"
      }).then(() => {
        this.loading = true;
        setTimeout(() => {
          let tempItem = [];
          this.companyList.forEach(item => {
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
          this.companyList = tempItem;
          this.searchCompanyList = JSON.parse(JSON.stringify(this.companyList));
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
