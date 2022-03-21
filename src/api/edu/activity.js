import request from '@/utils/request'
export default {

    //分页查询
    pageActivity(page,limit) {
        return request({
            url: `/eduservice/activity/pageActivity/${page}/${limit}`,
            method: 'get',
          })
    },
    
    //删除
    removeActivity(id) {
        return request({
            url: `/eduservice/activity/remove/${id}`,
            method: 'delete'
          })
    },
    //修改
    updateActivity(activity) {
        return request({
            url: '/eduservice/activity/update',
            method: 'post',
            data: activity
          })
    },
    //新增
    addActivity(activity) {
        return request({
            url: '/eduservice/activity/addActivity',
            method: 'post',
            data: activity
          })
    },
    //修改状态
    stateActivity(id){
        return request({
            url: `/eduservice/activity/state/${id}`,
            method: 'get'
          })
    },
    //根据id查询activity信息
    getActivity(id){
        return request({
            url: `/eduservice/activity/get/${id}`,
            method: 'get'
          })
    }
}