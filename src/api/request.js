import axios from 'axios'
import { ElMessage } from 'element-plus'
import { useAuthStore } from '../stores/auth'
const request = axios.create({ baseURL: '/api', timeout: 30000 })
request.interceptors.request.use(config => { const auth = useAuthStore(); const token = auth.token || localStorage.getItem('SMART_OPS_TOKEN'); if (token) config.headers.Authorization = token; return config }, error => Promise.reject(error))
request.interceptors.response.use(response => { const res = response.data; if (res && typeof res === 'object' && 'code' in res) { if (res.code === 200 || res.code === 0) return res.data; ElMessage.error(res.message || '请求失败'); return Promise.reject(res) } return res }, error => { const msg = error.response?.data?.message || error.response?.data || error.message || '系统异常'; ElMessage.error(`系统异常：${msg}`); return Promise.reject(error) })
export default request
