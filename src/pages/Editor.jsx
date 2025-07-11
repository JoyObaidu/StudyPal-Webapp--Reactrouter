import React from 'react';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
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
    if (noteContent.trim() === '') {
      alert('Please write something before saving!');
      return;
    }

    if (typeof window !== 'undefined') {
      const updatedNotes = [
        ...existingNotes,
        { id: Date.now(), content: noteContent },
      ];
      window.localStorage.setItem('notes', JSON.stringify(updatedNotes));
      setExistingNotes(updatedNotes);
      navigate('/notes');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-purple-200 flex flex-col items-center p-8">
      <Button />

      <div className="w-full max-w-2xl bg-white shadow-xl border border-purple-200 rounded-xl mt-10 p-6">
        <h1 className="text-2xl font-bold text-purple-800 mb-4">New Note</h1>

        <textarea
          className="w-full min-h-[300px] p-4 rounded-lg border border-purple-300 text-purple-950 bg-purple-50 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none shadow-sm mb-4"
          placeholder="Start writing your thoughts or ideas here..."
          value={noteContent}
          onChange={(e) => setNoteContent(e.target.value)}
        />

        <button
          onClick={handleSave}
          className="w-full bg-purple-700 hover:bg-purple-800 text-white font-semibold px-6 py-3 rounded-lg shadow transition"
        >
          Save Note
        </button>
      </div>

      <BottomNav />
    </div>
  );
};

export default Editor;
