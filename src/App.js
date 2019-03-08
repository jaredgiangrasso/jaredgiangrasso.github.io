import React, { Component } from 'react';
import Helmet from 'react-helmet';
import Info from './Info.js';
import CardViewer from './CardViewer.js';
import favicon16 from './Images/favicon-16x16.png';
import favicon32 from './Images/favicon-32x32.png';
import faviconApple from './Images/apple-touch-icon.png';
import faviconManifest from './Images/site.webmanifest';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
      	<Helmet>
      		<meta charSet='utf-8'/>
      		<title>Jared Giangrasso</title>
      		<link rel="apple-touch-icon" sizes="180x180" href={faviconApple}/>
			<link rel="icon" type="image/png" sizes="32x32" href={favicon32}/>
			<link rel="icon" type="image/png" sizes="16x16" href={favicon16}/>
			<link rel="manifest" href={faviconManifest}/>
      	</Helmet>
        <Info />
        <CardViewer />
      </div>
    );
  }
}

export default App;
