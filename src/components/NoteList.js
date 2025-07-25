import React from 'react';
import { FiTrash2, FiRotateCcw, FiBookmark } from 'react-icons/fi';

const NoteList = ({ 
  notes, 
  selectedNote, 
  setSelectedNote, 
  deleteNote, 
  restoreNote, 
  togglePinNote, 
  view, 
  darkMode 
}) => {
  if (notes.length === 0) {
    return (
      <div className="empty-state">
        <p>{view === 'active' ? 'No notes found' : 'Trash is empty'}</p>
      </div>
    );
  }

  return (
    <div className="notes-list">
      {notes.map((note) => (
        <div
          key={note.id}
          className={`note-item ${selectedNote?.id === note.id ? 'active' : ''} ${
            note.pinned ? 'pinned' : ''
          }`}
          onClick={() => setSelectedNote(note)}
        >
          <div className="note-header">
            <h3>{note.title}</h3>
            {view === 'active' && togglePinNote && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  togglePinNote(note.id);
                }}
                className={`pin-button ${note.pinned ? 'pinned' : ''}`}
                title={note.pinned ? 'Unpin note' : 'Pin note'}
              >
                <FiBookmark />
              </button>
            )}
          </div>
          <p className="note-excerpt">
            {note.content.substring(0, 80)}{note.content.length > 80 ? '...' : ''}
          </p>
          {note.category && (
            <span className="note-category">{note.category}</span>
          )}
          <div className="note-footer">
            <small>
              {new Date(note.lastEdited || note.id).toLocaleDateString()}
            </small>
            <div className="note-actions">
              {view === 'trash' && restoreNote && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    restoreNote(note.id);
                  }}
                  className="restore-button"
                  title="Restore note"
                >
                  <FiRotateCcw />
                </button>
              )}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteNote(note.id);
                }}
                className="delete-button"
                title={view === 'active' ? 'Delete note' : 'Permanently delete'}
              >
                <FiTrash2 />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NoteList;