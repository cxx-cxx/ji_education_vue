<template>

  <div class="app-container">

    <h2 style="text-align: center;">活动管理</h2>


    <el-form label-width="120px">

        <el-form-item label="活动标题" >
            <el-input v-model="activityInfo.title" placeholder=" 示例：特价课程展示" />
        </el-form-item>

        <!-- <el-form-item label="绑定课程">
            <el-input v-model="activityInfo.title" placeholder=" 示例：特价课程展示"/>
        </el-form-item> -->
        <el-form-item label="绑定课程">
        <el-select :disabled="selectDisabled"
            v-model="activityInfo.courseId"
            filterable 
            placeholder="请选择" 
            @change="changeSelect()">

            <el-option
                v-for="course in courseList"
                :key="course.id"
                :label="course.title"
                :value="course.id"/>

        </el-select>
        </el-form-item>

        <el-form-item label="原价" >
            <el-input :disabled=true v-model="activityInfo.price" />
        </el-form-item>


        <el-form-item label="活动类型">
            <el-radio-group v-model="radioValue">
                <el-radio :label=1  @change.native="changeRadioOne()">课程特价</el-radio>
                <el-radio :label=2  @change.native="changeRadioTow()">免费试看</el-radio>
            </el-radio-group>
        </el-form-item>

        <section v-if="this.visible">
            <el-form-item label="特价价格">
            <el-input-number :min="0" v-model="activityInfo.activityPrice" controls-position="right" placeholder="免费课程请设置为0元"/> 元
        </el-form-item>
        </section>


        <el-form-item label="活动天数">
            <el-input-number :min="0" v-model="activityInfo.remainingDay" controls-position="right" />
        </el-form-item>



        <el-form-item>
            <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存</el-button>
        </el-form-item>
        </el-form>
  </div>
</template>
<script>
import activity from '@/api/edu/activity'
import course from '@/api/edu/course'
import Tinymce from '@/components/Tinymce' //引入组件

export default {
    //声明组件
    components: { Tinymce },
    data() {
        return {
            radioValue:3,
            visible:false,
            selectDisabled:false,
            saveBtnDisabled:false,
            activityInfo:{
                courseId:'',
                title: '',
                courseTitle:'',
                price: '',//二级分类id
                activityPrice:'',
                remainingDay: 7
            },
            activityId:'',
            courseList:[]
        }   
    },
    watch: {  //监听
        $route(to, from) { //路由变化方式，路由发生变化，方法就会执行
            this.activityInfo={},
            this.activityInfo.remainingDay=7
        }
    },
    created() {
        //获取所有课程
        this.getListCourse()
        //获取路由id值
        if(this.$route.params && this.$route.params.id) {
            this.selectDisabled = true
            this.activityId = this.$route.params.id
            //调用根据id查询课程的方法
            this.getInfo(this.activityId)

        }
        //  else {
        //     this.bannerInfo={}
        // }
        
    },
    methods:{
        //获取课程信息
        getListCourse(){
            course.getAllCourse()
                .then(response => {
                    this.courseList = response.data.list
                })
        },
        //根据课程id查询
        getInfo(activityId) {
            activity.getActivity(activityId)
                .then(response => {
                    this.activityInfo = response.data.item
                    if(Number(this.activityInfo.activityPrice)==0){
                        this.radioValue=2
                        console.log(this.activityInfo.activityPrice)
                    }
                    else{
                        this.radioValue=1
                        this.visible=true
                    } 
                    
                })
               
        },
        //添加课程
        addActivity() {
            activity.addActivity(this.activityInfo)
                .then(response => {
                    //提示
                    this.$message({
                        type: 'success',
                        message: '添加活动成功!'
                    });
                    //跳转到第二步
                    this.$router.push({path:'/activity/table'})
                })
        },
        changeSelect(){
            course.getCourseInfoId(this.activityInfo.courseId)
                .then(response => {
                    this.activityInfo.price = response.data.courseInfo.price
                    console.log(this.activityInfo.price)
                })
        },
        changeRadioOne(){
            this.visible=true
        },
        changeRadioTow(){
            this.visible=false,
            this.activityInfo.activityPrice=0
        },
        //修改课程
        updateActivity() {
            activity.updateActivity(this.activityInfo)
                .then(response => {
                     //提示
                    this.$message({
                        type: 'success',
                        message: '修改活动信息成功!'
                    });
                    //跳转到第二步
                    this.$router.push({path:'/activity/table'})
                })
        },
        saveOrUpdate() {
           //判断添加还是修改
           if(!this.activityId) {
               //添加
               this.addActivity()
           } else {
               this.updateActivity()
           }
        }
    }
}
</script>
<style scoped>
.tinymce-container {
  line-height: 29px;
}
</style>