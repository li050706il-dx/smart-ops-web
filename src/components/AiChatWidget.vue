<template>
  <div>
    <el-button class="ai-fab" type="primary" circle size="large" @click="visible = true">
      <el-icon><ChatDotRound /></el-icon>
    </el-button>

    <el-drawer
      v-model="visible"
      title="AI 运维助手"
      direction="rtl"
      size="420px"
      append-to-body
      @opened="scrollToBottom"
    >
      <div class="chat-panel">
        <div ref="messagesRef" class="messages">
          <div
            v-for="(msg, index) in messages"
            :key="index"
            :class="['message', msg.role]"
          >
            <div class="bubble" v-html="formatMessage(msg.content)" />
          </div>

          <div v-if="loading" class="message assistant">
            <div class="bubble">AI 正在思考中...</div>
          </div>
        </div>

        <div class="input-area">
          <el-input
            v-model="input"
            type="textarea"
            :rows="3"
            placeholder="请输入消息，例如查询设备、处理工单、查看通知或咨询系统规则"
            @keydown.enter="handleEnter"
          />

          <div class="input-footer">
            <span class="hint">Enter 发送，Shift + Enter 换行</span>
            <el-button type="primary" :loading="loading" @click="send">
              发送
            </el-button>
          </div>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'
import { ElMessage } from 'element-plus'
import { chatWithAi } from '../api/ai'

const visible = ref(false)
const input = ref('')
const loading = ref(false)
const messagesRef = ref(null)

const user = JSON.parse(localStorage.getItem('SMART_OPS_USER') || '{}')
const userId = user.userId || user.id || user.username || 'anonymous'

const SESSION_KEY = `SMART_OPS_AI_SESSION_ID_${userId}`

let savedSessionId = localStorage.getItem(SESSION_KEY)

if (!savedSessionId) {
  savedSessionId = `web_${userId}_${Date.now()}`
  localStorage.setItem(SESSION_KEY, savedSessionId)
}

const sessionId = savedSessionId

const messages = ref([
  {
    role: 'assistant',
    content: '你好，我是 AI 运维助手。可以帮你查询设备、处理工单、查看通知，也可以回答系统规则相关问题。'
  }
])

function escapeHtml(text) {
  return String(text)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

function formatMessage(text) {
  if (!text) return ''

  return escapeHtml(text).replaceAll('\n', '<br>')
}

function scrollToBottom() {
  nextTick(() => {
    if (messagesRef.value) {
      messagesRef.value.scrollTop = messagesRef.value.scrollHeight
    }
  })
}

function handleEnter(event) {
  if (event.shiftKey) {
    return
  }

  event.preventDefault()
  send()
}

async function send() {
  const text = input.value.trim()

  if (!text || loading.value) {
    return
  }

  messages.value.push({
    role: 'user',
    content: text
  })

  input.value = ''
  scrollToBottom()

  loading.value = true

  try {
    const res = await chatWithAi({
      message: text,
      sessionId
    })

    messages.value.push({
      role: 'assistant',
      content: res?.answer || '没有收到 AI 回复'
    })

    scrollToBottom()
  } catch (e) {
    ElMessage.error('AI 对话失败')

    messages.value.push({
      role: 'assistant',
      content: '抱歉，AI 服务暂时不可用，请稍后再试。'
    })

    scrollToBottom()
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.ai-fab {
  position: fixed;
  right: 28px;
  bottom: 28px;
  width: 58px;
  height: 58px;
  box-shadow: 0 14px 35px rgba(37, 99, 235, 0.35);
  z-index: 1000;
}

.chat-panel {
  height: calc(100vh - 100px);
  display: flex;
  flex-direction: column;
}

.messages {
  flex: 1;
  overflow-y: auto;
  padding-right: 6px;
  padding-bottom: 10px;
}

.message {
  display: flex;
  margin-bottom: 14px;
}

.message.user {
  justify-content: flex-end;
}

.message.assistant {
  justify-content: flex-start;
}

.bubble {
  max-width: 82%;
  padding: 12px 14px;
  border-radius: 14px;
  line-height: 1.65;
  font-size: 14px;
  white-space: normal;
  word-break: break-word;
}

.user .bubble {
  background: #2563eb;
  color: #fff;
  border-bottom-right-radius: 4px;
}

.assistant .bubble {
  background: #f1f5f9;
  color: #0f172a;
  border-bottom-left-radius: 4px;
}

.input-area {
  border-top: 1px solid #e5e7eb;
  padding-top: 14px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.input-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.hint {
  font-size: 12px;
  color: #94a3b8;
}
</style>