'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowUp, MessageCircle, X } from 'lucide-react'
import { Plate } from '../plate'
import { useMarcelChat } from './chat-provider'

const SUGGESTIONS = [
  'Quanto costa un’auto per un weekend?',
  'Cosa serve per noleggiare?',
  'Potete consegnarla a Malpensa?',
]

export function ChatPanel() {
  const { isOpen, isLoading, messages, openChat, closeChat, sendMessage } = useMarcelChat()
  const [input, setInput] = useState('')
  const listRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight
  }, [messages])

  useEffect(() => {
    if (!isOpen) return
    inputRef.current?.focus()
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeChat()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isOpen, closeChat])

  const submit = () => {
    if (!input.trim() || isLoading) return
    sendMessage(input)
    setInput('')
  }

  if (!isOpen) {
    return (
      <button
        type="button"
        onClick={() => openChat()}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-full bg-foreground py-3 pl-4 pr-5 text-sm font-semibold text-background shadow-lg transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        <span className="relative flex">
          <MessageCircle className="size-5" aria-hidden="true" />
          <span className="absolute -right-0.5 -top-0.5 size-2 rounded-full bg-accent" aria-hidden="true" />
        </span>
        Chiedi a Marcel
      </button>
    )
  }

  const showSuggestions = messages.length === 1

  return (
    <aside
      role="dialog"
      aria-label="Chat con Marcel"
      className="fixed inset-0 z-50 flex flex-col border-border bg-background shadow-2xl sm:inset-auto sm:bottom-6 sm:right-6 sm:h-[640px] sm:max-h-[calc(100vh-3rem)] sm:w-[420px] sm:rounded-lg sm:border"
    >
      <header className="flex items-center justify-between gap-4 border-b border-border px-5 py-4">
        <div className="flex items-center gap-3">
          <Plate size="sm">Marcel</Plate>
          <div className="flex flex-col">
            <span className="text-sm font-semibold">Concierge noleggio</span>
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <span className="size-1.5 rounded-full bg-accent" aria-hidden="true" />
              Online 24 ore su 24
            </span>
          </div>
        </div>
        <button
          type="button"
          onClick={closeChat}
          className="flex size-9 items-center justify-center rounded-md text-muted-foreground hover:bg-surface hover:text-foreground"
        >
          <X className="size-5" aria-hidden="true" />
          <span className="sr-only">Chiudi la chat</span>
        </button>
      </header>

      <div ref={listRef} className="flex flex-1 flex-col gap-3 overflow-y-auto bg-surface px-5 py-5" aria-live="polite">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`max-w-[85%] whitespace-pre-wrap rounded-lg px-4 py-3 text-sm leading-relaxed ${
              message.role === 'user'
                ? 'self-end bg-primary text-primary-foreground'
                : 'self-start border border-border bg-background text-foreground'
            }`}
          >
            {message.content ? (
              message.content.replace(/\*\*/g, '')
            ) : (
              <span className="flex gap-1 py-1" aria-label="Marcel sta scrivendo">
                <span className="size-1.5 animate-bounce rounded-full bg-muted-foreground" />
                <span className="size-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:150ms]" />
                <span className="size-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:300ms]" />
              </span>
            )}
          </div>
        ))}

        {showSuggestions && (
          <div className="flex flex-wrap gap-2 pt-2">
            {SUGGESTIONS.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => sendMessage(suggestion)}
                className="rounded-full border border-border bg-background px-3 py-1.5 text-sm text-foreground hover:border-foreground"
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}
      </div>

      <form
        onSubmit={(event) => {
          event.preventDefault()
          submit()
        }}
        className="flex items-end gap-2 border-t border-border p-3"
      >
        <label htmlFor="chat-input" className="sr-only">
          Scriva un messaggio
        </label>
        <textarea
          id="chat-input"
          ref={inputRef}
          rows={1}
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={(event) => {
            if (event.nativeEvent.isComposing || event.keyCode === 229) return
            if (event.key === 'Enter' && !event.shiftKey) {
              event.preventDefault()
              submit()
            }
          }}
          placeholder="Scriva qui: date, luogo, persone..."
          className="max-h-32 min-h-11 flex-1 resize-none rounded-md border border-border bg-background px-3 py-2.5 text-sm leading-relaxed outline-none placeholder:text-muted-foreground focus:border-primary"
        />
        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          className="flex size-11 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground transition-opacity disabled:opacity-40"
        >
          <ArrowUp className="size-5" aria-hidden="true" />
          <span className="sr-only">Invia</span>
        </button>
      </form>
    </aside>
  )
}
