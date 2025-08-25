import React, { useEffect, useState } from 'react';
import Button from '../components/Button';
import { useNavigate, useParams } from 'react-router-dom';
import BottomNav from '../components/Navbar';

const Editor = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');
  const [existingNotes, setExistingNotes] = useState([]);

  // Load notes + prefill if editing
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const notes = JSON.parse(localStorage.getItem('notes')) || [];
      setExistingNotes(notes);

      if (id) {
        const noteToEdit = notes.find(n => n.id === Number(id));
        if (noteToEdit) {
          setNoteTitle(noteToEdit.title);
          setNoteContent(noteToEdit.content);
        }
      }
    }
  }, [id]);

  const handleSave = () => {
    if (noteTitle.trim() === '' || noteContent.trim() === '') {
      alert('Please enter a title and content before saving!');
      return;
    }

    let updatedNotes;

    if (id) {
      // Editing an existing note
      updatedNotes = existingNotes.map(note =>
        note.id === Number(id)
          ? { ...note, title: noteTitle, content: noteContent }
          : note
      );
    } else {
      // Creating a new note
      updatedNotes = [
        ...existingNotes,
        { id: Date.now(), title: noteTitle, content: noteContent },
      ];
    }

    localStorage.setItem('notes', JSON.stringify(updatedNotes));
    setExistingNotes(updatedNotes);
    navigate('/notes');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-purple-200 flex flex-col items-center p-8">
      <Button />

      <div className="w-full max-w-2xl bg-white shadow-xl border border-purple-200 rounded-xl mt-10 p-6">
        <h1 className="text-2xl font-bold text-purple-800 mb-4">
          {id ? 'Edit Note' : 'New Note'}
        </h1>

        {/* Title Input */}
        <input
          type="text"
          placeholder="Note Title"
          value={noteTitle}
          onChange={(e) => setNoteTitle(e.target.value)}
          className="w-full p-3 rounded-lg border border-purple-300 text-purple-950 bg-purple-50 focus:outline-none focus:ring-2 focus:ring-purple-500 mb-4"
        />

        {/* Content Input */}
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
          {id ? 'Update Note' : 'Save Note'}
        </button>
      </div>
      <BottomNav />
    </div>
  );
};

export default Editor;
