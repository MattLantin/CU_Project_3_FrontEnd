import React from 'react';

import { DataContent, Header } from './containers';
import { Navbar } from './components';

import './App.css';

const App = () => (
  <div className="App container">
    <div className="gradient__bg">
      <Navbar />
      <Header />
    </div>
    <div>
      <DataContent />
    </div>
  </div>
);

export default App;
