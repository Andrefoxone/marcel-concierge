'use client';

import { useState, useEffect, useRef } from 'react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  text: string;
}

export default function ChatDemo() {
  console.log('[v0] ChatDemo component rendered');
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      text: 'Buonasera e benvenuto al Palazzo Sereno! Sono Marcel, il vostro concierge virtuale. Come posso assisterla oggi? Posso aiutarla con check-in, prenotazioni ristoranti, spa, transfer o qualsiasi altra necessita.',
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async (text?: string) => {
    const messageText = text || inputValue;
    console.log('[v0] handleSend called:', messageText, 'isLoading:', isLoading);
    if (!messageText.trim() || isLoading) {
      console.log('[v0] Early return');
      return;
    }
    console.log('[v0] Sending message...');

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: messageText,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    setError(null);

    try {
      console.log('[v0] Calling fetch /api/chat...');
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.text,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error('Errore nella risposta');
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error('No reader');

      const decoder = new TextDecoder();
      let assistantText = '';
      const assistantId = (Date.now() + 1).toString();

      // Add empty assistant message
      setMessages((prev) => [...prev, { id: assistantId, role: 'assistant', text: '' }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data:')) {
            const data = line.slice(5).trim();
            if (data === '[DONE]') continue;
            try {
              const parsed = JSON.parse(data);
              if (parsed.type === 'text-delta' && parsed.delta) {
                assistantText += parsed.delta;
                setMessages((prev) =>
                  prev.map((m) =>
                    m.id === assistantId ? { ...m, text: assistantText } : m
                  )
                );
              }
            } catch {
              // Skip invalid JSON
            }
          }
        }
      }
    } catch (err) {
      console.error('Chat error:', err);
      setError('Errore di connessione. Riprova.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const suggestedQuestions = [
    'A che ora e il check-in?',
    'Consiglia un ristorante?',
    'Prenota la spa',
  ];

  return (
    <div
      style={{
        background: '#1a1a1a',
        borderRadius: 20,
        overflow: 'hidden',
        border: '1px solid rgba(212,175,120,0.15)',
        maxWidth: 440,
        width: '100%',
        boxShadow: '0 24px 80px rgba(0,0,0,0.5)',
      }}
    >
      {/* Chat Header */}
      <div
        style={{
          padding: '16px 20px',
          background: 'linear-gradient(135deg, #1e1e1e, #252525)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}
      >
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: 12,
            background: 'linear-gradient(135deg, #d4af78, #b8924a)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 18,
            fontWeight: 700,
            color: '#1a1a1a',
          }}
        >
          M
        </div>
        <div>
          <div
            style={{
              fontSize: 14,
              fontWeight: 700,
              color: '#f0e6d6',
              fontFamily: 'Georgia, serif',
            }}
          >
            Marcel
          </div>
          <div
            style={{
              fontSize: 11,
              color: '#7a7268',
              display: 'flex',
              alignItems: 'center',
              gap: 4,
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: isLoading ? '#f59e0b' : '#4caf50',
                display: 'inline-block',
              }}
            />
            {isLoading ? 'Marcel sta scrivendo...' : 'Online — Palazzo Sereno'}
          </div>
        </div>
      </div>

      {/* Suggested Questions */}
      {messages.length === 1 && (
        <div
          style={{
            padding: '12px 16px',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            display: 'flex',
            gap: 8,
            flexWrap: 'wrap',
          }}
        >
          {suggestedQuestions.map((q, i) => (
            <button
              key={i}
              onClick={() => handleSend(q)}
              disabled={isLoading}
              style={{
                padding: '6px 12px',
                borderRadius: 20,
                background: 'rgba(212,175,120,0.1)',
                border: '1px solid rgba(212,175,120,0.2)',
                color: '#c9a96e',
                fontSize: 11,
                fontWeight: 600,
                cursor: isLoading ? 'default' : 'pointer',
                opacity: isLoading ? 0.5 : 1,
              }}
            >
              {q}
            </button>
          ))}
        </div>
      )}

      {/* Messages */}
      <div
        ref={chatRef}
        style={{
          padding: '16px',
          height: 320,
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
        }}
      >
        {messages.map((msg) => {
          const isUser = msg.role === 'user';
          return (
            <div
              key={msg.id}
              style={{
                alignSelf: isUser ? 'flex-end' : 'flex-start',
                maxWidth: '85%',
              }}
            >
              <div
                style={{
                  padding: '10px 14px',
                  borderRadius: isUser ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                  background: isUser
                    ? 'linear-gradient(135deg, #d4af78, #b8924a)'
                    : 'rgba(255,255,255,0.06)',
                  color: isUser ? '#1a1a1a' : '#e0d8c8',
                  fontSize: 13,
                  lineHeight: 1.55,
                  whiteSpace: 'pre-line',
                }}
              >
                {msg.text || '...'}
              </div>
            </div>
          );
        })}
        {isLoading && messages[messages.length - 1]?.role === 'user' && (
          <div style={{ alignSelf: 'flex-start' }}>
            <div
              style={{
                padding: '10px 18px',
                borderRadius: '16px 16px 16px 4px',
                background: 'rgba(255,255,255,0.06)',
                display: 'flex',
                gap: 4,
              }}
            >
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#c9a96e', opacity: 0.4 }} />
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#c9a96e', opacity: 0.7 }} />
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#c9a96e', opacity: 1 }} />
            </div>
          </div>
        )}
        {error && (
          <div
            style={{
              alignSelf: 'center',
              padding: '8px 16px',
              background: 'rgba(239, 68, 68, 0.2)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              borderRadius: 12,
              color: '#fca5a5',
              fontSize: 12,
              textAlign: 'center',
            }}
          >
            {error}
          </div>
        )}
      </div>

      {/* Input Bar */}
      <div
        style={{
          padding: '12px 16px',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          background: '#1e1e1e',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            background: 'rgba(255,255,255,0.05)',
            borderRadius: 12,
            padding: '4px 4px 4px 14px',
          }}
        >
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Scrivi un messaggio..."
            disabled={isLoading}
            style={{
              flex: 1,
              fontSize: 13,
              color: '#e8e0d0',
              background: 'transparent',
              border: 'none',
              outline: 'none',
            }}
          />
          <button
            onClick={() => handleSend()}
            disabled={isLoading || !inputValue.trim()}
            style={{
              width: 36,
              height: 36,
              borderRadius: 8,
              background:
                inputValue.trim() && !isLoading
                  ? 'linear-gradient(135deg, #d4af78, #b8924a)'
                  : 'rgba(255,255,255,0.05)',
              border: 'none',
              cursor: inputValue.trim() && !isLoading ? 'pointer' : 'default',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 16,
              color: inputValue.trim() && !isLoading ? '#1a1a1a' : '#5a5a4a',
            }}
          >
            {isLoading ? '...' : '↗'}
          </button>
        </div>
      </div>
    </div>
  );
}
