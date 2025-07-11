import React from 'react'
import Button from '../components/Button'
import { useNavigate } from 'react-router-dom'
import BottomNav from '../components/Navbar';

const Editor = () => {
  const navigate = useNavigate();
  const [noteContent, setNoteContent] = React.useState('');
  const [existingNotes, setExistingNotes] = React.useState(() => {
    if (typeof window !== 'undefined') {
      const notes = window.localStorage.getItem('notes');
      return notes ? JSON.parse(notes) : [];
    }
    return [];
  });

  const handleSave = () => {
    if (typeof window !== 'undefined') {
      const updatedNotes = [...existingNotes, { id: Date.now(), content: noteContent }];
      window.localStorage.setItem('notes', JSON.stringify(updatedNotes));
      setExistingNotes(updatedNotes);
      navigate('/notes');
    }
  };

  return (
    <div className="p-10 bg-purple-300 min-h-screen">
      <h1 className="text-xl font-bold text-purple-800 mb-4">New Note</h1>
      <textarea
        className="w-full h-96 p-4 rounded border text-black focus:outline-none focus:ring-2 focus:ring-primary bg-white"
        placeholder="Start writing here..."
        value={noteContent}
        onChange={(e) => setNoteContent(e.target.value)}
      ></textarea>
      <button
      onClick={handleSave}
      className="mt-4 bg-white shadow-xl rounded-md text-purple-700 px-6 py-2 font-bold hover:bg-purple-700">
        Save Note Now
      </button>
      <Button />

      <BottomNav />
    </div>
  )
}

export default Editor