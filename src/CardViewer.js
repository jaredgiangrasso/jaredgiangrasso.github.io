import React, { Component } from 'react';
import medlyStill from './Images/medly-screen.png';
import mixmashStill from './Images/mixmash-screen.png';
import lunchboxStill from './Images/lunchbox-screen.png';
import trendingScreen from './Images/trending-screen.mov';
import trendingStill from './Images/trending-screen.png';
import penguinScreen from './Images/penguin_trimmed.mp4';
import penguinStill from './Images/penguin-screen-small.png';
import portfolioScreen from './Images/portfolio_trimmed.mp4';
import portfolioStill from './Images/practice-screen-small.png';
import weatherScreen from './Images/weather_trimmed.mp4';
import weatherStill from './Images/weather-screen-small.png';
import './CardViewer.css';
import Card from './Card';

const cardContents = [
	{
		still: medlyStill,
		demoLink: 'https://medly.com/en-us',
		gitLink: 'https://github.com/medly/medly-components',
		tools: 'TYPESCRIPT/REACT',
		name: 'Medly Pharmacy',
		description: 'Digital Pharmacy Technology',
	},
	{
		still: mixmashStill,
		tools: 'REACT/DJANGO',
		name: 'Mix Mash',
		description: 'Song Mashup Creator',
	},
	{
		still: lunchboxStill,
		demoLink: 'https://lunchbox.io/',
		tools: 'REACT/ANTD/NIVO',
		name: 'Lunchbox',
		description: 'Ordering Platform Admin Dashboard',
	},
	{
		still: trendingStill,
		screen: trendingScreen,
		tools: 'HTML/CSS/REACT',
		name: 'Trending Tees',
		description: 'Automated E-commerce',
	},
	{
		still: weatherStill,
		screen: weatherScreen,
		demoLink: 'https://hidden-bayou-14746.herokuapp.com/',
		gitLink: 'https://github.com/jaredgiangrasso/weather-app',
		tools: 'REACT/DARK SKIES WEATHER API',
		name: 'Weather App',
		description: 'Weather Application',
	},
	{
		still: penguinStill,
		screen: penguinScreen,
		demoLink: 'https://nameless-crag-80623.herokuapp.com/',
		gitLink: 'https://github.com/jaredgiangrasso/penguin',
		tools: 'REACT/PENGUIN BOOKS API',
		name: 'Penguin Book Browser',
		description: 'Penguin Book Search',
	},
	{
		still: portfolioStill,
		screen: portfolioScreen,
		gitLink: 'https://github.com/jaredgiangrasso/242-practice-site',
		tools: 'HTML/CSS/REACT',
		name: 'Sample Portfolio Site',
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