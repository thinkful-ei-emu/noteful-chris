import React from 'react';
import { Route, Link } from 'react-router-dom';
import Sidebar from './component/sidebar';
import FolderSidebar from './component/FolderSidebar';
import FolderMain from './component/Folder-Main';
import Main from './component/main';
import NoteSidebar from './component/NoteSidebar';
import NoteMain from './component/NoteMain';
import StateContext from './stateContext';

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
        console.log(this.state.notes);
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
        console.log(this.state.folders);
      })
      .catch(err => {
        this.setState({
          error: err.message
        });
        })
      }

  render(){
    const contextValue = {
      folders: this.state.folders,
      notes: this.state.notes,
    }
    return (
      <section className='App'>
        <header>
          <Link to='/'><h1>Noteful</h1></Link>
        </header>
        <StateContext.Provider value={contextValue}>
        <main>
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