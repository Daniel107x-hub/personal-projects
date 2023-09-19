import React, {useState, useEffect} from 'react'
import {MdDeleteOutline, MdSave} from "react-icons/md";
import ReactDOM from 'react-dom'
import {v4 as uuidv4} from 'uuid';
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Modal from './components/Modal';
import Container from './components/Container';
import SmallNote from './components/SmallNote';
import Note from './components/Note';

function App() {
  const [notes, setNotes] = useState(() => {
    const savedData = localStorage.getItem('notes');
    if(savedData) return JSON.parse(savedData);
    return [];
  });
  const [selectedNote, setSelectedNote] = useState(null);
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredNotes, setFilteredNotes] = useState([]);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes)); // Update notes on the local storage
  }, [notes])

  useEffect(() => {
    if(!searchTerm) {
      setFilteredNotes(notes);
      return;
    }
    const filtered = notes.filter(note => note.title.toLowerCase().startsWith(searchTerm.toLowerCase()));
    setFilteredNotes(filtered);
  }, [searchTerm, notes])

  const handleSelectedNote = (note) => {
    setSelectedNote(note);
  }

  const handleAddNote = () => {
    setIsAddingNote(true);
  }

  const handleCancelNote = () => {
    setNoteTitle(null);
    setNoteContent(null);
    setIsAddingNote(false);
  }

  const handleDeleteNote = (id) => {
    const remainingNotes = notes.filter(note => note.id !== id);
    if(id === selectedNote?.id) setSelectedNote(null);
    setNotes(remainingNotes);
  }

  const handleCreateNote = () => {
    const createdDate = new Date();
    const note = {
      id: uuidv4(),
      title: noteTitle,
      content: noteContent,
      createdDate: createdDate.toLocaleDateString(),
      createdTime: createdDate.toLocaleTimeString()
    };
    setNotes(prev => [...prev, note])
    setNoteTitle("");
    setNoteContent("");
    setIsAddingNote(false);
  }

  const handleUpdateNote = (updatedNote) => {
    const updatedNotes = notes.map(note => {
      if(note.id !== updatedNote.id) return note;
      return updatedNote;
    })
    setNotes(updatedNotes);
    setSelectedNote(updatedNote);
    toast.success("Note updated", {position: toast.POSITION.BOTTOM_LEFT})
  }

  const renderedNotes = filteredNotes.map((note) => <SmallNote note={note} key={note.id} onClick={() => handleSelectedNote(note)} onDelete={handleDeleteNote}/>);
  
  const actionBar = <div className='text-indigo-700 font-bold flex flex-row justify-between mt-5'>
    <button className='bg-red-200 p-3 rounded-xl hover:bg-red-300' onClick={handleCancelNote}>Cancel</button>
    <button className='bg-yellow-100 p-3 rounded-xl hover:bg-yellow-500' onClick={handleCreateNote}>Create note</button>
  </div>

  const addNoteModal = <Modal actionBar={actionBar}>
    <div className='text-indigo-700'> 
      <div className='flex flex-col mb-2'>
        <label htmlFor="title" className='font-bold'>Title</label>
        <input type="text" id="title" name='title' className='bg-yellow-100 rounded-lg outline-indigo-400 p-2 font-medium' value={noteTitle} onChange={(e) => setNoteTitle(e.target.value)} placeholder='Add a new title'/>
      </div>
      <div className='flex flex-col'>
        <label htmlFor="content" className='font-bold'>Content</label>
        <textarea name="content" id="content" cols="30" rows="10" className='rounded-lg bg-yellow-100 outline-indigo-400 p-2 font-medium' value={noteContent} onChange={(e) => setNoteContent(e.target.value)} placeholder='Write something!'></textarea>
      </div>
    </div>
  </Modal>

  return (
    <div className="flex flex-col h-screen relative">
      {
        isAddingNote && addNoteModal
      }
      <div className="p-5 bg-indigo-300 text-xl font-bold">Notes</div>
      <div className="flex flex-row flex-1 max-h-[90vh]">
        <div className="grow p-4">
          {
            selectedNote &&
            <Note note={selectedNote} onDelete={handleDeleteNote} onUpdate={handleUpdateNote}/>
          }
          {
            !selectedNote &&
            <Container className='p-3'>Start by creating or selecting a new note!</Container>
          }
        </div>
        {
          <div className="min-w-sm max-w-sm p-4 overflow-auto">
            <div className='mb-3'>
              <input type="text" placeholder='Title...' className='bg-sky-100 w-full p-3 text-orange-700 font-semibold rounded-xl outline-orange-400' onChange={(e) => setSearchTerm(e.target.value)}/>
            </div>
            <div className='flex justify-center flex-col'>
              {renderedNotes.length > 0 && renderedNotes}
              {renderedNotes.length === 0 && <Container className='bg-red-100 p-4'>Yo have no notes to show</Container>}
            </div>
          </div>
        }
      </div>
      <span className="w-fit p-4 absolute bottom-0 right-0 m-2 rounded-full bg-yellow-300 hover:bg-yellow-400 cursor-pointer" onClick={handleAddNote}>Add note</span>
      <ToastContainer/>
    </div>
  );
}

export default App;