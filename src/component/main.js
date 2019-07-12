import React from 'react';
import { Link } from 'react-router-dom';
import StateContext from '../StateContext';


class Main extends React.Component {
    static contextType = StateContext;
    
    render() {
        const {notes, deleteNote} = this.context;
    const newNote = notes.map(note => (
        <li className='noteBox' key={note.id}>
            <div><Link to={`/Note/${note.id}`}>{note.name}</Link></div>
            <div>Date modified on {note.modified}</div>
            <button onClick={() => {
                deleteNote(note.id)}}>
                    Delete Note
            </button>
            
        </li>
        )
    )
    return (
    <div className='main'>
        <ul>
            {newNote}
        </ul>
        <div>
            <button><Link to={`/AddNote`}>Add note</Link></button>
        </div>
    </div>
    )
}
}

export default Main;