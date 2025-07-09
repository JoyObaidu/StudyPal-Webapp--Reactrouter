import React from 'react'

const Chatbot = () => {
  return (
    <div className="h-screen p-4 bg-purple-400 flex flex-col">
      <header>
        <h2 className="text-2xl font-bold text-white">Chatbot</h2>
      </header>
      <main className="flex-1 p-4">
        <div className="bg-white rounded-lg shadow-md p-4">
          <h3 className="text-lg font-semibold">How can I assist you today?</h3>
          <input
            type="text"
            placeholder="Type your message..."
            className="border border-gray-300 rounded-lg p-2 w-full mt-2"
          />
        </div>
      </main>
    </div>
  )
}

export default Chatbot