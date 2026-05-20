import request from './request'
export const chatWithAi = data => request.post('/ai/chat', data)
