<template>
  <div>
    <div v-show="getParkShow" id="park">
      <div>
        <h5 style="height: 5px;margin-top: -60px;color: #0868e5;padding: 5px;left: -50%">设备列表</h5>
        <el-input size="mini" v-model.trim="search" @change="handleSearch" placeholder="搜索">
          <i slot="prepend" class="el-icon-search" style="color: #0868e5"></i>
        </el-input>
        <el-button icon="el-icon-delete" type="danger" size="mini" @click="clearSearch"></el-button>
      </div>
      <div class="pageList">
        <el-table size="mini"
                  style="width: 100%;right: 0"
                  height="270px" :header-cell-style="{ background: '#1c1717',lineHeight: '8px'}"
                  :cell-style="{backgroundColor: '#1c1717'}"
                  :data="getSearchedList.slice((currentPage-1)*pageSize,currentPage*pageSize)">
        <el-table-column label="点位名称" prop="name" width="100">
        </el-table-column>
        <el-table-column label="状态" width="80">
          <template slot-scope="scope">
            <span :style="{'color':scope.row.online_status?'green':'red'}">{{ scope.row.online_status?'在线':'不在线' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120">
          <template slot-scope="scope">
            <el-link @click="getDevice(scope.row.equip_uniq_num)">详情</el-link>&nbsp;&nbsp;
            <el-link @click="showDevice(scope.row.equip_uniq_num)">定位</el-link>
          </template>
        </el-table-column>
        </el-table>
        <ConditionDesc>
          <template slot-scope="data" v-if="showConditionDesc">
            <el-table size="mini" height="300px" style="width: 100%;right: 0;" :header-cell-style="{background: '#1c1717',lineHeight: '8px'}"
                      :cell-style="{backgroundColor: '#1c1717'}"
                      border
                      :data="data.descData">
              <el-table-column label="状态说明" prop="statusName" width="70px">
              </el-table-column>
              <el-table-column label="正常" prop="normal" width="65">
                <template slot="header">
                  &nbsp;正常<ColorOption color="#15d81d" width="30" marginTop="3px" />
                </template>
              </el-table-column>
              <el-table-column label="注意防范" prop="cautious" width="90">
                <template slot="header">
                  &nbsp;注意防范<ColorOption color="#FF7200" marginTop="3px"/>
                </template>
                <template slot-scope="scope">
                  {{ scope.row.cautious.toLocaleString() }}
                </template>
              </el-table-column>
              <el-table-column label="预警" prop="earlyWarning" width="120">
                <template slot="header">
                  &nbsp;预警<ColorOption color="#ff0000" marginTop="3px"/>
                </template>
                <template slot-scope="scope">
                  {{ scope.row.earlyWarning.toLocaleString() }}
                </template>
              </el-table-column>
            </el-table>
          </template>
        </ConditionDesc>
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
import ConditionDesc from '@/components/environment/conditionDesc'
import ColorOption from "@/components/common/colorOption";
export default {
  name: "ParkQuery",
  components:{
    ColorOption,
    ConditionDesc
  },
  props: {
    pageList:{
      type: Array,
      required: true
    },
    showConditionDesc:{
      type: Boolean
    }
  },
  computed:{
    getSearchedList(){
      if(this.search){
        return  this.pageList.filter((item)=>{
          if(item.name.indexOf(this.search)!==-1){
            return item
          }
        })
      }
      return this.pageList;
    },
    getParkShow(){
      return this.$store.state.parkShow
    }
  },
  methods:{
    handleSearch(){
      if(this.search){
        return this.pageList.filter((item)=>{
          if(item.name.indexOf(this.search)!==-1){
            return item
          }
        })
      }
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    getDevice(deviceId){
      // 子组件调用父组件的方法并传参
      this.$emit('deviceInfo', deviceId)
      console.log(deviceId)
    },
    showDevice(deviceId){
      this.$emit('deviceMarker',deviceId)
      console.log(deviceId)
    },
    clearSearch(){
      this.search = '';
    }
  },
  data() {
    return {
      search: '',
      currentPage:1,
      pageSize:5,
      pageCount:9
    }
  }
}
</script>
<style scoped>
#park {
  top:60px;
  right:0;
  height: 900px;
  opacity: 0.89;
  position: absolute;
  background: #1c1717;
  z-index: 2147483646;
}
.el-input{
  margin-top: 65px;
  right: 30%;
  position: absolute;
  width: 180px;
  font-size: 12px;
}
.el-button{
  margin-top: 65px;
  right: 10%;
  position: absolute;
}
.pageList {
  margin-top: 135px;
}
.el-table{
  background-color: #1c1717;
}
.el-pagination{
  position: absolute;
  font-size: 12px;
}
</style>
