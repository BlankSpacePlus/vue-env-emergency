<template>
  <section>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="padding-bottom: 40px">
      <el-tooltip content="点我返回首页" placement="bottom" effect="light">
        <el-breadcrumb-item :to="{path: '/home-staff/initial'}">工作人员首页</el-breadcrumb-item>
      </el-tooltip>
      <el-breadcrumb-item>城市信息维护</el-breadcrumb-item>
      <el-breadcrumb-item>城市信息管理</el-breadcrumb-item>
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
          <el-button type="primary" icon="el-icon-circle-plus" @click="addMaterialInfo">添加城市</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <template>
      <el-table stripe ref="multipleTable" :data="searchCityList" highlight-current-row v-loading="loading"
                tooltip-effect="dark" style="width: 100%;" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="50"></el-table-column>
        <el-table-column prop="id" label="ID" width="70" align="left" sortable></el-table-column>
        <el-table-column prop="name" label="城市名称" width="180" align="center"></el-table-column>
        <el-table-column prop="code" label="城市编码" width="180" align="center"></el-table-column>
        <el-table-column prop="province" label="城市所属省份" width="180" align="center"></el-table-column>
        <el-table-column prop="p_num" label="城市救援人数" width="180" align="center"></el-table-column>
        <el-table-column prop="car_num" label="城市救援车辆数" width="180" align="center"></el-table-column>
        <el-table-column label="操作" align="center" min-width="200">
          <template scope="scope">
            <el-button size="small" icon="el-icon-edit-outline" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="small" icon="el-icon-remove" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
        <el-dialog title="添加城市" :visible.sync="dialogFormVisible" width="500px" :append-to-body="true" center>
          <el-form :model="addCityItem">
            <el-form-item label="城市ID：" :label-width="formLabelWidth">
              <el-input v-model="addCityItem.id" style="width: 200px"></el-input>
            </el-form-item>
            <el-form-item label="省市选择：" :label-width="formLabelWidth">
              <el-cascader size="large" :options="city_options" style="width:200px" v-model="addCityItem.selectedOptions" @change="addAddressChange"></el-cascader>
            </el-form-item>
            <el-form-item label="城市救援人数：" :label-width="formLabelWidth">
              <el-input-number v-model="addCityItem.p_num" :min="1" :max="10000" style="width: 200px"></el-input-number>
            </el-form-item>
            <el-form-item label="城市救援车辆数：" :label-width="formLabelWidth">
              <el-input-number v-model="addCityItem.car_num" :min="1" :max="1000" style="width: 200px"></el-input-number>
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
              <el-input v-model="editForm.id" style="width: 200px" :readonly="true"></el-input>
            </el-form-item>
            <el-form-item label="省市选择：" :label-width="formLabelWidth">
              <el-cascader size="large" :options="city_options" style="width:200px" v-model="editForm.selectedOptions" @change="editAddressChange"></el-cascader>
            </el-form-item>
            <el-form-item label="城市救援人数：" :label-width="formLabelWidth">
              <el-input-number v-model="editForm.p_num" :min="1" :max="10000" style="width: 200px"></el-input-number>
            </el-form-item>
            <el-form-item label="城市救援车辆数：" :label-width="formLabelWidth">
              <el-input-number v-model="editForm.car_num" :min="1" :max="1000" style="width: 200px"></el-input-number>
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
// 不加引号会gg
import {provinceAndCityData, CodeToText} from 'element-china-area-data';
export default {
  data() {
    return {
      filters: {
        input_id: "",
      },
      loading: false,
      currentPage: 1,
      city_options: provinceAndCityData,
      cityList: [
        {
          id: 1,
          name: "青岛",
          code: "370200",
          province: "山东",
          p_num: "1000",
          car_num: "200"
        },
        {
          id: 2,
          name: "成都",
          code: "510100",
          province: "四川",
          p_num: "1200",
          car_num: "250"
        },
        {
          id: 3,
          name: "温州",
          code: "330300",
          province: "浙江",
          p_num: "700",
          car_num: "220"
        },
        {
          id: 4,
          name: "南京",
          code: "320100",
          province: "江苏",
          p_num: "3211",
          car_num: "542"
        }
      ],
      searchCityList: [],
      multipleSelection: [],
      dialogFormVisible: false,
      formLabelWidth: "150px",
      addCityItem: {
        id: "",
        name: "",
        code: "",
        province: "",
        p_num: "",
        car_num: "",
        selectedOptions: [],
      },
      editFormVisible: false,
      editFormId: 0,
      editForm: {
        id: "",
        name: "",
        code: "",
        province: "",
        p_num: "",
        car_num: "",
        selectedOptions: [],
      },
      trafficVisible: false,
      addTrafficItem: {
        id: "",
        start: "",
        end: "",
        length: "",
        memo: ""
      },
    };
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页${val}条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    addAddressChange(arr) {
      this.addCityItem.province = CodeToText[this.addCityItem.selectedOptions[0]];
      this.addCityItem.name = CodeToText[this.addCityItem.selectedOptions[1]];
      this.addCityItem.code = this.addCityItem.selectedOptions[1];
    },
    editAddressChange(arr) {
      this.editForm.province = CodeToText[this.editForm.selectedOptions[0]];
      this.editForm.name = CodeToText[this.editForm.selectedOptions[1]];
      this.editForm.code = this.editForm.selectedOptions[1];
    },
    getMaterialInfo() {
      console.log(provinceAndCityData);
      this.loading = false;
      if (this.filters.input_id === "") {
        this.searchCityList = JSON.parse(JSON.stringify(this.cityList));
      } else {
        this.searchCityList = [];
        for (let item in this.cityList) {
          if (JSON.stringify(this.cityList[item]).search(this.filters.input_id) !== -1) {
            this.searchCityList.push(this.cityList[item]);
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
    addTrafficInfo() {
      this.trafficVisible = true;
    },
    dialogClick() {
      this.dialogFormVisible = false;
      let obj = {
        id: this.addCityItem.id,
        name: this.addCityItem.name,
        code: this.addCityItem.code,
        province: this.addCityItem.province,
        p_num: this.addCityItem.p_num,
        car_num: this.addCityItem.car_num
      };
      this.cityList.push(obj);
      this.addCityItem.id = "";
      this.addCityItem.name = "";
      this.addCityItem.code = "";
      this.addCityItem.province = "";
      this.addCityItem.p_num = "";
      this.addCityItem.car_num = "";
      this.searchCityList = JSON.parse(JSON.stringify(this.cityList));
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
          this.cityList.splice(index, 1);
          this.searchCityList = JSON.parse(JSON.stringify(this.cityList));
          this.loading = false;
          this.$message({
            message: "删除成功",
            code: "success"
          });
        }, 10);
      });
    },
    editSubmit: function() {
      this.$refs.editForm.validate(valid => {
        this.$confirm("确认提交吗？", "提示", {}).then(() => {
          this.loading = true;
          setTimeout(() => {
            this.cityList.forEach(item => {
              if (item.id === this.editFormId) {
                item.id = this.editForm.id;
                item.name = this.editForm.name;
                item.code = this.editForm.code;
                item.province = this.editForm.province;
                item.p_num = this.editForm.p_num;
                item.car_num = this.editForm.car_num;
              }
            });
            this.searchCityList = JSON.parse(JSON.stringify(this.cityList));
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
      this.$confirm("确认是否删除这些城市信息?", "提示", {
        type: "warning"
      }).then(() => {
        this.loading = true;
        setTimeout(() => {
          let tempItem = [];
          this.cityList.forEach(item => {
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
          this.cityList = tempItem;
          this.searchCityList = JSON.parse(JSON.stringify(this.cityList));
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
