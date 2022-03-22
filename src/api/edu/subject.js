import request from '@/utils/request'
export default {
  // 1 课程分类列表 ky
  getSubjectList() {
    return request({
      url: '/eduservice/subject/getAllSubject',
      method: 'get'
    })
  }
}
