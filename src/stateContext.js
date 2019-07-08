import React from 'react';

const StateContext = React.createContext({
    folders: [],
    notes: [],
    deleteNote: () => {},
    addNote: () => {},
    addFolder: () => {},
})

export default StateContext;