import React from 'react';

const StateContext = React.createContext({
    folders: [],
    notes: [],
    deleteNote: () => {},
})

export default StateContext;