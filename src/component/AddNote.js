import React from 'react';
import StateContext from '../StateContext';
import PropTypes from 'prop-types';

import './Add.css';

class AddNote extends React.Component {
    static contextType = StateContext;

    state = {
        error: null,
        name: {
            value: '',
            touched: false
        },
        folderId: {
            value: '',
            touched: false
        },
        content: {
            value: '',
            touched: false
        },
    }

    guidGenerator = () => {
        var S4 = function() {
           return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
        };
        return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
    }

    createNoteName(name) {
        this.setState({ name: { value: name, touched: true }})
    }

    createNoteFolderId(folderId) {
        this.setState({ folderId: { value: folderId, touched: true }})
    }

    createNoteContent(content) {
        this.setState({ content: { value: content, touched: true }})
    }

    handleSubmit = e => {
        e.preventDefault()
        const { name, content, folderId } = this.state;
        const note = {
            id: this.guidGenerator(),
            name: name.value,
            modified: `${Date.now()}`,
            folderId: folderId.value,
            content: content.value
        }
        this.setState({error:null})
        console.log(note);
        
        const url = `http://localhost:9090/notes/`;
    
        fetch(url, {
        method: 'Post',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(note),
        })
        .then(res => {
            if(!res.ok) {
            return res.json().then(error => {
                throw error;
            })
            }
            return res.json()
        })
        .then(data => {
            name.value = '';
            content.value = '';
            folderId.value = '';
            this.context.addNote(data);
            this.props.history.push('/');
        })
        .catch(error => {
            this.setState({ error })
        })
    }

    handleCancelClick = () => {
        this.props.history.push('/')
    };

    render(){
        const folderDrop = this.context.folders.map(folder => 
            <option value={folder.id}>{folder.name}</option>)
        return (
            <section className='addStuff'>
                <h2>Add a Note</h2>
                <form className='addNote-form' onSubmit={this.handleSubmit}>
                    <div>
                        <label htmlFor="notetitle">Note Title:</label>
                        <input type="text" name="notetitle" placeholder="Name Here!" required 
                            onChange={e => this.createNoteName(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor='folderId'>Folder:</label>
                        <select name='folderId'
                            onChange={e => this.createNoteFolderId(e.target.value)} >
                            {folderDrop}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="description">Description:</label>
                        <textarea name="description" required 
                            onChange={e => this.createNoteContent(e.target.value)} />
                    </div>
                    <div>
                        <button type="button" onClick={this.handleCancelClick}>
                            Cancel
                        </button>
                        {'  '}
                        <button type="submit">
                            Save Note
                        </button>
                    </div>
                </form>
            </section>
        );
    }
}

AddNote.propTypes = {
    history:PropTypes.shape({
        push: PropTypes.func,
    })
  };

export default AddNote;