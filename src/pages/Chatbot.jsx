import React, { useState, useRef } from "react";
import Button from "../components/Button";
import BottomNav from "../components/Navbar";
import { GoogleGenerativeAI } from "@google/generative-ai";

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi! I'm your AI assistant. Ask me anything!" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" }); 
  const chatRef = useRef(null);

  if (!chatRef.current) {
    chatRef.current = model.startChat({
      history: [] // ✅ start empty; we'll handle greetings ourselves
    });
  }

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { from: "user", text: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const result = await chatRef.current.sendMessage(input.trim());
      const botReply = result.response.text();
      setMessages((prev) => [...prev, { from: "bot", text: botReply }]);
    } catch (err) {
      console.error("Error:", err);
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "⚠️ Error: Could not get a response." }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
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
              msg.from === "user"
                ? "bg-purple-700 text-white ml-auto"
                : "bg-white text-black mr-auto"
            }`}
          >
            {msg.text}
          </div>
        ))}
        {loading && (
          <div className="italic text-gray-500 mt-2">Bot is typing...</div>
        )}
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
