<template>
  <div class="app-container">

    <!-- 表格 -->
    <el-table
      :data="list"
      border
      fit
      highlight-current-row>

      <el-table-column
        label="序号"
        width="70"
        align="center">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column prop="title" label="名称" width="100" align="center" />

      <el-table-column prop="courseId" label="绑定课程ID" width="200" align="center" />

      <!-- <el-table-column prop="activityPrice" label="活动价格" width="100" /> -->
      <el-table-column label="活动价格" width="100" align="center">
        <template slot-scope="scope">
        <section v-if="Number(scope.row.activityPrice)===0">
            <el-tag type="success">免费观看</el-tag>
        </section>
      <section v-else>
          <template align="center">

              {{scope.row.activityPrice+"元"}}
          </template>
          <!-- <el-tag type="success">{{scope.row.activityPrice}}</el-tag> -->
      </section>    
        </template>
      </el-table-column>  

      <el-table-column prop="remainingDay" label="剩余天数" width="100" />
      <el-table-column prop="isDeleted" label="上架" width="100" >
      <template slot-scope="scope">
        <el-switch v-model="scope.row.isDeleted"
        :active-value=true
        :inactive-value=false
        @change="changeSwitch(scope.row.id)">
        </el-switch>
      </template>
      </el-table-column>

      <el-table-column prop="gmtCreate" label="添加时间" width="180"/>


      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <router-link :to="'/activity/edit/'+scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>
          </router-link>
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeDataById(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

  <!-- 分页 -->
    <el-pagination
      :current-page="page"
      :page-size="limit"
      :total="total"
      style="padding: 30px 0; text-align: center;"
      layout="total, prev, pager, next, jumper"
      @current-change="getList"
    />

  </div>
</template>
<script>
//引入调用banner.js文件
import activity from '@/api/edu/activity'

export default {
    //写核心代码位置
    // data:{
    // },
    data() { //定义变量和初始值
        return {
          list:null,//查询之后接口返回集合
          page:1,//当前页
          limit:10,//每页记录数
          total:0,//总记录数
        }
    },
    created() { //页面渲染之前执行，一般调用methods定义的方法
        //调用
        this.getList() 
    },
    methods:{  //创建具体的方法，调用teacher.js定义的方法
        //讲师列表的方法
        getList(page=1) {
            this.page = page
            activity.pageActivity(this.page,this.limit)
                .then(response =>{//请求成功
                    //response接口返回的数据
                    console.log(response)
                    this.list = response.data.items
                    this.total = response.data.total
                    console.log(this.list)   
                    console.log(this.total)
                }) 
        },
        //删除讲师的方法
        removeDataById(id) {
            this.$confirm('此操作将永久删除轮播图记录, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {  //点击确定，执行then方法
                //调用删除的方法
                activity.removeActivity(id)
                    .then(response =>{//删除成功
                    //提示信息
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    //回到列表页面
                    this.getList()
                })
            }) //点击取消，执行catch方法
        },
        //更改状态的方法
        changeSwitch(id){
          activity.stateActivity(id)
                    .then(response =>{//删除成功
                    //提示信息
                    this.$message({
                        type: 'success',
                        message: response.message
                    });
                })
        }
 
    }
}
</script>
