'use client'

import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { ChatPanel } from './chat-panel'

export type ChatMessage = {
  id: string
  role: 'user' | 'assistant'
  content: string
}

type ChatContextValue = {
  isOpen: boolean
  isLoading: boolean
  messages: ChatMessage[]
  openChat: (message?: string) => void
  closeChat: () => void
  sendMessage: (text: string) => void
}

const GREETING: ChatMessage = {
  id: 'greeting',
  role: 'assistant',
  content:
    'Buongiorno, sono Marcel. Mi dica dove e quando le serve l’auto e in quanti siete: le consiglio la categoria giusta e le calcolo il prezzo.',
}

const ChatContext = createContext<ChatContextValue | null>(null)

export function useMarcelChat() {
  const context = useContext(ChatContext)
  if (!context) throw new Error('useMarcelChat must be used inside ChatProvider')
  return context
}

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([GREETING])
  const messagesRef = useRef(messages)
  const loadingRef = useRef(false)

  useEffect(() => {
    messagesRef.current = messages
  }, [messages])

  const sendMessage = useCallback(async (text: string) => {
    const content = text.trim()
    if (!content || loadingRef.current) return

    const userMessage: ChatMessage = { id: crypto.randomUUID(), role: 'user', content }
    const assistantId = crypto.randomUUID()
    const history = [...messagesRef.current, userMessage]

    setMessages([...history, { id: assistantId, role: 'assistant', content: '' }])
    loadingRef.current = true
    setIsLoading(true)

    const appendToAssistant = (chunk: string) =>
      setMessages((current) =>
        current.map((message) =>
          message.id === assistantId ? { ...message, content: message.content + chunk } : message,
        ),
      )

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: history
            .filter((message) => message.id !== GREETING.id)
            .map(({ role, content }) => ({ role, content })),
        }),
      })

      if (!response.ok || !response.body) throw new Error(`Chat request failed: ${response.status}`)

      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        appendToAssistant(decoder.decode(value, { stream: true }))
      }
    } catch (error) {
      console.error('Chat error:', error)
      appendToAssistant('Mi scusi, c’è stato un problema di connessione. Può riprovare tra un momento?')
    } finally {
      loadingRef.current = false
      setIsLoading(false)
    }
  }, [])

  const openChat = useCallback(
    (message?: string) => {
      setIsOpen(true)
      if (message) sendMessage(message)
    },
    [sendMessage],
  )

  const closeChat = useCallback(() => setIsOpen(false), [])

  return (
    <ChatContext.Provider value={{ isOpen, isLoading, messages, openChat, closeChat, sendMessage }}>
      {children}
      <ChatPanel />
    </ChatContext.Provider>
  )
}
