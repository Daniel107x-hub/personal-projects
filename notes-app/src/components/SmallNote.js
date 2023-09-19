import Container from "./Container";
import {MdDeleteOutline} from "react-icons/md";

function SmallNote({ note, onDelete, ...rest }) {
    const handleDeleteNote = (e) => {
        e.stopPropagation();
        onDelete(note.id)
    } 

    return (
        <Container className="cursor-pointer mb-2 p-3" {...rest}>
        <div className="flex justify-end">
            <MdDeleteOutline className='text-2xl text-red-300 hover:text-red-600' onClick={handleDeleteNote}/>
        </div>
        <div>
            <h1 className="font-bold mb-2">{note.title}</h1>
            <p className="line-clamp-5">{note.content}</p>
        </div>
        </Container>
    );
}

export default SmallNote;