<template>
  <div>
    <div v-show="parkshow" id="park">
      <div>
        <h5 style="height: 5px;margin-top: -60px;color: #0868e5;text-align: left;padding: 5px">设备列表</h5>
        <el-input v-model="search" placeholder="搜索">
          <i slot="prepend" class="el-icon-search"></i>
        </el-input>
        <el-button icon="el-icon-delete" type="danger"></el-button>
      </div>
      <div class="pageList">
        <el-table :header-cell-style="{ background: '#1c1717',lineHeight: '10px'}" :cell-style="{backgroundColor: '#1c1717' }"
                  :data="pageList.slice((currentPage-1)*pageSize,currentPage*pageSize)">
        <el-table-column label="设备名称" prop="name" width="120">
        </el-table-column>
        <el-table-column label="状态" width="120">
          <template slot-scope="scope">
            <span :style="{'color':scope.row.online_status?'green':'red'}">{{ scope.row.online_status?'在线':'不在线' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120">
          <template slot-scope="scope">
            <el-link :underline="false">{{ scope.row.sm_obj.detail }}</el-link>&nbsp;&nbsp;
            <el-link :underline="false">{{ scope.row.sm_obj.points }}</el-link>
          </template>
        </el-table-column>
        </el-table>
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-size="pageSize"
            :pager-count="pageCount"
            small
            layout="total,prev, pager, next"
            :total="pageList.length">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ParkQuery",
  props: {
    parkshow: {
      type: Boolean
    }
  },
  methods:{
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  },
  data() {
    return {
      pageList: [
        {
          name: '植物园',
          online_status: true,
          sm_obj:{
            detail: '详情',
            points: '定位'
          }
        },
        {
          name: '野猪林',
          online_status: false,
          sm_obj:{
            detail: '详情',
            points: '定位'
          }
        },
        {
          name: '野猪林',
          online_status: false,
          sm_obj:{
            detail: '详情',
            points: '定位'
          }
        }
      ],
      search: '',
      currentPage:1,
      pageSize:10,
      pageCount:9
    }
  }
}
</script>
<style scoped>
#park {
  margin-left: 70%;
  margin-top: -19px;
  height: 900px;
  width: 380px;
  opacity: 0.89;
  float: right;
  position: fixed;
  background: #1c1717;
  z-index: 2147483648;
}

.el-input {
  margin-top: 65px;
  margin-left: -147px;
  position: absolute;
  width: 200px;
  font-size: 12px;
  float: right;
}
.el-button{
  margin-top: 65px;
  margin-left: 60px;
  position: absolute;
}
.pageList {
  margin-top: 135px;
  border-top: 1px #ffffff solid;
}
.el-table{
   background-color: #1c1717
}
.el-pagination{
  width: 300px;
  font-size: 12px;
}
</style>
