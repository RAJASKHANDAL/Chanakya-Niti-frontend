import React, { useEffect, useRef } from 'react';

function SabhaPage({
  messages,
  input,
  setInput,
  handleSend,
  handleKeyDown,
  typingText,
  language,        // ✅ ADD THIS
  setLanguage      // ✅ ADD THIS
}) {
  const chatRef = useRef(null);
  const inputRef = useRef(null);

  // 🔥 AUTO SCROLL TO LATEST MESSAGE
  // 🔥 AUTO SCROLL + AUTO FOCUS
useEffect(() => {
  chatRef.current?.scrollTo({
    top: chatRef.current.scrollHeight,
    behavior: 'smooth',
  });

  inputRef.current?.focus(); // 👈 move INSIDE
}, [messages]);

  return (
    <>
      {/* TOP BAR */}
      <header className="topbar">
        <div className="topbar__chant">
          NITI SHASTRA ✦ ARTHASHASTRA ✦ CHANAKYA NITI ✦ KAUTILYA ✦ CHANDRAGUPTA MAURYA ✦ VIDUR NITI
        </div>
        <div className="chat-panel__head">
  <span className="chat-panel__dot" />
  <span>Acharya</span>

  {/* 🔥 Language Toggle */}
  <div className="lang-toggle">
    <button
      className={language === 'en' ? 'active' : ''}
      onClick={() => setLanguage('en')}
    >
      EN
    </button>

    <button
      className={language === 'hi' ? 'active' : ''}
      onClick={() => setLanguage('hi')}
    >
      हिं
    </button>
  </div>
</div>
      </header>

      {/* SABHA MAIN */}
      <main className="sabha">
        
        {/* HERO */}
        <section className="sabha__hero">
          <div>
            <p className="sabha__eyebrow">Sabha of Wisdom</p>
            <h2 className="sabha__title">Dialogue with Acharya Vishnugupta</h2>
            <p className="sabha__subtitle">
              Speak honestly. Receive counsel in the spirit of Niti.
            </p>
          </div>

          <div className="sabha__seal">
            <img src="/Chanakya.png" alt="Acharya" />
          </div>
        </section>

        {/* CHAT PANEL */}
        <section className="chat-panel">
          <div className="chat-panel__head">
            <span className="chat-panel__dot" />
            <span>Acharya</span>
          </div>

          

          {/* 🔥 IMPORTANT: ADD ref HERE */}
          <div className="chat-panel__body" ref={chatRef}>
            {messages.map((msg) => (
              <article
                key={msg.id}
                className={`message ${
                  msg.sender === 'user'
                    ? 'message--user'
                    : msg.sender === 'thinking'
                    ? 'message--thinking'
                    : 'message--acharya'
                }`}
              >
                
                <p className={`message__text ${msg.isTyping ? "typing" : ""}`}>
  {msg.sender === "acharya"
    ? (typingText || msg.text)
    : msg.text}
</p>
                <span className="message__meta">{msg.meta}</span>
              </article>
            ))}
          </div>
          {/* INPUT */}
        <section className="scroll-input">
          <textarea
            className="scroll-input__field"
            placeholder="What troubles your mind, seeker?"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />

          <div className="scroll-input__actions">
            <button className="enter-btn" onClick={handleSend}>
              Send to Acharya
            </button>
          </div>
        </section>
        </section>
        

        {/* DIVIDER */}
        <div className="sabha__divider">✦</div>

        
          {/* COPYRIGHT */}
        <footer className="sabha__footer">
          © 2026 Chanakya Niti. All Rights Reserved.
        </footer>
      </main>
    </>
  );
  
}

export default SabhaPage;