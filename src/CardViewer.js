import React, { Component } from 'react';
import penguinScreen from './Images/penguin-screen-small.png';
import portfolioScreen from './Images/practice-screen-small.png';
import weatherScreen from './Images/weather-screen-small.png';
import './CardViewer.css';
import Card from './Card';

class CardViewer extends Component {
	render() {
		return (
			<div id="cardViewer">
				<Card screen={weatherScreen} demoLink='https://hidden-bayou-14746.herokuapp.com/' gitLink='https://github.com/jaredgiangrasso/weather-app'>
					{<h2>REACT/DARK SKIES WEATHER API</h2>}
					{<h1>Weather Application</h1>}
				</Card>
				<Card screen={penguinScreen} gitLink='https://github.com/jaredgiangrasso/penguin'>
					{<h2>REACT/PENGUIN BOOKS API</h2>}
					{<h1>Penguin Book Search</h1>}
				</Card>
				<Card screen={portfolioScreen} gitLink='https://github.com/jaredgiangrasso/242-practice-site'>
					{<h2>HTML/CSS/REACT</h2>}
					{<h1>Sample Portfolio Site</h1>}
				</Card>	
			</div>
		)
	}
}

export default CardViewer;