import React from 'react';
import { Router, Route } from 'react-router-dom';
import history from './history';
import './App.css';
import Header from './components/Header';
import LoginDialog from './components/LoginDialog';

function App() {
  return (
    <div className="App">
      <Router history={history}>
        <Header />
        <Route path="/login" component = {LoginDialog} />
      </Router>
    </div>
  );
}

export default App;
