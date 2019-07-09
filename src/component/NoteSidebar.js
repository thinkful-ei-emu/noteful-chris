import React from 'react';
import StateContext from '../StateContext';
import PropTypes from 'prop-types';

class NoteSidebar extends React.Component {
    static contextType = StateContext;
    render(){
        const {notes, folders} = this.context;
    const note = notes.find(note => note.id === this.props.match.params.noteId)
    const folder = folders.map(folder => folder.id === note.folderId ? 
        <h2 key={folder.id}>{folder.name}</h2> : '')
    return (
    <div>
        <div>
            <button onClick={() => this.props.history.goBack()}>Go Back</button>
        </div>
        <div>{folder}</div>
    </div>
    )
}
}

NoteSidebar.propTypes = {
    match:PropTypes.shape({
        params: PropTypes.object,
    }),
    history:PropTypes.shape({
        push: PropTypes.func,
    })
  };

export default NoteSidebar;