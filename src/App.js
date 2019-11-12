import React from 'react';
import NekaKomponenta from './components/NekaKomponenta';
import NavbarPage from './components/NavbarPage';
import ModalLogin from './components/ModalLogin';
import ModalRegister from './components/ModalRegister.js';

import './App.css';
function App() {
  return (
    <div className="App">
      <NekaKomponenta/>
      <NavbarPage/>
      <ModalLogin/>
      <ModalRegister/>
    </div>
  );
}



export default App;
