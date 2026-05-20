import request from './request'
const np = (p={}) => ({...p, pageNo:p.pageNo??p.page??1, pageSize:p.pageSize??p.size??10})
export const addInspectionPlan = data => request.post('/inspection/plans', data)
export const updateInspectionPlanStatus = (id,data) => request.put(`/inspection/plans/${id}/status`, data)
export const pageInspectionPlans = (params={}) => request.get('/inspection/plans/page', {params:np(params)})
export const pageInspectionTasks = (params={}) => request.get('/inspection/tasks/page', {params:np(params)})
export const startInspectionTask = id => request.post(`/inspection/tasks/${id}/start`)
export const submitInspectionTask = (id,data) => request.post(`/inspection/tasks/${id}/submit`, data)
