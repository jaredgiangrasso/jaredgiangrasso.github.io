import React, { Component } from 'react';
import penguinScreen from './Images/penguin-screen.png'
import practiceScreen from './Images/practice-screen.png'
import './CardViewer.css';
import Card from './Card';

class CardViewer extends Component {
	render() {
		return (
			<div id="cardViewer">
				<Card screen={penguinScreen}>
					{<h2>NODE.JS/REACT/PENGUIN BOOKS API</h2>}
					{<h1>Penguin Book Search</h1>}
				</Card>
				<Card screen={practiceScreen}>
					{<h2>HTML/CSS/REACT</h2>}
					{<h1>Sample Portfolio Site</h1>}
				</Card>	
				<Card/>
			</div>
		)
	}
}

export default CardViewer;