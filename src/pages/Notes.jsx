import React, { useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import BottomNav from '../components/Navbar'
import Button from '../components/Button'

const Notes = () => {
  const [allNotes, setAllNotes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    setAllNotes(savedNotes);
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter notes
  const filteredNotes = allNotes.filter(note =>
    note?.content?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen pb-24 bg-gradient-to-b from-purple-50 to-purple-200 flex flex-col items-center px-4">
      <h1 className="text-2xl font-bold mt-6 mb-4 text-purple-800">My Notes</h1>

      {/* Search Bar */}
      <div className="mb-6 w-full max-w-md flex items-center bg-white border border-purple-300 rounded-lg shadow-sm overflow-hidden">
        <div className="px-3 text-purple-500">
          <FaSearch />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search notes..."
          className="flex-1 p-2 text-purple-800 focus:outline-none"
        />
      </div>

      {/* Notes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl mb-6">
        {filteredNotes.length === 0 && (
          <p className="text-purple-500 text-center w-full">No notes found.</p>
        )}
        {filteredNotes.map(note => (
          <div
            key={note.id}
            className="p-4 bg-white border border-purple-200 rounded-xl shadow-sm hover:shadow-md transition cursor-pointer"
          >
            <h2 className="font-semibold text-lg text-purple-800 mb-2">Note</h2>
            <p className="text-sm text-purple-700">{note.content.slice(0, 100)}...</p>
          </div>
        ))}
      </div>

      {/* Add Note Button (INLINE instead of Floating) */}
      <Link
        to="/editor"
        className="w-16 max-w-md text-center bg-purple-700 hover:bg-purple-800 text-white font-semibold py-3 rounded-4xl shadow transition"
      >
        + 
      </Link>

      <Button />
      <BottomNav />
    </div>
  )
}

export default Notes
