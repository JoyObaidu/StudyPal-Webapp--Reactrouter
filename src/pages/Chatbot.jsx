import React, { useState, useRef, useEffect } from "react";
import Button from "../components/Button";
import BottomNav from "../components/Navbar";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi! I'm your AI assistant. Ask me anything!" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const chatRef = useRef(null);
  const messagesEndRef = useRef(null);

  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  // Auto-scroll
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize chat automatically
  const initializeChat = async () => {
    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      chatRef.current = await model.startChat({
        history: []
      });

      console.log("Chat initialized");
    } catch (error) {
      toast.error("Failed to initialize chatbot. Check your API key.");
      console.error("Init error:", error);
    }
  };

  useEffect(() => {
    initializeChat();
  }, []);

  // Send message
  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { from: "user", text: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const result = await chatRef.current.sendMessage(input.trim());
      const botReply = result.response?.text() || "⚠️ No response.";
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

  const clearChat = () => {
    setMessages([
      { from: "bot", text: "Hi! I'm your AI assistant. Ask me anything!" }
    ]);
    initializeChat();
    toast.info("Chat cleared");
  };

  return (
    <div className="flex flex-col h-screen bg-purple-100">
      <Button />

      <div className="p-10 flex justify-between items-center text-purple-800 border-b border-purple-200">
        <h1 className="text-xl font-bold">Chatbot</h1>
        <button
          onClick={clearChat}
          className="text-sm bg-purple-600 cursor-pointer text-white px-3 py-1 rounded"
        >
          Clear
        </button>
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
        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="p-4 flex gap-2 mb-32">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
          className="flex-1 bg-white text-black rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
        <button
          onClick={handleSend}
          disabled={loading || !input.trim()}
          className="bg-purple-900 cursor-pointer text-white px-4 py-2 rounded hover:bg-purple-600 transition"
        >
          Send
        </button>
      </div>

      <BottomNav />
    </div>
  );
};

export default Chatbot;
