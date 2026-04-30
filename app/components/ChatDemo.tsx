'use client';

import { useState, useEffect, useRef } from 'react';
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';

export default function ChatDemo() {
  const [inputValue, setInputValue] = useState('');
  const chatRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: '/api/chat' }),
    initialMessages: [
      {
        id: 'welcome',
        role: 'assistant',
        parts: [{ type: 'text' as const, text: 'Buonasera e benvenuto al Palazzo Sereno! Sono Marcel, il vostro concierge virtuale. Come posso assisterla oggi? Posso aiutarla con check-in, prenotazioni ristoranti, spa, transfer o qualsiasi altra necessita.' }],
      },
    ],
    onError: (err) => {
      console.error('[v0] Chat error:', err);
      setError(err.message || 'Errore di connessione');
    },
  });

  const isStreaming = status === 'streaming' || status === 'submitted';
  
  // Clear error when user sends new message
  useEffect(() => {
    if (status === 'submitted') {
      setError(null);
    }
  }, [status]);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, isStreaming]);

  const handleSend = (text?: string) => {
    const messageText = text || inputValue;
    if (!messageText.trim() || isStreaming) return;
    sendMessage({ text: messageText });
    setInputValue('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const getMessageText = (msg: typeof messages[0]) => {
    if (msg.parts && Array.isArray(msg.parts)) {
      return msg.parts
        .filter((p): p is { type: 'text'; text: string } => p.type === 'text')
        .map((p) => p.text)
        .join('');
    }
    return '';
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
              fontFamily: "'Cormorant Garamond', Georgia, serif",
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
                background: isStreaming ? '#f59e0b' : '#4caf50',
                display: 'inline-block',
                animation: isStreaming ? 'pulse 1s ease infinite' : 'none',
              }}
            />
            {isStreaming ? 'Marcel sta scrivendo...' : 'Online — Palazzo Sereno'}
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
              disabled={isStreaming}
              style={{
                padding: '6px 12px',
                borderRadius: 20,
                background: 'rgba(212,175,120,0.1)',
                border: '1px solid rgba(212,175,120,0.2)',
                color: '#c9a96e',
                fontSize: 11,
                fontWeight: 600,
                cursor: isStreaming ? 'default' : 'pointer',
                fontFamily: "'DM Sans', sans-serif",
                transition: 'all .2s',
                opacity: isStreaming ? 0.5 : 1,
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
          const text = getMessageText(msg);
          const isUser = msg.role === 'user';

          return (
            <div
              key={msg.id}
              style={{
                alignSelf: isUser ? 'flex-end' : 'flex-start',
                maxWidth: '85%',
                animation: 'msgIn .35s ease',
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
                  fontFamily: "'DM Sans', sans-serif",
                  whiteSpace: 'pre-line',
                }}
              >
                {text}
              </div>
            </div>
          );
        })}
        {isStreaming && messages[messages.length - 1]?.role === 'user' && (
          <div style={{ alignSelf: 'flex-start', animation: 'msgIn .2s ease' }}>
            <div
              style={{
                padding: '10px 18px',
                borderRadius: '16px 16px 16px 4px',
                background: 'rgba(255,255,255,0.06)',
                display: 'flex',
                gap: 4,
              }}
            >
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: '50%',
                    background: '#c9a96e',
                    animation: `dotPulse .8s ease ${i * 0.15}s infinite`,
                  }}
                />
              ))}
            </div>
          </div>
        )}
        {error && (
          <div style={{ 
            alignSelf: 'center', 
            padding: '8px 16px', 
            background: 'rgba(239, 68, 68, 0.2)', 
            border: '1px solid rgba(239, 68, 68, 0.3)',
            borderRadius: 12, 
            color: '#fca5a5', 
            fontSize: 12,
            textAlign: 'center'
          }}>
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
            disabled={isStreaming}
            style={{
              flex: 1,
              fontSize: 13,
              color: '#e8e0d0',
              background: 'transparent',
              border: 'none',
              outline: 'none',
              fontFamily: "'DM Sans', sans-serif",
            }}
          />
          <button
            onClick={() => handleSend()}
            disabled={isStreaming || !inputValue.trim()}
            style={{
              width: 36,
              height: 36,
              borderRadius: 8,
              background:
                inputValue.trim() && !isStreaming
                  ? 'linear-gradient(135deg, #d4af78, #b8924a)'
                  : 'rgba(255,255,255,0.05)',
              border: 'none',
              cursor: inputValue.trim() && !isStreaming ? 'pointer' : 'default',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 16,
              color: inputValue.trim() && !isStreaming ? '#1a1a1a' : '#5a5a4a',
              transition: 'all .2s',
            }}
          >
            {isStreaming ? '...' : '↗'}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes msgIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes dotPulse {
          0%, 100% { opacity: 0.4; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}
