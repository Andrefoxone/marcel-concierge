'use client'
import { useState } from 'react'

export default function Test() {
  const [count, setCount] = useState(0)
  
  return (
    <div style={{ padding: 50, backgroundColor: '#000', color: '#fff', minHeight: '100vh' }}>
      <h1>Test React</h1>
      <p>Count: {count}</p>
      <button 
        onClick={() => { console.log('[v0] Button clicked'); setCount(c => c + 1); }}
        style={{ padding: '10px 20px', fontSize: 18, cursor: 'pointer' }}
      >
        Click me
      </button>
    </div>
  )
}
