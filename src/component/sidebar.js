import React from 'react';
import { Link } from 'react-router-dom';
import StateContext from '../StateContext';

import './Sidebar.css';

class Sidebar extends React.Component {
    static contextType = StateContext;
    render() {
    const { folders } = this.context;
    const folder = folders.map(folder => 
        <li key={folder.id}><Link to={`/Folder/${folder.id}`}>{folder.name}</Link></li>)
    return (
    <div className="sidebar">
        <ul>
            {folder}        
        </ul>
        <div>
            <button className="AddFol"><Link to={`/AddFolder`}>Add Folder</Link></button>
        </div>
    </div>
    )
}
}

export default Sidebar;