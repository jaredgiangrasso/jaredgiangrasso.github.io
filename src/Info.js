import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import Headshot from './Images/TEMP_Headshot.jpg';
import './Info.css';

class Info extends Component {
	render() {
		return (
			<div id="personal-info">
				<div id='links'>
			        <h1 id="first">Jared</h1>
			        <h2 id="second">Giangrasso</h2>
			        <img id="headshot" src={Headshot}/>
		        </div>
		        <div id="statement">
		        	<p>
		        	Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum bibendum, purus nec facilisis sollicitudin, nunc purus placerat justo, ac euismod est lectus non lectus. Donec elementum, sapien a suscipit feugiat, sapien nisi ultrices lectus, vitae lobortis turpis sapien non arcu. 
					</p>
		    	</div>
		    	<FontAwesomeIcon id="info-github-icon" icon={faGithub} size="3x"/>
		    	<FontAwesomeIcon id="envelope-icon" icon={faEnvelope} size="3x"/>
		    </div>
	    )
	}
}

export default Info;