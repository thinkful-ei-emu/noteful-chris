import React from 'react';
import StateContext from '../stateContext';
import PropTypes from 'prop-types';

class AddFolder extends React.Component {
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
        const { foldertitle } = e.target;
        const note = {
            id: this.guidGenerator(),
            name: foldertitle.value,
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
            foldertitle.value = '';
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
            <section>
                <h2>Add a Folder</h2>
                <form className='addNote-form' onSubmit={this.handleSubmit}>
                    <div>
                        <label htmlFor="foldertitle">Note Title:</label>
                        <input type="text" name="foldertitle" placeholder="Name Here!" required />
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
    history:PropTypes.object
  };

export default AddFolder;