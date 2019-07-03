import React from 'react';

const StateContext = React.createContext({
    folders: [],
    notes: [],
    notesApiCall: () => [],
    foldersApiCall: () => []
})

export default StateContext;