import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';	
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import './Card.css';

class Card extends Component {
	constructor(props){
		super(props);
		
	}

	render() {
		return (
			<div className='card'>
				<img id='screen' src={this.props.screen}/>
				<div id="project-title"> 
					{this.props.children}
					<a href={this.props.gitLink}>
						<FontAwesomeIcon id="github-icon" icon={faGithub} size="3x"/>
					</a>
				</div>
			</div>
		)
	}
}

export default Card;