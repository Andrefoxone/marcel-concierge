'use client'

import { useMarcelChat } from './chat-provider'

type OpenChatButtonProps = {
  message?: string
  className?: string
  children: React.ReactNode
}

export function OpenChatButton({ message, className = '', children }: OpenChatButtonProps) {
  const { openChat } = useMarcelChat()
  return (
    <button type="button" onClick={() => openChat(message)} className={className}>
      {children}
    </button>
  )
}
