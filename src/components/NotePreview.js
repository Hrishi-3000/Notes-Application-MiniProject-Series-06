import React from 'react';
import ReactMarkdown from 'react-markdown';

const NotePreview = ({ note, darkMode, onClose }) => {
  if (!note) return null;

  return (
    <div className="note-preview">
      <button onClick={onClose} className="close-button">
        &times;
      </button>
      <h2>{note.title}</h2>
      <div className="note-meta">
        {note.category && (
          <span className="note-category">{note.category}</span>
        )}
        <span className="note-date">
          Last edited: {new Date(note.lastEdited || note.id).toLocaleString()}
        </span>
      </div>
      <div className="markdown-preview">
        <ReactMarkdown>{note.content}</ReactMarkdown>
      </div>
    </div>
  );
};

export default NotePreview;