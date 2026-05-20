import request from './request'
const np = (p={}) => ({...p, pageNo:p.pageNo??p.page??1, pageSize:p.pageSize??p.size??10})
export const markRead = id => request.put(`/notices/${id}/read`)
export const markAllRead = () => request.put('/notices/read/all')
export const countUnread = () => request.get('/notices/unread/count')
export const pageMyNotices = (params={}) => request.get('/notices/page', {params:np(params)})
