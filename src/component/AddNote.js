import React from 'react';
import StateContext from '../stateContext';
import PropTypes from 'prop-types';

class AddNote extends React.Component {
    static contextType = StateContext;

    state = {
        error: null,
    }

    guidGenerator = () => {
        var S4 = function() {
           return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
        };
        return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
    }

    handleSubmit = e => {
        e.preventDefault()
        const { notetitle, description, folderId } = e.target;
        const note = {
            id: this.guidGenerator(),
            name: notetitle.value,
            modified: `${Date.now()}`,
            folderId: folderId.value,
            content: description.value
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
            notetitle.value = '';
            description.value = '';
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
            <section>
                <h2>Add a Note</h2>
                <form className='addNote-form' onSubmit={this.handleSubmit}>
                    <div>
                        <label htmlFor="notetitle">Note Title:</label>
                        <input type="text" name="notetitle" placeholder="Name Here!" required />
                    </div>
                    <div>
                        <label htmlFor='folderId'>Folder:</label>
                        <select name='folderId'>
                            {folderDrop}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="description">Description:</label>
                        <textarea name="description" required />
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
    history:PropTypes.object
  };

export default AddNote;