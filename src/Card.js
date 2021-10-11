import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';	
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import './Card.css';

class Card extends Component {
	render() {
		const { still, screen, demoLink, gitLink, tools, description, idx, name } = this.props;

		return (
			<div className='card'>
				<div id="card-header">
					<span id="project-title">{name}</span>
					<span id="card-index">{`#00${idx + 1} `}</span>
				</div>
				<a href={demoLink ? demoLink : gitLink} target="_blank" rel='noreferrer noopener'>
					<video id="screen" poster={still} loop autoPlay>
					    <source src={screen} type="video/mp4" />
					</video>
				</a>
				<a href={demoLink ? demoLink : gitLink} target="_blank" rel='noreferrer noopener'>
					<div id="project-info"> 
						<h2>{tools}</h2>
						<h1>{description}</h1>
					</div>
				</a>
				{gitLink && (
				<a id="github-icon" href={gitLink} target="_blank" rel='noreferrer noopener'>
					<FontAwesomeIcon icon={faGithub} size="3x"/>
				</a>
				)}
			</div>
		)
	}
}

export default Card;