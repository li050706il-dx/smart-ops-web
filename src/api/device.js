import request from './request'
const np = (p={}) => ({...p, pageNo:p.pageNo??p.page??1, pageSize:p.pageSize??p.size??10})
export const addDevice = data => request.post('/devices', data)
export const updateDevice = data => request.put('/devices', data)
export const updateDeviceStatus = (id,data) => request.put(`/devices/${id}/status`, data)
export const getDeviceById = id => request.get(`/devices/${id}`)
export const deleteDevice = id => request.delete(`/devices/${id}`)
export const pageDevices = (params={}) => request.get('/devices/page', {params:np(params)})
export const listDevices = () => request.get('/devices/list')
