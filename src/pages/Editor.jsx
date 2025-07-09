import React from 'react'

const Editor = () => {
  return (
    <div className="p-4 bg-purple-100 min-h-screen">
      <h1 className="text-xl font-bold text-purple-800 mb-4">New Note</h1>
      <textarea
        className="w-full h-96 p-4 rounded border focus:outline-none focus:ring-2 focus:ring-primary bg-white"
        placeholder="Start writing here..."
      ></textarea>
      <button className="mt-4 bg-primary text-white px-6 py-2 rounded hover:bg-purple-700">
        Save Note
      </button>
    </div>
  )
}

export default Editor