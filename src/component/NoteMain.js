import React from 'react';
import StateContext from '../StateContext';
import PropTypes from 'prop-types';

import './NoteMain.css';

class NoteMain extends React.Component {
    static contextType = StateContext;
    render(){
        const {notes, deleteNote} = this.context;
    const newNote = notes.map(note => note.id === this.props.match.params.noteId ? (
        <div key={note.id} className='noteBox'>
            <h2>{note.name}</h2>
            <div>Date modified on {note.modified}</div>
            <button onClick={() => {
                deleteNote(note.id)               
                window.open('/','_self');
                }} 
                >
                    Delete Note
            </button>
            <p>{note.content}</p>
        </div>
        ) : '' )
    return <div className='main'>{newNote}</div>
}
}

NoteMain.propTypes = {
    match:PropTypes.shape({
        params: PropTypes.object,
    })
  };

export default NoteMain;