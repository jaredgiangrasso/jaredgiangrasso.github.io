import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faFile } from '@fortawesome/free-solid-svg-icons';
import Headshot from './Images/Headshot.jpeg';
import resume from './Images/Jared_Giangrasso_Resume.pdf';
import './Info.css';

class Info extends Component {
	render() {
		return (
			<div id='personal-info-container'>
				<div id="personal-info">
					<div id='links'>
				        <h1 id="first">Jared</h1>
				        <h2 id="second">Giangrasso</h2>
				        <img id="headshot" src={Headshot}/>
			        </div>
			        <div id="statement">
			        	<p>
			        	Web developer based in Brooklyn, New York.
						</p>
			    	</div>
			    	<a href="https://github.com/jaredgiangrasso"><FontAwesomeIcon id="info-github-icon" icon={faGithub} size="3x"/></a>
			    	<a href={resume} download="Jared_Giangrasso_Resume"><FontAwesomeIcon id="file-icon" icon={faFile} size="3x"/></a>
			    </div>
			  </div>
	    )
	}
}

export default Info;