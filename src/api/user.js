import request from './request'
const np = (p={}) => ({...p, pageNo:p.pageNo??p.page??1, pageSize:p.pageSize??p.size??10})
export const addUser = data => request.post('/users', data)
export const pageUsers = (params={}) => request.get('/users/page', {params:np(params)})
export const getUserById = id => request.get(`/users/${id}`)
export const updateUserStatus = (id,data) => request.put(`/users/${id}/status`, data)
export const configureWorkerSkills = (id,data) => request.post(`/users/workers/${id}/skills`, data)
