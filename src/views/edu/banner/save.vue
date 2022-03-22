<template>

  <div class="app-container">

    <h2 style="text-align: center;">轮播图管理</h2>


    <el-form label-width="120px">

        <el-form-item label="轮播图标题">
            <el-input v-model="bannerInfo.title" placeholder=" 示例：特价课程展示"/>
        </el-form-item>


        <el-form-item label="剩余天数">
            <el-input-number :min="0" v-model="bannerInfo.remainingDay" controls-position="right" placeholder="请填写课程的总课时数"/>
        </el-form-item>

        <!-- 课程简介 TODO -->
        <!-- 课程简介-->
        <el-form-item label="链接地址">
            <el-input v-model="bannerInfo.linkUrl" placeholder=" 示例：/course"/>
        </el-form-item>


        <!-- 课程封面 TODO -->
        <!-- 课程封面-->
        <el-form-item label="轮播图片" >

            <el-upload
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
                :action="BASE_API+'/eduoss/fileoss'"
                class="avatar-uploader">
                <img :src="bannerInfo.imageUrl" width="400px" height="200px">
            </el-upload>

        </el-form-item>

        <el-form-item>
            <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存</el-button>
        </el-form-item>
        </el-form>
  </div>
</template>
<script>
import banner from '@/api/edu/banner'
import Tinymce from '@/components/Tinymce' //引入组件

export default {
    //声明组件
    components: { Tinymce },
    data() {
        return {
            saveBtnDisabled:false,
            bannerInfo:{
                title: '',
                linkUrl: '',//二级分类id
                remainingDay: 30,
                imageUrl: 'https://jmu-edu.oss-cn-beijing.aliyuncs.com/2022/02/22/1.jpg',
            },
            bannerId:'',
            BASE_API: process.env.BASE_API, // 接口API地址
        }   
    },
    created() {
        //获取路由id值
        if(this.$route.params && this.$route.params.id) {
            this.bannerId = this.$route.params.id
            //调用根据id查询课程的方法
            this.getInfo(this.bannerId)

        }
        //  else {
        //     this.bannerInfo={}
        //     this.bannerInfo.remainingDay=30
        //     this.imageUrl='https://jmu-edu.oss-cn-beijing.aliyuncs.com/2022/02/22/1.jpg'
        // }
        
    },
    watch: {  //监听
        $route(to, from) { //路由变化方式，路由发生变化，方法就会执行
            this.bannerInfo.title='',
            this.bannerInfo.linkUrl='',
            thi.bannerInfo.imageUrl='https://jmu-edu.oss-cn-beijing.aliyuncs.com/2022/02/22/1.jpg'
        }
    },
    methods:{
        //根据课程id查询
        getInfo(bannerId) {
            banner.getBanner(bannerId)
                .then(response => {
                    this.bannerInfo = response.data.item
                })
        },
        //上传封面成功调用的方法
        handleAvatarSuccess(res, file) {
            this.bannerInfo.imageUrl = res.data.url
        },
        //上传之前调用的方法
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg'
            const isLt2M = file.size / 1024 / 1024 < 2

            if (!isJPG) {
                this.$message.error('上传图片只能是 JPG 格式!')
            }
            if (!isLt2M) {
                this.$message.error('上传图片大小不能超过 2MB!')
            }
            return isJPG && isLt2M
        },
        //添加课程
        addBanner() {
            banner.addBanner(this.bannerInfo)
                .then(response => {
                    //提示
                    this.$message({
                        type: 'success',
                        message: '添加轮播图成功!'
                    });
                    //跳转到第二步
                    this.$router.push({path:'/banner/table'})
                })
        },
        //修改课程
        updateBanner() {
            banner.updateBanner(this.bannerInfo)
                .then(response => {
                     //提示
                    this.$message({
                        type: 'success',
                        message: '修改轮播图信息成功!'
                    });
                    //跳转到第二步
                    this.$router.push({path:'/banner/table'})
                })
        },
        saveOrUpdate() {
           //判断添加还是修改
           if(!this.bannerId) {
               //添加
               this.addBanner()
           } else {
               this.updateBanner()
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