import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import Headshot from './Images/TEMP_Headshot.jpg';
import './Info.css';

class Info extends Component {
	render() {
		return (
			<div id="personalInfo">
				<h1>Jared Giangrasso</h1>
				<div>
					<div id='links'>
				        <img id='headshot' src={Headshot}/>
				        <div id='icons'>
				          <FontAwesomeIcon icon={faGithub} size="3x"/>
				        </div>
			        </div>
			        <div id="statement">
			        	<p>
			        	Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum bibendum, purus nec facilisis sollicitudin, nunc purus placerat justo, ac euismod est lectus non lectus. Donec elementum, sapien a suscipit feugiat, sapien nisi ultrices lectus, vitae lobortis turpis sapien non arcu. Suspendisse a vehicula enim, eu tristique odio. Morbi cursus tincidunt est, nec aliquam dui rhoncus et. Maecenas ac arcu metus. Morbi vulputate, sapien vel tempus scelerisque, eros urna mattis metus, at lobortis est nisl et ligula. Curabitur iaculis, magna in tincidunt finibus, ex lectus faucibus felis, sagittis posuere dui justo ac enim. Curabitur euismod cursus nunc quis consectetur. Nullam pharetra suscipit quam, non feugiat nisi pretium fermentum.
						</p>
			        </div>
			    </div>
		    </div>
	    )
	}
}

export default Info;