import React, {useEffect, useState} from 'react';
import Container from './Container';
import {MdDeleteOutline, MdSave} from "react-icons/md";

function Note({note, onDelete, onUpdate}){
    const [updatedContent, setUpdatedContent] = useState("")

    const handleDeleteNote = (e) => {
    e.stopPropagation();
    onDelete(note.id)
    } 

    useEffect(() => {
    setUpdatedContent(note.content);
    return () => setUpdatedContent("");
    }, [note])

    const handleUpdateNote = () => {
    if(updatedContent === note.content) return;
    const updatedDate = new Date();
    const newNote = {
        ...note,
        content: updatedContent,
        createdDate: updatedDate.toLocaleDateString(),
        createdTime: updatedDate.toLocaleTimeString(),
    };
    onUpdate(newNote);
    }

    return(
    <Container className="p-4">
        <div>
        <h1 className="text-lg font-bold mb-3">{note.title}</h1>
        <textarea rows="10" className="max-h-[40vh] overflow-auto mb-3 w-full bg-yellow-200 rounded-lg p-2" value={updatedContent} onChange={(e) => {
            setUpdatedContent(e.target.value)
        }}></textarea>  
        <h2>{note.createdDate}</h2>
        <h3>{note.createdTime}</h3>          
        </div> 
        <div className='flex justify-end text-3xl'>
        <MdSave className='text-sky-400 hover:text-sky-600' onClick={handleUpdateNote}/>
        <MdDeleteOutline className='text-red-400 hover:text-red-600' onClick={handleDeleteNote}/>
        </div>
    </Container>
    )
}

export default Note;