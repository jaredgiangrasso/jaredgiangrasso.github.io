import React, { Component } from 'react';
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
				</div>
			</div>
		)
	}
}

export default Card;