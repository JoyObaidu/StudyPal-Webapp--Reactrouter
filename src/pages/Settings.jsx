import React from 'react'

const Settings = () => {
  return (
    <div className="p-4 bg-purple-100 min-h-screen">
      <h1 className="text-xl font-bold text-purple-800 mb-4">Settings</h1>
      <div className="bg-white p-4 rounded shadow">
        <label className="block mb-2">Name</label>
        <input className="w-full p-2 border rounded mb-4" type="text" placeholder="Your name" />
        <label className="block mb-2">Theme</label>
        <select className="w-full p-2 border rounded">
          <option>Light</option>
          <option>Dark</option>
          <option>Purple</option>
        </select>
      </div>
    </div>
  )
}

export default Settings