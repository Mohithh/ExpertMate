'use client';
import { useState } from 'react';

export default function Chatbot() {
  const [input, setInput] = useState('');
  const [chat, setChat] = useState([]);

  const sendMessage = async () => {
    const userMessage = { sender: 'user', text: input };
    setChat([...chat, userMessage]);

    const res = await fetch('/api/chat', {
      method: 'POST',
      body: JSON.stringify({ message: input }),
    });

    const data = await res.json();
    const botMessage = { sender: 'bot', text: data.reply };

    setChat((prev) => [...prev, botMessage]);
    setInput('');
  };

  return (
    <div className="max-w-xl mx-auto p-4 space-y-4">
      <div className="border p-4 rounded h-96 overflow-y-scroll bg-white dark:bg-gray-800">
        {chat.map((msg, i) => (
          <div key={i} className={`mb-2 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
            <span className={`px-3 py-2 inline-block rounded ${msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-black dark:text-white'}`}>
              {msg.text}
            </span>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 border p-2 rounded"
          placeholder="Type your question..."
        />
        <button onClick={sendMessage} className="bg-blue-600 text-white px-4 py-2 rounded">Send</button>
      </div>
    </div>
  );
}
