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
				<a href={this.props.demoLink ? this.props.demoLink : this.props.gitLink}>
					<img id='screen' src={this.props.screen}/>
				</a>
				<a href={this.props.demoLink ? this.props.demoLink : this.props.gitLink}>
					<div id="project-title"> 
						{this.props.children}
					</div>
				</a>
				<a id="github-icon" href={this.props.gitLink}>
					<FontAwesomeIcon icon={faGithub} size="3x"/>
				</a>
			</div>
		)
	}
}

export default Card;