import React from 'react';

function FolderMain({notes, folderId}) {
    const newNote = notes.map(note => note.folderId === folderId ? (
        <div>
            <div>{note.name}</div>
            <div>Date modified on {note.modified}</div>
            <button>Delete Note</button>
            <button>Add note</button>
        </div>
        ) : '' )
    return <div>{newNote}</div>
}

export default FolderMain;