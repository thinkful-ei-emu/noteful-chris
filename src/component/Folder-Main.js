import React from 'react';
import { Link } from 'react-router-dom';
import StateContext from '../StateContext';
import PropTypes from 'prop-types';

class FolderMain extends React.Component {
    static contextType = StateContext;
    render(){ 
        const{ notes, deleteNote} = this.context; 
        const newNotes = notes.map((note, index) => note.folderId === this.props.match.params.folderId ? (
            <li className='noteBox' key={index}>
                <div><Link to={`/Note/${note.id}`}>{note.name}</Link></div>
                <div>Date modified on {note.modified}</div>
                <button onClick={() =>{
                    deleteNote(note.id)}}>
                        Delete Note
                </button>
            </li>
            ) : <div key={index}></div> )
        return (
        <div>
            <ul className='main'>{newNotes}</ul>
            <button className='AddNote'><Link to={`/AddNote`}>Add note</Link></button>
        </div>
        )
    }
}

FolderMain.propTypes = {
    match:PropTypes.shape({
        params: PropTypes.object,
    })
  };

export default FolderMain;