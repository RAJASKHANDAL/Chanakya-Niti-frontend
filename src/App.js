import React, { useMemo, useState } from 'react';
import './App.css';

import LandingPage from './pages/LandingPage';
import SabhaPage from './pages/SabhaPage';

function App() {
  const [screen, setScreen] = useState('landing');
  const [input, setInput] = useState('');
  const [language, setLanguage] = useState('en');

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'acharya',
      text: 'Om Namah, seeker. I am Acharya Vishnugupta. Speak with clarity, and I shall answer with Niti, discipline, and insight.',
      isTyping: false,
      meta: 'Acharya Vishnugupta · Sabha',
    },
  ]);

  // 🔥 TYPEWRITER
  const typeMessage = (id, fullText) => {
    let index = 0;

    const type = () => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === id
            ? { ...msg, text: fullText.slice(0, index + 1) }
            : msg
        )
      );

      index++;

      if (index < fullText.length) {
        const delay = index < 20 ? 40 : 25;
        setTimeout(type, delay);
      } else {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === id ? { ...msg, isTyping: false } : msg
          )
        );
      }
    };

    type();
  };



  // 🔆 Greeting
  const greetingLine = useMemo(() => {
    const hour = new Date().getHours();

    if (hour >= 4 && hour < 12) return 'Dawn is the hour of discipline, seeker.';
    if (hour >= 12 && hour < 18) return 'The day rewards clarity of thought and action.';
    if (hour >= 18 && hour < 22) return 'Evening is for reflection. Ask with sincerity.';
    return 'Night favors reflection. Speak carefully, seeker.';
  }, []);

  // 🔁 Navigation
  const enterSabha = () => {
    setScreen('chat');
  };

  // 📩 SEND MESSAGE
  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: trimmed,
      meta: 'Seeker',
    };

    const thinkingMessage = {
      id: Date.now() + 1,
      sender: 'thinking',
      text: 'Acharya contemplates...',
      meta: 'Wisdom is forming',
    };

    setMessages((prev) => [...prev, userMessage, thinkingMessage]);
    setInput('');

    const thinkingDelay = Math.random() * 800 + 600;

setTimeout(async () => {
  try {
    // 🧠 Greeting / Human conversation logic
const greetings = [
  "hi",
  "hello",
  "hey",
  "namaste",
  "heyy acharya",
  "hey acharya"
];

if (greetings.includes(trimmed.toLowerCase())) {

  const introReplies =
  language === "hi"
    ? [
        "निःसंकोच बोलो साधक, तुम्हारे मन को क्या विचलित कर रहा है?",

        "मन की उलझन को शब्द देना ही ज्ञान की शुरुआत है।",

        "तुम्हारा अंतर्मन आज कौन-सा उत्तर खोज रहा है?",

        "जब उद्देश्य धुंधला हो, मन भटकने लगता है। अपने विचार कहो।",

        "प्रश्न मन की अवस्था प्रकट करते हैं। बिना भय पूछो।",

        "जिस पीड़ा को छुपाया जाए, वह और गहरी हो जाती है। बोलो साधक।"
      ]
    : [
        "Speak freely, seeker. What troubles your mind today?",

        "Every restless mind seeks clarity. Tell me what burdens you.",

        "Wisdom begins when confusion is spoken aloud.",

        "What answer does your inner self seek today?",

        "The mind wanders when purpose is unclear. Speak your thoughts.",

        "Questions reveal the state of the mind. Ask without hesitation."
      ];  

  const reply =
    introReplies[
      Math.floor(Math.random() * introReplies.length)
    ];

  // remove thinking
  setMessages((prev) =>
    prev.filter((msg) => msg.id !== thinkingMessage.id)
  );

  const messageId = Date.now() + 2;

  setMessages((prev) => [
    ...prev,
    {
      id: messageId,
      sender: "acharya",
      text: "",
      isTyping: true,
      meta: "Acharya Vishnugupta",
    },
  ]);

  typeMessage(messageId, reply);

  return;
}

    const response = await fetch(" https://chanakya-niti-backend-36h3.onrender.com/api/get-shloka", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        input: trimmed,
        language: language,
      }),
    });

    const data = await response.json();

    const reply =
  data.shloka
    ? language === "hi"
      ? `📜 ${data.shloka}\n\n💡 ${data.meaning_hi}\n\n🧠 ${data.application}`
      : `📜 ${data.shloka}\n\n💡 ${data.meaning_en}\n\n🧠 ${data.application}`
    : "Acharya remains silent...";

    

    // remove thinking
    setMessages((prev) =>
      prev.filter((msg) => msg.id !== thinkingMessage.id)
    );

    const messageId = Date.now() + 2;

    setMessages((prev) => [
      ...prev,
      {
        id: messageId,
        sender: "acharya",
        text: "",
        isTyping: true,
        meta: "Acharya Vishnugupta",
      },
    ]);

    typeMessage(messageId, reply);

  } catch (err) {
  console.error(err);

  // remove thinking
  setMessages((prev) =>
    prev.filter((msg) => msg.id !== thinkingMessage.id)
  );

  const messageId = Date.now() + 2;

  setMessages((prev) => [
    ...prev,
    {
      id: messageId,
      sender: "acharya",
      text:
        "Even wisdom cannot travel through a broken path. The Sabha is disturbed at the moment.",
      meta: "Acharya Vishnugupta",
    },
  ]);
}
}, thinkingDelay);
  };

  // ⌨️ ENTER KEY
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="app">
      {screen === 'landing' && (
        <LandingPage
          greetingLine={greetingLine}
          enterSabha={enterSabha}
        />
      )}

      {screen === 'chat' && (
        <SabhaPage
          messages={messages}
          input={input}
          setInput={setInput}
          handleSend={handleSend}
          handleKeyDown={handleKeyDown}
          language={language}
          setLanguage={setLanguage}
        />
      )}
    </div>
  );
}

export default App;