import React from 'react';
import { Route, Link } from 'react-router-dom';
import Sidebar from './component/Sidebar';
import FolderSidebar from './component/FolderSidebar';
import FolderMain from './component/Folder-Main';
import Main from './component/Main';
import NoteSidebar from './component/NoteSidebar';
import NoteMain from './component/NoteMain';
import AddNote from './component/AddNote';
import AddFolder from './component/AddFolder';
import StateContext from './StateContext';
import AddError from './component/AddError';

export default class App extends React.Component {
  state={
    folders: [],
    notes: []
   }

  componentDidMount() {
    this.foldersApiCall();
    this.notesApiCall();
  }

  notesApiCall = () => {
    const url = `http://localhost:9090/notes`;
    
    fetch(url)
      .then(res => {
        if(!res.ok) {
          throw new Error('Your imput was not valid, please try again');
        }
        return res.json();
        })
      .then(data => {
        this.setState({notes: data});
      })
      .catch(err => {
        this.setState({
          error: err.message
        });
        })
      }

  foldersApiCall = () => {
    const url = `http://localhost:9090/folders`;
    
    fetch(url)
      .then(res => {
        if(!res.ok) {
          throw new Error('Your imput was not valid, please try again');
        }
        return res.json();
        })
      .then(data => {
        this.setState({folders: data});
      })
      .catch(err => {
        this.setState({
          error: err.message
        });
    })
  }

  addNote = note => {
    this.setState({
      notes: [...this.state.notes, note ]
    })
  }

  addFolder = folder => {
    this.setState({
      folders: [...this.state.folders, folder]
    })
  }

  deleteNote = (noteId) => {
    const url = `http://localhost:9090/notes/${noteId}`;
    
    fetch(url, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      },
    })
      .then(res => {
        if(!res.ok) {
          return res.json().then(error => {
            throw error;
          })
        }
        return res.json()
      })
      .then(() => {
        const newNotes = this.state.notes.filter(nts => nts.id !== noteId)
        this.setState({
          notes: newNotes
        })
      })
      .catch(error => {
        console.error(error)
      })
  }

  render(){
    const contextValue = {
      folders: this.state.folders,
      notes: this.state.notes,
      deleteNote: this.deleteNote,
      addNote: this.addNote,
      addFolder: this.addFolder,
    }
    return (
      <section className='App'>
        <header>
          <Link to='/'><h1>Noteful</h1></Link>
        </header>
        <StateContext.Provider value={contextValue}>
        <main>
          <AddError>
            <Route 
              exact path ='/AddNote'
              component={AddNote} 
            />

            <Route 
              exact path ='/AddFolder'
              component={AddFolder} 
            />
          </AddError>
          <Route 
            exact path='/' 
            component= {Sidebar}
          />  
          <Route 
            exact path='/' 
            component= {Main}
          />  
           
          <Route path='/Folder/:folderId' 
            component={FolderSidebar}
            // render={(props)=>
            //   <FolderSidebar match={props.match} folders={this.state.folders} />
            // }
          /> 

          <Route path='/Folder/:folderId'
            component={FolderMain}
        
          />  
          <Route path='/Note/:noteId' 
            component={NoteSidebar}
            />

          <Route path='/Note/:noteId' 
            component={NoteMain}
            />  
          
        </main>
        </StateContext.Provider>
      </section>
        
    );
        }
  }