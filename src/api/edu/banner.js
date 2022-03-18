import request from '@/utils/request'
export default {

    //分页查询轮播图
    pageBanner(page,limit) {
        return request({
            url: `/educms/banneradmin/pageBanner/${page}/${limit}`,
            method: 'get',
          })
    },
    
    //删除轮播图
    removeBanner(id) {
        return request({
            url: `/educms/banneradmin/remove/${id}`,
            method: 'delete'
          })
    },
    //修改轮播图
    updateBanner(banner) {
        return request({
            url: '/educms/banneradmin/update',
            method: 'post',
            data: banner
          })
    },
    //新增轮播图
    addBanner(banner) {
        return request({
            url: '/educms/banneradmin/addBanner',
            method: 'post',
            data: banner
          })
    },
    //修改轮播图状态
    stateBanner(id){
        return request({
            url: `/educms/banneradmin/state/${id}`,
            method: 'get'
          })
    },
    //根据id查询banner信息
    getBanner(id){
        return request({
            url: `/educms/banneradmin/get/${id}`,
            method: 'get'
          })
    }
}