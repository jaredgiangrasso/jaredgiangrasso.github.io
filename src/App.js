import React, { Component } from 'react';
import Info from './Info.js';
import CardViewer from './CardViewer.js';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Info />
        <CardViewer />
      </div>
    );
  }
}

export default App;
