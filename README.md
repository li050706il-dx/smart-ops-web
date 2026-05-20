# Smart Ops Web

智能运维工单管理系统前端项目。

本项目基于 Vue 3 + Vite + Element Plus 构建，提供设备管理、工单管理、巡检管理、通知消息、用户管理、首页统计和 AI 运维助手等功能。

## 技术栈

- Vue 3
- Vite
- Vue Router
- Pinia
- Element Plus
- Axios
- JavaScript

## 核心功能

### 登录认证

- 用户登录
- Token 本地保存
- 登录状态校验
- 退出登录

### 首页统计

- 设备总数
- 故障设备数量
- 待处理工单数量
- 未读通知数量

### 设备管理

- 设备分页查询
- 按设备名称、设备编号、状态筛选
- 新增设备
- 编辑设备
- 修改设备状态
- 删除设备

设备状态：

| 状态码 | 含义 |
|---|---|
| 1 | 正常 |
| 2 | 故障 |
| 3 | 维修中 |
| 4 | 停用 |

### 工单管理

- 工单分页查询
- 创建报修工单
- 查看工单详情
- 自动派单
- 删除工单

### 巡检管理

- 查询巡检计划
- 新增巡检计划
- 启用 / 停用巡检计划
- 查询巡检任务
- 开始巡检任务
- 提交巡检结果

巡检计划状态：

| 状态码 | 含义 |
|---|---|
| 0 | 停用 |
| 1 | 启用 |

### 通知消息

- 查询我的通知
- 查询未读通知数量
- 单条通知标记已读
- 全部通知标记已读

### 用户管理

- 用户分页查询
- 新增用户
- 启用 / 禁用用户
- 配置维修人员技能

### AI 运维助手

右下角提供 AI 对话入口，支持：

- 查询设备
- 创建和处理工单
- 查询通知
- 查询系统规则
- 调用后端 AI Agent 执行业务操作

交互特性：

- Enter 发送
- Shift + Enter 换行
- AI 回复后自动滚动到底部
- 使用用户 ID 作为 AI 会话 Session 标识

## 项目结构

```text
src
├── api                 后端接口封装
├── assets              全局样式
├── components          通用组件
│   └── AiChatWidget.vue
├── layouts             页面布局
├── router              路由配置
├── stores              Pinia 状态管理
└── views               页面
```

## 本地启动

安装依赖：

```bash
npm install
```

启动开发服务：

```bash
npm run dev
```

访问地址：

```text
http://localhost:5173
```

## 接口代理

开发环境中，前端通过 Vite Proxy 访问 Java 后端。

`vite.config.js` 中配置：

```js
server: {
  port: 5173,
  proxy: {
    '/api': {
      target: 'http://localhost:8080',
      changeOrigin: true,
      rewrite: path => path.replace(/^\/api/, '')
    }
  }
}
```

所以前端请求：

```text
/api/devices/page
```

会被代理到：

```text
http://localhost:8080/devices/page
```

## 完整项目启动顺序

```text
1. 启动 MySQL、Redis、RabbitMQ
2. 启动 Java 后端 smart-ops-system，端口 8080
3. 启动 Python Agent smart-ops-agent，端口 8000
4. 启动 Vue 前端 smart-ops-web，端口 5173
```

## AI 调用链路

```text
Vue AI 对话框
  -> Java 后端 /ai/chat
  -> Python Agent /agent/chat
  -> DeepSeek Tool Calling
  -> Java 业务接口
  -> 返回 AI 回复
```

## 注意事项

不要提交以下文件或目录：

```text
node_modules/
dist/
.env
.vscode/
.idea/
```

如果 5173 端口被占用，可以结束旧 Node 进程：

```bash
taskkill /IM node.exe /F
```
