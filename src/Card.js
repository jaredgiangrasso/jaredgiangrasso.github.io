import React, { Component } from 'react';
import sampleScreen from './Images/sample-screen.png';
import './Card.css';

class Card extends Component {
	render() {
		return (
			<div className='card'>
				<img id='screen' src={sampleScreen}/>
				<div id="project-title"> 
					{this.props.children}
				</div>
			</div>
		)
	}
}

export default Card;