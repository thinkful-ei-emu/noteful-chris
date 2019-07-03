import React from 'react';
import { Link } from 'react-router-dom';
import StateContext from '../stateContext';

class FolderMain extends React.Component {
    static contextType = StateContext;
    render(){ 
        const{ notes, deleteNote} = this.context; 
        const newNotes = notes.map((note, index) => note.folderId === this.props.match.params.folderId ? (
            <div key={index}>
                <div><Link to={`/Note/${note.id}`}>{note.name}</Link></div>
                <div>Date modified on {note.modified}</div>
                <button onClick={() =>{
                    deleteNote(note.id)}}>
                        Delete Note
                </button>
            </div>
            ) : <div key={index}></div> )
        return (
        <div>
            <div>{newNotes}</div>
            <button>Add Note</button>
        </div>
        )
    }
}

export default FolderMain;