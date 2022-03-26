import request from '@/utils/request'
export default {

    //分页查询订单
    pageOrder(page,limit) {
        return request({
            url: `/eduorder/order/pageOrder/${page}/${limit}`,
            method: 'get',
          })
    },
    
    //删除订单
    deleteOrder(id) {
        return request({
            url: `/eduorder/order/remove/${id}`,
            method: 'delete'
          })
    }
}