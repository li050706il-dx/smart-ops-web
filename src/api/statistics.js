import request from './request'
export const getDeviceStatistics = () => request.get('/statistics/devices')
export const getWorkOrderStatistics = () => request.get('/statistics/workorders')
