import React, {useState, useEffect} from 'react'
import ReactDOM from 'react-dom'

function App() {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");

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

  const handleCreateNote = () => {
    const createdDate = new Date();
    const note = {
      id: 1,
      title: noteTitle,
      content: noteContent,
      created: createdDate
    };
    setNotes(prev => [...prev, note])
    setNoteTitle("");
    setNoteContent("");
    setIsAddingNote(false);
  }

  const renderedNotes = notes.map((note) => <SmallNote note={note} key={note.id} onClick={() => handleSelectedNote(note)}/>);
  
  const actionBar = <div className='text-indigo-700 font-bold flex flex-row justify-between'>
    <button className='bg-red-200 p-3 rounded-xl hover:bg-red-300' onClick={handleCancelNote}>Cancel</button>
    <button className='bg-yellow-100 p-3 rounded-xl hover:bg-yellow-500' onClick={handleCreateNote}>Create note</button>
  </div>

  const addNoteModal = <Modal actionBar={actionBar}>
    <div className='text-indigo-700'> 
      <div className='flex flex-col mb-2'>
        <label htmlFor="title" className='font-bold'>Title</label>
        <input type="text" name='title' className='bg-yellow-100 rounded-lg outline-indigo-400 p-2 font-medium' value={noteTitle} onChange={(e) => setNoteTitle(e.target.value)} placeholder='Add a new title'/>
      </div>
      <div className='flex flex-col'>
        <label htmlFor="content" className='font-bold'>Content</label>
        <textarea name="content" id="" cols="30" rows="10" className='rounded-lg bg-yellow-100 outline-indigo-400 p-2 font-medium' value={noteContent} onChange={(e) => setNoteContent(e.target.value)} placeholder='Write something!'></textarea>
      </div>
    </div>
  </Modal>

  return (
    <div className="flex flex-col h-screen relative">
      {
        isAddingNote && addNoteModal
      }
      <div className="p-5 bg-indigo-300 text-white text-xl font-bold">Notes</div>
      <div className="flex flex-row flex-1 max-h-[90vh]">
        <div className="grow p-4">
          <Note note={selectedNote}/>
        </div>
        <div className="max-w-sm p-4 overflow-auto">{renderedNotes}</div>
      </div>
      <span className="w-fit p-4 absolute bottom-0 right-0 m-2 rounded-full bg-yellow-200 hover:bg-yellow-300 cursor-pointer" onClick={handleAddNote}>Add note</span>
    </div>
  );
}

function Note({note}){
  if(!note) return <div className="bg-yellow-100 rounded-2xl p-4">Start by selecting a note...</div>
  return(
    <div className="bg-yellow-100 rounded-2xl p-4">
      <h1 className="text-lg font-bold mb-3">{note.title}</h1>
      <p className="max-h-[40vh] overflow-auto mb-3">{note.content}</p>  
      <h2>{note.created.toDateString()}</h2>          
    </div>
  )
}

function SmallNote({ note, ...rest }) {
  return (
    <div className="bg-yellow-200 hover:bg-yellow-300 rounded-xl mb-2 p-3 cursor-pointer" {...rest}>
      <h1 className="font-bold mb-2">{note.title}</h1>
      <p className="line-clamp-5">{note.content}</p>
    </div>
  );
}

function Modal({children, onClose, actionBar}){
  useEffect(()=>{
    document.body.classList.add('overflow-hidden')
    return () => document.body.classList.remove('overflow-hidden')
  },[])
  return ReactDOM.createPortal(
    <div>
      <div onClick={onClose} className='fixed inset-0 bg-gray-300 opacity-80'></div>
        <div className="fixed inset-x-40 inset-y-96 p-10 bg-yellow-300 rounded-lg">
            <div className='flex flex-col justify-between h-full'>
                {children}
                <div>
                    {actionBar}
                </div>
            </div>
        </div>
    </div>,
    document.querySelector('.modal-container')
  )
}

export default App;
