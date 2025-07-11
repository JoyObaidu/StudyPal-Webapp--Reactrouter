import React, { useState } from 'react';
import Button from '../components/Button';
import BottomNav from '../components/Navbar';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hi! How can I help you today?' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { from: 'user', text: input.trim() }];

    // Add bot response (very basic!)
    newMessages.push({ from: 'bot', text: "I'm just a sample bot for now!" });

    setMessages(newMessages);
    setInput('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-purple-100">
      <Button />

      <div className="p-8 flex justify-center items-center text-purple-800">
        <h1 className="text-xl font-bold">Chatbot</h1>
      </div>

      {/* Chat area */}
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`mb-2 p-3 rounded-lg max-w-xs ${
              msg.from === 'user' ? 'bg-purple-700 text-black ml-auto' : 'bg-white text-black mr-auto'
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      {/* Input area */}
      <div className="p-4 flex gap-2 mb-16">
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Type your message..."
        className="flex-1 bg-white text-black rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
      />
      <button
        onClick={handleSend}
        className="bg-purple-800 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
      >
        Send
      </button>
    </div>


      <BottomNav />
    </div>
  );
};

export default Chatbot;
