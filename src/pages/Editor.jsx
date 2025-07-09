import React from 'react'
import Button from '../components/Button'
const Editor = () => {
  return (
    <div className="p-10 bg-purple-300 min-h-screen">
      <h1 className="text-xl font-bold text-purple-800 mb-4">New Note</h1>
      <textarea
        className="w-full h-96 p-4 rounded border text-black focus:outline-none focus:ring-2 focus:ring-primary bg-white"
        placeholder="Start writing here..."
      ></textarea>
      <button className="mt-4 bg-white shadow-xl rounded-md text-purple-700 px-6 py-2 font-bold hover:bg-purple-700">
        Save Note
      </button>
      <Button />
    </div>
  )
}

export default Editor