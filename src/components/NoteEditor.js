import React, { useState, useEffect } from 'react';

const NoteEditor = ({ addNote, updateNote, selectedNote, darkMode }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    if (selectedNote) {
      setTitle(selectedNote.title);
      setContent(selectedNote.content);
      setCategory(selectedNote.category || '');
    } else {
      setTitle('');
      setContent('');
      setCategory('');
    }
  }, [selectedNote]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const noteData = {
      title: title.trim(),
      content: content.trim(),
      category: category.trim() || 'uncategorized',
      lastEdited: new Date().toISOString()
    };

    if (selectedNote) {
      updateNote({ ...selectedNote, ...noteData });
    } else {
      addNote(noteData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="note-form">
      <input
        type="text"
        placeholder="Note title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="note-input"
        required
      />
      <textarea
        placeholder="Write your note here (supports Markdown)..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="note-textarea"
        rows="5"
      />
      <input
        type="text"
        placeholder="Category (optional)"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="note-input"
      />
      <button type="submit" className="add-button">
        {selectedNote ? 'Update Note' : 'Add Note'}
      </button>
    </form>
  );
};

export default NoteEditor;