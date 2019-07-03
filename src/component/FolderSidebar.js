import React from 'react';
import { Link } from 'react-router-dom'
import './FolderSidebar.css';
import StateContext from '../stateContext';

class FolderSidebar extends React.Component{
    static contextType = StateContext;
    render(){
    const {folders} = this.context
    const folder = folders.map(folder => folder.id === this.props.match.params.folderId ? 
        <li className="selected" key={folder.id}><Link to={`/Folder/${folder.id}`}>{folder.name}
        </Link></li> : <li><Link to={`/Folder/${folder.id}`}>{folder.name}</Link></li>)
    return (
    <div>
        <ul>
            {folder}        
        </ul>
        <div>
            <button>Add Folder</button>
        </div>
    </div>
    )
}
}

export default FolderSidebar;