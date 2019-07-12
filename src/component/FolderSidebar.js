import React from 'react';
import { Link } from 'react-router-dom'
import './FolderSidebar.css';
import StateContext from '../StateContext';
import PropTypes from 'prop-types';

class FolderSidebar extends React.Component{
    static contextType = StateContext;
    render(){
    const {folders} = this.context
    const folder = folders.map(folder => folder.id === this.props.match.params.folderId ? 
        <li className="selected" key={folder.id}><Link to={`/Folder/${folder.id}`}>{folder.name}
        </Link></li> : <li key={folder.id}><Link to={`/Folder/${folder.id}`}>{folder.name}</Link></li>)
    return (
    <div className='sidebar'>
        <ul>
            {folder}        
        </ul>
        <div>
            <button className='AddFol'><Link to={`/AddFolder`}>Add Folder</Link></button>
        </div>
    </div>
    )
}
}

FolderSidebar.propTypes = {
    match:PropTypes.shape({
        params: PropTypes.object,
    })
  };

export default FolderSidebar;