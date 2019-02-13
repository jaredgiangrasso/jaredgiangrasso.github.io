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
				<a href={this.props.gitLink}>
					<img id='screen' src={this.props.screen}/>
				</a>
				<a href={this.props.gitLink}>
					<div id="project-title"> 
						{this.props.children}
							<FontAwesomeIcon id="github-icon" icon={faGithub} size="3x"/>
					</div>
				</a>
			</div>
		)
	}
}

export default Card;