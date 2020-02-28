import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.css';

import Home from './Home';
import UserList from './UserList';
import UserEdit from './UserEdit';
import BookList from './BookList';
import BookEdit from './BookEdit';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path='/' exact={true} component={Home}/>
          <Route path='/user/:ins/book/:hor' exact={true} component={BookEdit}/>
          <Route path='/book/:hor' exact={true} component={BookEdit}/>
          <Route path='/user/:ins/book' exact={true} component={BookList}/>
          <Route path='/user/:ins' exact={true} component={UserEdit}/>
          <Route path='/user' exact={true} component={UserList}/>
          <Route path='/book' exact={true} component={BookList}/>
          
        </Switch>
      </Router>
    )
  }
}

export default App;
