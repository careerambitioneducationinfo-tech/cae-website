'use client'

/**
 * ChatbotWidget.tsx
 *
 * THIS FILE IS FOR DESIGN REFERENCE ONLY.
 * It is NOT mounted in the app — the actual chatbot is loaded via the
 * Railway embed script in app/layout.tsx.
 *
 * Share this file with your chatbot developer so they can match:
 *   - Colors, fonts, spacing
 *   - Header layout (logo + title + online dot)
 *   - Message bubble styles (bot vs user)
 *   - Typing indicator
 *   - Input bar + send button
 *   - Footer branding
 *   - Launcher button position (desktop + mobile)
 *   - Open/close animation
 *
 * Brand tokens:
 *   Primary:  #2E2567  (--bb-navy)
 *   Purple:   #644A9E  (--bb-purple)
 *   Yellow:   #FBD207  (--bb-yellow)
 *   Amber:    #ECA121  (--bb-amber)
 *   Font:     Poppins
 *
 * Launcher button positions (to match our FloatingWidget stack):
 *   Desktop (≥1024px): bottom: 176px, right: 20px  (above WhatsApp + Call)
 *   Mobile  (<1024px): bottom: 80px,  right: 16px  (above pill bar)
 *
 * Chat window dimensions:
 *   Desktop: width 390px, height 600px
 *   Mobile:  width calc(100vw - 32px), max-height calc(100svh - 150px)
 *
 * Required global API from embed script:
 *   window.CAEWidget.toggle() — open/close the chat window
 *   window.CAEWidget.open()   — open only
 *   window.CAEWidget.close()  — close only
 */

import { useEffect } from 'react'

const CSS = `
:root {
  --bb-navy:   #2E2567;
  --bb-purple: #644A9E;
  --bb-yellow: #FBD207;
  --bb-amber:  #ECA121;
  --bb-white:  #ffffff;
  --bb-bg:     #f5f4fb;
  --bb-border: rgba(46, 37, 103, 0.1);
  --bb-text:   #1a1733;
  --bb-muted:  #8a82aa;
  --bb-radius: 20px;
  --bb-font:   'Poppins', sans-serif;
}

/* ── Launcher button ── */
#bb-launcher {
  position: fixed;
  bottom: 176px;  /* desktop: above WhatsApp + Call buttons */
  right: 20px;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: linear-gradient(135deg, #644A9E, #2E2567);
  border: none;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  z-index: 99999;
  box-shadow: 0 8px 24px rgba(46, 37, 103, 0.4);
  transition: transform 0.2s;
}

#bb-launcher:hover { transform: scale(1.1); }
#bb-launcher:active { transform: scale(0.93); }

#bb-launcher svg { color: #fff; width: 24px; height: 24px; }

#bb-launcher .bb-ai-label {
  font-size: 9px;
  font-weight: 700;
  color: #FBD207;
  line-height: 1;
  font-family: var(--bb-font);
}

/* ── Chat window ── */
#bb-window {
  position: fixed;
  bottom: 108px;
  right: 28px;
  width: 390px;
  height: 600px;
  background: var(--bb-white);
  border-radius: var(--bb-radius);
  box-shadow: 0 16px 56px rgba(46, 37, 103, 0.22);
  display: none;
  flex-direction: column;
  z-index: 99998;
  overflow: hidden;
  font-family: var(--bb-font);
  border: 1.5px solid var(--bb-border);
}

#bb-window.bb-open {
  display: flex;
  animation: bb-rise 0.38s cubic-bezier(0.34, 1.56, 0.64, 1) both;
}

@keyframes bb-rise {
  from { opacity: 0; transform: translateY(24px) scale(0.96); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}

/* ── Header ── */
.bb-header {
  background: var(--bb-navy);
  padding: 18px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
  position: relative;
  overflow: hidden;
}

.bb-header::after {
  content: '';
  position: absolute;
  bottom: 0; left: 0; right: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--bb-yellow), var(--bb-amber));
}

.bb-header-left { display: flex; align-items: center; gap: 12px; }

.bb-avatar {
  width: 44px; height: 44px;
  background: rgba(255,255,255,0.15);
  border: 1.5px solid rgba(255,255,255,0.25);
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  overflow: hidden; padding: 6px;
}

.bb-avatar img { width: 100%; height: 100%; object-fit: contain; }

.bb-title {
  font-size: 14px; font-weight: 700;
  color: var(--bb-white); letter-spacing: -0.2px; line-height: 1.2;
}

.bb-subtitle {
  font-size: 11.5px; color: rgba(255,255,255,0.65);
  display: flex; align-items: center; gap: 5px;
  margin-top: 2px; font-weight: 400;
}

.bb-dot {
  width: 6px; height: 6px;
  background: var(--bb-yellow); border-radius: 50%;
  animation: bb-blink 2s infinite; flex-shrink: 0;
}

@keyframes bb-blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.35; }
}

.bb-close {
  width: 32px; height: 32px;
  background: rgba(255,255,255,0.1); border: none;
  border-radius: 10px; color: rgba(255,255,255,0.8);
  font-size: 18px; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  transition: background 0.2s, color 0.2s;
}

.bb-close:hover { background: rgba(255,255,255,0.2); color: var(--bb-white); }

/* ── Messages ── */
.bb-messages {
  flex: 1; overflow-y: auto;
  padding: 20px 16px;
  background: var(--bb-bg);
  display: flex; flex-direction: column; gap: 12px;
  scroll-behavior: smooth;
}

.bb-messages::-webkit-scrollbar { width: 4px; }
.bb-messages::-webkit-scrollbar-thumb { background: rgba(46,37,103,0.15); border-radius: 10px; }

.bb-row { display: flex; gap: 8px; animation: bb-fade 0.28s ease both; }

@keyframes bb-fade {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}

.bb-row.bb-user { flex-direction: row-reverse; }

.bb-mini-avatar {
  width: 28px; height: 28px; border-radius: 50%;
  background: var(--bb-navy); border: 1.5px solid rgba(46,37,103,0.15);
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0; align-self: flex-end; overflow: hidden; padding: 4px;
}

.bb-mini-avatar img { width: 100%; height: 100%; object-fit: contain; }

.bb-bubble {
  max-width: 76%; padding: 12px 15px;
  border-radius: 16px; font-size: 13.5px;
  line-height: 1.65; word-break: break-word;
}

.bb-row.bb-bot .bb-bubble {
  background: var(--bb-white); color: var(--bb-text);
  border: 1.5px solid var(--bb-border);
  border-bottom-left-radius: 4px;
  box-shadow: 0 1px 6px rgba(46,37,103,0.06);
}

.bb-row.bb-user .bb-bubble {
  background: var(--bb-navy); color: var(--bb-white);
  border-bottom-right-radius: 4px;
}

/* ── Typing indicator ── */
.bb-typing {
  background: var(--bb-white); border: 1.5px solid var(--bb-border);
  border-radius: 16px; border-bottom-left-radius: 4px;
  padding: 12px 16px; display: flex; gap: 5px; align-items: center;
}

.bb-dot-t {
  width: 7px; height: 7px; background: var(--bb-purple);
  border-radius: 50%; animation: bb-bounce 1.4s infinite; opacity: 0.5;
}
.bb-dot-t:nth-child(2) { animation-delay: 0.2s; }
.bb-dot-t:nth-child(3) { animation-delay: 0.4s; }

@keyframes bb-bounce {
  0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
  30% { transform: translateY(-7px); opacity: 1; }
}

/* ── Input bar ── */
.bb-input-wrap {
  padding: 14px 16px; background: var(--bb-white);
  border-top: 1.5px solid var(--bb-border);
  display: flex; gap: 10px; align-items: center; flex-shrink: 0;
}

.bb-input {
  flex: 1; background: var(--bb-bg);
  border: 1.5px solid var(--bb-border);
  border-radius: 12px; padding: 11px 16px;
  font-size: 13.5px; font-family: var(--bb-font);
  color: var(--bb-text); outline: none;
  transition: border-color 0.2s;
}

.bb-input:focus { border-color: var(--bb-purple); background: var(--bb-white); }
.bb-input::placeholder { color: var(--bb-muted); }

.bb-send {
  width: 44px; height: 44px; border-radius: 12px;
  background: var(--bb-yellow); border: none; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  transition: transform 0.2s, background 0.2s;
}

.bb-send:hover:not(:disabled) { background: var(--bb-amber); transform: scale(1.06); }
.bb-send:disabled { opacity: 0.45; cursor: not-allowed; }

/* ── Footer ── */
.bb-footer {
  text-align: center; padding: 8px 0 10px;
  font-size: 11px; color: var(--bb-muted);
  font-family: var(--bb-font); background: var(--bb-white);
  border-top: 1px solid var(--bb-border); flex-shrink: 0;
}

.bb-footer span { font-weight: 600; color: var(--bb-navy); }

/* ── Mobile overrides ── */
@media (max-width: 1023px) {
  #bb-launcher {
    bottom: 80px;   /* above pill bar */
    right: 16px;
  }

  #bb-window {
    width: calc(100vw - 32px);
    max-height: calc(100svh - 150px);
    right: 16px;
    bottom: 80px;
    border-radius: 16px;
  }
}
`

const LOGO_SRC = '/icons/cae logo.png'

export default function ChatbotWidget() {
  useEffect(() => {
    const API_URL = 'http://localhost:5000'
    let history: { role: string; content: string }[] = []
    const sessionId = 'bb_' + Date.now() + '_' + Math.random().toString(36).slice(2, 9)
    let isOpen = false
    let isBusy = false

    const $window  = document.getElementById('bb-window')    as HTMLDivElement
    const $close   = document.getElementById('bb-close')     as HTMLButtonElement
    const $input   = document.getElementById('bb-input')     as HTMLInputElement
    const $send    = document.getElementById('bb-send')      as HTMLButtonElement
    const $msgs    = document.getElementById('bb-msgs')      as HTMLDivElement
    const $launcher = document.getElementById('bb-launcher') as HTMLButtonElement

    if (!$window || !$close || !$input || !$send || !$msgs || !$launcher) return

    function open()   { isOpen = true;  $window.classList.add('bb-open');    setTimeout(() => $input.focus(), 50) }
    function close()  { isOpen = false; $window.classList.remove('bb-open') }
    function toggle() { if (isOpen) { close() } else { open() } }

    // Expose global API for FloatingWidget to call
    ;(window as Window & { CAEWidget?: { toggle: () => void; open: () => void; close: () => void } }).CAEWidget = { toggle, open, close }

    function renderText(raw: string) {
      return raw
        .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .split('\n').map(line => {
          const b = line.match(/^[•\-*] (.+)/) || line.match(/^\d+\. (.+)/)
          return b ? `<li>${b[1]}</li>` : (line ? `<span>${line}</span><br>` : '<br>')
        }).join('')
    }

    function addMsg(text: string, isUser: boolean) {
      const row = document.createElement('div')
      row.className = 'bb-row ' + (isUser ? 'bb-user' : 'bb-bot')
      const bubble = document.createElement('div')
      bubble.className = 'bb-bubble'
      bubble.innerHTML = renderText(text)
      if (!isUser) {
        const av = document.createElement('div')
        av.className = 'bb-mini-avatar'
        av.innerHTML = `<img src="${LOGO_SRC}" alt="CAE AI" />`
        row.appendChild(av)
      }
      row.appendChild(bubble)
      $msgs.appendChild(row)
      $msgs.scrollTop = $msgs.scrollHeight
    }

    function showTyping() {
      const row = document.createElement('div')
      row.className = 'bb-row bb-bot'; row.id = 'bb-typing'
      const av = document.createElement('div')
      av.className = 'bb-mini-avatar'
      av.innerHTML = `<img src="${LOGO_SRC}" alt="CAE AI" />`
      const t = document.createElement('div')
      t.className = 'bb-typing'
      t.innerHTML = '<div class="bb-dot-t"></div><div class="bb-dot-t"></div><div class="bb-dot-t"></div>'
      row.appendChild(av); row.appendChild(t)
      $msgs.appendChild(row); $msgs.scrollTop = $msgs.scrollHeight
    }

    function hideTyping() { document.getElementById('bb-typing')?.remove() }

    function setBusy(v: boolean) { isBusy = v; $send.disabled = v; $input.disabled = v }

    async function send() {
      const msg = $input.value.trim()
      if (!msg || isBusy) return
      addMsg(msg, true); $input.value = ''; setBusy(true); showTyping()
      try {
        const res = await fetch(API_URL + '/chat', {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: msg, history, session_id: sessionId }),
        })
        hideTyping()
        if (!res.ok) throw new Error('Server error ' + res.status)
        const data = await res.json()
        if (data.status === 'success') {
          addMsg(data.response, false)
          history.push({ role: 'user', content: msg }, { role: 'assistant', content: data.response })
          if (history.length > 10) history = history.slice(-10)
        }
      } catch { hideTyping() }
      setBusy(false); $input.focus()
    }

    const onKeydown = (e: KeyboardEvent) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() } }

    $launcher.addEventListener('click', toggle)
    $close.addEventListener('click', close)
    $send.addEventListener('click', send)
    $input.addEventListener('keydown', onKeydown)

    return () => {
      $launcher.removeEventListener('click', toggle)
      $close.removeEventListener('click', close)
      $send.removeEventListener('click', send)
      $input.removeEventListener('keydown', onKeydown)
    }
  }, [])

  return (
    <>
      {/* eslint-disable-next-line react/no-danger */}
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {/* Launcher button */}
      <button id="bb-launcher" aria-label="Open AI chatbot">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.02 2 11c0 2.67 1.19 5.07 3.08 6.72L4 22l4.5-1.5C9.58 20.83 10.77 21 12 21c5.52 0 10-4.02 10-9s-4.48-9-10-9zm1 13h-2v-2h2v2zm0-4h-2V7h2v4z" />
        </svg>
        <span className="bb-ai-label">AI</span>
      </button>

      {/* Chat window */}
      <div id="bb-window" role="dialog" aria-label="Career Ambition Education AI Assistant">
        <div className="bb-header">
          <div className="bb-header-left">
            <div className="bb-avatar">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={LOGO_SRC} alt="Career Ambition Education logo" />
            </div>
            <div>
              <div className="bb-title">Career Ambition Education</div>
              <div className="bb-subtitle"><span className="bb-dot" /> AI Assistant · Online</div>
            </div>
          </div>
          <button className="bb-close" id="bb-close" aria-label="Close chat">&#x2715;</button>
        </div>

        <div className="bb-messages" id="bb-msgs">
          <div className="bb-row bb-bot">
            <div className="bb-mini-avatar">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={LOGO_SRC} alt="CAE AI" />
            </div>
            <div className="bb-bubble">
              नमस्ते! 👋 मैं Career Ambition Education का AI Assistant हूं।
              Admissions, courses, BSCC loan — कुछ भी पूछें!
            </div>
          </div>
        </div>

        <div className="bb-input-wrap">
          <input className="bb-input" id="bb-input" type="text"
            placeholder="कोई भी सवाल पूछें…" autoComplete="off" maxLength={2000}
            aria-label="Chat message" />
          <button className="bb-send" id="bb-send" aria-label="Send message">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#2E2567">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>
          </button>
        </div>

        <div className="bb-footer">Powered by <span>Delvion</span></div>
      </div>
    </>
  )
}
