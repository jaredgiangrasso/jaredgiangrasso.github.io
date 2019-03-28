import React, { Component } from 'react';
import penguinScreen from './Images/penguin_trimmed.mp4';
import penguinStill from './Images/penguin-screen-small.png';
import podcastScreen from './Images/podcast_trimmed.mp4';
import podcastStill from './Images/podcast-screen-small.png';
import portfolioScreen from './Images/portfolio_trimmed.mp4';
import portfolioStill from './Images/practice-screen-small.png';
import weatherScreen from './Images/weather_trimmed.mp4';
import weatherStill from './Images/weather-screen-small.png';
import './CardViewer.css';
import Card from './Card';

class CardViewer extends Component {
	render() {
		return (
			<div id="cardViewer">
				<Card still={weatherStill} screen={weatherScreen} demoLink='https://hidden-bayou-14746.herokuapp.com/' gitLink='https://github.com/jaredgiangrasso/weather-app'>
					{<h2>REACT/DARK SKIES WEATHER API</h2>}
					{<h1>Weather Application</h1>}
				</Card>
				<Card still={podcastStill} screen={podcastScreen} gitLink='https://github.com/jaredgiangrasso/Podcast-REST-API'>
					{<h2>NODE.JS/MONGODB/EXPRESS/REACT</h2>}
					{<h1>Podcast RESTful API/Catalogue</h1>}
				</Card>
				<Card still={penguinStill} screen={penguinScreen} demoLink='https://nameless-crag-80623.herokuapp.com/' gitLink='https://github.com/jaredgiangrasso/penguin'>
					{<h2>REACT/PENGUIN BOOKS API</h2>}
					{<h1>Penguin Book Search</h1>}
				</Card>
				<Card still={portfolioStill} screen={portfolioScreen} gitLink='https://github.com/jaredgiangrasso/242-practice-site'>
					{<h2>HTML/CSS/REACT</h2>}
					{<h1>Sample Portfolio Site</h1>}
				</Card>
			</div>
		)
	}
}

export default CardViewer;