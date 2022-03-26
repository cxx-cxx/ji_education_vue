<template>
  <div class="app-container">

    <!-- 表格 -->
    <el-table
      :data="list"
      border
      fit
      highlight-current-row>
      <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="购买用户">
            <span>{{ props.row.nickname }}</span>
          </el-form-item>
          <el-form-item label="订单号">
            <span>{{ props.row.orderNo }}</span>
          </el-form-item>
          <el-form-item label="课程名称">
            <span>{{ props.row.courseTitle }}</span>
          </el-form-item>
          <el-form-item label="课程封面"  width="200">
            <img :src="props.row.courseCover" width="100px" height="70px">
         </el-form-item> 
         <el-form-item label="课程原价">
            <span>{{ props.row.originalPrice }}￥</span>
          </el-form-item>
          <el-form-item label="支付金额">
            <span>{{ props.row.totalFee }}￥</span>
          </el-form-item>
          <el-form-item label="支付状态">
            <span v-if="Number(props.row.status===1)">已支付</span>
            <span v-else>未支付</span>
          </el-form-item>
          <el-form-item label="创建时间">
            <span>{{ props.row.gmtCreate }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>

      <el-table-column
        label="序号"
        width="70"
        align="center">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>


      <el-table-column prop="orderNo" label="订单号" width="200" align="center" />
      <el-table-column prop="courseTitle" label="课程名称" width="200" align="center" />
      <el-table-column prop="totalFee" label="订单金额" width="100" align="center" />
      <el-table-column label="支付类型" width="100" align="center">
          <template slot-scope="scope">
              <section v-if="Number(scope.row.payType)===1">
                    <el-tag type="success">微信支付</el-tag>
              </section>
          </template>
      </el-table-column>
       <!-- <el-table-column label="课程封面"  width="300">
         <template slot-scope="scope">
           <img :src="scope.row.courseCover" width="250px" height="150px">
         </template>
      </el-table-column>  -->
      <!-- <el-table-column prop="linkUrl" label="跳转页面" width="100" />
      <el-table-column prop="remainingDay" label="剩余天数" width="100" /> -->

      <el-table-column prop="gmtCreate" label="添加时间" width="200"/>


      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
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
<style>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>
<script>

//引入调用banner.js文件
import order from '@/api/edu/order'

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
            order.pageOrder(this.page,this.limit)
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
                banner.removeBanner(id)
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
        }
 
    }
}
</script>
