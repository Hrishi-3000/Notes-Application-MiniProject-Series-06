import React, { useState, useEffect } from 'react';
import NoteEditor from './components/NoteEditor';
import NoteList from './components/NoteList';
import NotePreview from './components/NotePreview';
import SearchBar from './components/SearchBar';
import './App.css';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [trash, setTrash] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [view, setView] = useState('active'); // 'active' or 'trash'

  // Load data from localStorage
  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem('notes-app-data'));
    const savedTrash = JSON.parse(localStorage.getItem('notes-app-trash'));
    const savedDarkMode = JSON.parse(localStorage.getItem('notes-app-dark-mode'));
    
    if (savedNotes) setNotes(savedNotes);
    if (savedTrash) setTrash(savedTrash);
    if (savedDarkMode) setDarkMode(savedDarkMode);
  }, []);

  // Save data to localStorage
  useEffect(() => {
    localStorage.setItem('notes-app-data', JSON.stringify(notes));
    localStorage.setItem('notes-app-trash', JSON.stringify(trash));
    localStorage.setItem('notes-app-dark-mode', JSON.stringify(darkMode));
  }, [notes, trash, darkMode]);

  const addNote = (newNote) => {
    setNotes([{ ...newNote, id: Date.now(), pinned: false }, ...notes]);
  };

  const updateNote = (updatedNote) => {
    setNotes(notes.map(note => note.id === updatedNote.id ? updatedNote : note));
    if (selectedNote?.id === updatedNote.id) {
      setSelectedNote(updatedNote);
    }
  };

  const deleteNote = (noteId) => {
    const noteToDelete = notes.find(note => note.id === noteId);
    if (noteToDelete) {
      setTrash([...trash, { ...noteToDelete, deletedAt: new Date().toISOString() }]);
      setNotes(notes.filter(note => note.id !== noteId));
      if (selectedNote?.id === noteId) {
        setSelectedNote(null);
      }
    }
  };

  const restoreNote = (noteId) => {
    const noteToRestore = trash.find(note => note.id === noteId);
    if (noteToRestore) {
      setNotes([...notes, noteToRestore]);
      setTrash(trash.filter(note => note.id !== noteId));
    }
  };

  const permanentlyDeleteNote = (noteId) => {
    setTrash(trash.filter(note => note.id !== noteId));
  };

  const togglePinNote = (noteId) => {
    setNotes(notes.map(note => 
      note.id === noteId ? { ...note, pinned: !note.pinned } : note
    ));
  };

  const filteredNotes = (view === 'active' ? notes : trash)
    .filter(note => {
      const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          note.content.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || 
                            note.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (a.pinned && !b.pinned) return -1;
      if (!a.pinned && b.pinned) return 1;
      return new Date(b.id) - new Date(a.id);
    });

  const categories = ['all', ...new Set(notes.map(note => note.category).filter(Boolean))];

  return (
    <div className={`app ${darkMode ? 'dark' : 'light'}`}>
      <div className="header">
        <h1>Enhanced Notes</h1>
        <div className="header-actions">
          <button 
            onClick={() => setDarkMode(!darkMode)} 
            className="mode-toggle"
          >
            {darkMode ? '☀️ Light' : '🌙 Dark'}
          </button>
          <div className="view-toggle">
            <button
              className={view === 'active' ? 'active' : ''}
              onClick={() => setView('active')}
            >
              Notes
            </button>
            <button
              className={view === 'trash' ? 'active' : ''}
              onClick={() => setView('trash')}
            >
              Trash
            </button>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="sidebar">
          <SearchBar 
            searchTerm={searchTerm} 
            setSearchTerm={setSearchTerm} 
            darkMode={darkMode}
          />
          
          <div className="category-filter">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className={darkMode ? 'dark' : ''}
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <NoteEditor 
            addNote={addNote} 
            updateNote={updateNote} 
            selectedNote={selectedNote}
            darkMode={darkMode}
          />

          <NoteList
            notes={filteredNotes}
            selectedNote={selectedNote}
            setSelectedNote={setSelectedNote}
            deleteNote={view === 'active' ? deleteNote : permanentlyDeleteNote}
            restoreNote={view === 'trash' ? restoreNote : null}
            togglePinNote={view === 'active' ? togglePinNote : null}
            view={view}
            darkMode={darkMode}
          />
        </div>

        <NotePreview 
          note={selectedNote} 
          darkMode={darkMode}
          onClose={() => setSelectedNote(null)}
        />
      </div>
    </div>
  );
};

export default App;