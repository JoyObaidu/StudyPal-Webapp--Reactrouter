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

  // Filter notes to display
  const filteredNotes = allNotes.filter(note =>
  note?.content?.toLowerCase().includes(searchQuery.toLowerCase())
);


  return (
    <div className="p-10 bg-purple-100 min-h-screen flex flex-col items-center">
      <h1 className="text-xl font-bold mb-4 text-purple-800">My Notes</h1>
      
      {/* Search Bar */}
      <div className='mb-4 border border-gray-300 flex gap-2 items-center rounded w-full'>
        <FaSearch className="text-gray-500 ml-2" />
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search notes..."
          className="p-2 text-black w-full"
        />
      </div>

      <div className="grid grid-cols-2 gap-4 w-full">
        {filteredNotes.length === 0 && (
          <p className="text-gray-500">No notes found.</p>
        )}
        {filteredNotes.map(note => (
          <div key={note.id} className="p-4 bg-white rounded shadow hover:shadow-md">
            <h2 className="font-semibold text-lg text-black mb-2">Note</h2>
            <p className="text-sm text-gray-600">{note.content.slice(0, 100)}...</p>
          </div>
        ))}
      </div>

      <Link
        to="/editor"
        className="fixed bottom-20 right-6 bg-purple-950 text-white rounded-full w-12 h-12 flex items-center justify-center text-3xl shadow-lg hover:bg-purple-800 transition"
      >
        +
      </Link>
      
      <Button />
      <BottomNav />
    </div>
  )
}

export default Notes
