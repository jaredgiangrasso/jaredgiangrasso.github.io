import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faFile } from '@fortawesome/free-solid-svg-icons';
import Headshot from './Images/Headshot.png';
import resume from './Images/Jared_Giangrasso_Resume.pdf';
import './Info.css';

class Info extends Component {
	render() {
		return (
			<div id='personal-info-container'>
				<div id='background-texture'></div>
				<div id="personal-info">
					<div id='name-headshot'>
				        <h1 id="first">Jared</h1>
				        <h2 id="second">Giangrasso</h2>
				        <img id="headshot" src={Headshot}/>
			        </div>

			        <div id="statement">
			        	<p id='statement1'>
			        	I'm a web developer based in Brooklyn, New York. I'm passionate about the development process from beginning to end, and love staying up to date with current technologies. 
			        	</p>
			        	<p id='statement2'>
			        	Take a look at some of my projects to see what I've worked on, and feel free to follow me over to Github if you're interested in how anything works.
						</p>
			    	</div>

			    	<ul id='links'>
			    		<li>
					    	<a id='github-label' href="https://github.com/jaredgiangrasso"><FontAwesomeIcon id="info-github-icon" icon={faGithub} size="3x"/>
					    		<span>Github</span>
					    	</a>
					    </li>
					    <li>
					    	<a id='resume-label' href={resume} download="Jared_Giangrasso_Resume"><FontAwesomeIcon id="file-icon" icon={faFile} size="3x"/>
					    		<span>Resume</span>
					    	</a>
					    </li>
				    </ul>

			    </div>
			  </div>
	    )
	}
}

export default Info;