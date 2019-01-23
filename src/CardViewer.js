import React, { Component } from 'react';
import './CardViewer.css';
import Card from './Card';

class CardViewer extends Component {
	render() {
		return (
			<div id="cardViewer">
				<Card>
					{<h2>NODE.JS/REACT</h2>}
					{<h1>Penguin Book Search</h1>}
				</Card>
				<Card/>
				<Card/>
				<Card/>
				<Card/>
				<Card/>
				<Card/>
			</div>
		)
	}
}

export default CardViewer;