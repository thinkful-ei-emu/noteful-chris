import React from 'react';
import StateContext from '../StateContext';
import PropTypes from 'prop-types';

import './Add.css';

class AddFolder extends React.Component {
    static contextType = StateContext;

    state = {
        name: {
            value: '',
            touched: false,
        },
        error: null,
    }

    guidGenerator = () => {
        var S4 = function() {
           return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
        };
        return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
    }

    newFolderName(name) {
        this.setState({name: { value: name, touched: true }})
    }

    handleSubmit = e => {
        e.preventDefault()
        const { name } = this.state;
        const note = {
            id: this.guidGenerator(),
            name: name.value,
        }
        this.setState({error:null})
        console.log(note);
        
        const url = `http://localhost:9090/folders/`;
    
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
            this.context.addFolder(data);
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
        return (
            <section className='addStuff'>
                <h2>Add a Folder</h2>
                <form className='addNote-form' onSubmit={this.handleSubmit}>
                    <div>
                        <label htmlFor="foldertitle">Note Title:</label>
                        <input type="text" name="foldertitle" placeholder="Name Here!" required
                        onChange={e => this.newFolderName(e.target.value) } />
                    </div>
                    <div>
                        <button type="button" onClick={this.handleCancelClick}>
                            Cancel
                        </button>
                        {'  '}
                        <button type="submit">
                            Save Folder
                        </button>
                    </div>
                </form>
            </section>
        );
    }
}

AddFolder.propTypes = {
    history:PropTypes.shape({
        push: PropTypes.func,
    })
  };

export default AddFolder;