import React, { Component } from 'react';
import lunchboxStill from './Images/lunchboxScreen.png';
import trendingScreen from './Images/trending-screen.mp4';
import trendingStill from './Images/trending-screen.png';
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

const cardContents = [
	{
		still: lunchboxStill,
		demoLink: 'https://lunchbox.io/',
		tools: 'REACT/ANTD/NIVO',
		description: 'Ordering Platform Admin Dashboard',
	},
	{
		still: trendingStill,
		screen: trendingScreen,
		demoLink: 'https://trendingtees.io/',
		tools: 'HTML/CSS/REACT',
		description: 'Automated E-commerce',
	},
	{
		still: weatherStill,
		screen: weatherScreen,
		demoLink: 'https://hidden-bayou-14746.herokuapp.com/',
		gitLink: 'https://github.com/jaredgiangrasso/weather-app',
		tools: 'REACT/DARK SKIES WEATHER API',
		description: 'Weather Application',
	},
	{
		still: podcastStill,
		screen: podcastScreen,
		gitLink: 'https://github.com/jaredgiangrasso/Podcast-REST-API',
		tools: 'NODE.JS/MONGODB/EXPRESS/REACT',
		description: 'Podcast RESTful API/Catalogue',
	},
	{
		still: penguinStill,
		screen: penguinScreen,
		demoLink: 'https://nameless-crag-80623.herokuapp.com/',
		gitLink: 'https://github.com/jaredgiangrasso/penguin',
		tools: 'REACT/PENGUIN BOOKS API',
		description: 'Penguin Book Search',
	},
	{
		still: portfolioStill,
		screen: portfolioScreen,
		gitLink: 'https://github.com/jaredgiangrasso/242-practice-site',
		tools: 'HTML/CSS/REACT',
		description: 'Sample Portfolio Site',
	},
]

class CardViewer extends Component {
	render() {
		return (
			<div id="cardViewer">
				{cardContents.map((cardContent, i) => (
					<Card
						{...cardContent}
						idx={i}
					/>
				))}
			</div>
		)
	}
}

export default CardViewer;