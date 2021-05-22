<template>
  <section>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="padding-bottom: 40px">
      <el-tooltip content="点我返回首页" placement="bottom" effect="light">
        <el-breadcrumb-item :to="{path: '/home-staff/initial'}">工作人员首页</el-breadcrumb-item>
      </el-tooltip>
      <el-breadcrumb-item>城市信息维护</el-breadcrumb-item>
      <el-breadcrumb-item>交通信息管理</el-breadcrumb-item>
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
          <el-button type="primary" icon="el-icon-circle-plus" @click="addTrafficInfo">添加交通情况</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <template>
      <el-table ref="multipleTable" :data="searchTrafficList" highlight-current-row v-loading="loading" tooltip-effect="dark" style="width: 100%;" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="50"></el-table-column>
        <el-table-column prop="id" label="ID" width="70" align="left" sortable></el-table-column>
        <el-table-column prop="name" label="城市名称" width="120" align="center"></el-table-column>
        <el-table-column prop="start" label="起点" width="120" align="center"></el-table-column>
        <el-table-column prop="s_type" label="起点类型" width="150" align="center"></el-table-column>
        <el-table-column prop="end" label="终点" width="120" align="center"></el-table-column>
        <el-table-column prop="e_type" label="终点类型" width="150" align="center"></el-table-column>
        <el-table-column prop="length" label="长度" width="120" align="center"></el-table-column>
        <el-table-column prop="remark" label="备注" width="150" align="center"></el-table-column>
        <el-table-column label="操作" align="center" min-width="180">
          <template scope="scope">
            <el-button size="small" icon="el-icon-edit-outline" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="small" icon="el-icon-remove" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
        <el-dialog title="编辑" :visible.sync="editFormVisible" :append-to-body="true" width="500px" center>
          <el-form :model="editForm" ref="editForm">
            <el-form-item label="城市ID：" :label-width="formLabelWidth">
              <el-input v-model="editForm.id" style="width: 200px" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item maxlength="10" show-word-limit label="城市名称：" :label-width="formLabelWidth">
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
        <el-dialog title="添加交通情况" :visible.sync="trafficVisible" width="600px" :append-to-body="true" center>
          <el-form :model="addTrafficItem">
            <el-form-item label="交通情况ID：" :label-width="formLabelWidth">
              <el-input v-model="addTrafficItem.id" style="width: 300px"></el-input>
            </el-form-item>
            <el-form-item label="城市名称：" :label-width="formLabelWidth">
              <el-input v-model="addTrafficItem.id" style="width: 300px"></el-input>
            </el-form-item>
            <el-form-item label="起点：" :label-width="formLabelWidth">
              <div>
                <el-input v-model="addTrafficItem.start" class="input-with-select" style="width: 300px">
                  <template #append>
                    <el-select v-model="select" placeholder="企业" style="width: 80px">
                      <el-option label="企业" value="1"></el-option>
                      <el-option label="物资点" value="2"></el-option>
                    </el-select>
                  </template>
                </el-input>
              </div>
            </el-form-item>
            <el-form-item label="终点：" :label-width="formLabelWidth">
              <div>
                <el-input v-model="addTrafficItem.end" class="input-with-select" style="width: 300px">
                  <template #append>
                    <el-select v-model="select" placeholder="企业" style="width: 80px">
                      <el-option label="企业" value="1"></el-option>
                      <el-option label="物资点" value="2"></el-option>
                    </el-select>
                  </template>
                </el-input>
              </div>
            </el-form-item>
            <el-form-item label="长度(km)：" :label-width="formLabelWidth">
              <el-input-number v-model="addTrafficItem.length" :precision="2" :step="0.1" :max="10" style="width: 300px"></el-input-number>
            </el-form-item>
            <el-form-item label="备注：" :label-width="formLabelWidth">
              <el-input type="textarea" :rows="2" style="width: 300px" v-model="textarea"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="trafficVisible=false">取消</el-button>
            <el-button type="primary">添加</el-button>
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
      trafficList: [
        {
          id: 1,
          name: "沈阳",
          start: "和平路4号",
          s_type: "企业",
          end: "辽沈路21号",
          e_type: "物资点",
          length: "3.23km",
          remark: "路况不好"
        },
        {
          id: 2,
          name: "沈阳",
          start: "经纬路1号",
          s_type: "物资点",
          end: "浑南路29号",
          e_type: "物资点",
          length: "29.12km",
          remark: "道路拥挤"
        },
        {
          id: 3,
          name: "天津",
          start: "天大路5号",
          s_type: "企业",
          end: "南开路9号",
          e_type: "物资点",
          length: "9.01km",
          remark: "可行驶重型车辆"
        },
        {
          id: 4,
          name: "上海",
          start: "复旦路1号",
          s_type: "物资点",
          end: "交大路1号",
          e_type: "物资点",
          length: "5.00km",
          remark: "路面正在维修"
        },
        {
          id: 5,
          name: "大连",
          start: "连理路42号",
          s_type: "企业",
          end: "航母路11号",
          e_type: "物资点",
          length: "34.03km",
          remark: "无"
        },
        {
          id: 6,
          name: "北京",
          start: "北大路1号",
          s_type: "企业",
          end: "清华路1号",
          e_type: "企业",
          length: "6.66km",
          remark: "道路通畅"
        }
      ],
      searchTrafficList: [],
      multipleSelection: [],
      dialogFormVisible: false,
      formLabelWidth: "150px",
      addCityItem: {
        id: "",
        name: "",
        start: "",
        s_type: "",
        end: "",
        e_type: "",
        length: "",
        remark: ""
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
      },
      trafficVisible: false,
      addTrafficItem: {
        id: "",
        start: "",
        end: "",
        length: "",
        memo: ""
      }
    };
  },
  methods: {
    getMaterialInfo() {
      this.loading = false;
      if (this.filters.input_id === "") {
        this.searchTrafficList = JSON.parse(JSON.stringify(this.trafficList));
      } else {
        this.searchTrafficList = [];
        for (let item in this.trafficList) {
          if (JSON.stringify(this.trafficList[item]).search(this.filters.input_id) !== -1) {
            this.searchTrafficList.push(this.trafficList[item]);
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
        start: this.addCityItem.start,
        s_type: this.addCityItem.s_type,
        end: this.addCityItem.end,
        e_type: this.addCityItem.e_type,
        length: this.addCityItem.length,
        remark: this.addCityItem.remark
      };
      this.trafficList.push(obj);
      this.addCityItem.id = "";
      this.addCityItem.name = "";
      this.addCityItem.start = "";
      this.addCityItem.s_type = "";
      this.addCityItem.end = "";
      this.addCityItem.e_type = "";
      this.addCityItem.length = "";
      this.addCityItem.remark = "";
      this.searchTrafficList = JSON.parse(JSON.stringify(this.trafficList));
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
          this.trafficList.splice(index, 1);
          this.searchTrafficList = JSON.parse(JSON.stringify(this.trafficList));
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
            this.trafficList.forEach(item => {
              if (item.id === this.editFormId) {
                item.id = this.editForm.id;
                item.name = this.editForm.name;
                item.code = this.editForm.code;
                item.province = this.editForm.province;
                item.p_num = this.editForm.p_num;
                item.car_num = this.editForm.car_num;
              }
            });
            this.searchTrafficList = JSON.parse(JSON.stringify(this.trafficList));
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
          this.trafficList.forEach(item => {
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
          this.trafficList = tempItem;
          this.searchTrafficList = JSON.parse(JSON.stringify(this.trafficList));
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
