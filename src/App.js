import React, { Component } from 'react';
import SearchBar from './containers/SearchBox/SearchBox';
import {  Route, Switch  } from 'react-router-dom';
import AlbumList from './components/AlbumList/AlbumList';

class App extends Component {
  render() {   
      return (
      <div>    
       <Switch>
       <Route path="/" exact component={SearchBar} />	
       <Route path="/albumList"  component={AlbumList} />	
       
       </Switch>
         
      </div>
    );
  }
}

export default App;
