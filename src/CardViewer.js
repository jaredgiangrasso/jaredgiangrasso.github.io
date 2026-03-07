import React, { Component } from "react";
import awsStill from "./Images/aws-screen.png";
import medlyStill from "./Images/medly-screen.png";
import mixmashStill from "./Images/mixmash-screen.png";
import lunchboxStill from "./Images/lunchbox-screen.png";
import trendingScreen from "./Images/trending-screen.mov";
import trendingStill from "./Images/trending-screen.png";
import constellationStill from "./Images/constellation-screen.png";
import "./CardViewer.css";
import Card from "./Card";

const cardContents = [
  {
    still: constellationStill,
    demoLink: "https://www.helloconstellation.com/",
    tools: "NEXTJS/NODE",
    name: "Constellation",
    description: "AI-Powered Advertising Automation Platform",
  },
  {
    still: awsStill,
    demoLink: "https://aws.amazon.com/",
    tools: "TYPESCRIPT/REACT",
    name: "Amazon Web Services",
    description: "SageMaker Data Wrangler",
  },
  {
    still: medlyStill,
    demoLink: "https://medly.com/en-us",
    gitLink: "https://github.com/medly/medly-components",
    tools: "TYPESCRIPT/REACT",
    name: "Medly Pharmacy",
    description: "Digital Pharmacy Technology",
  },
  {
    still: mixmashStill,
    tools: "REACT/DJANGO",
    name: "Mix Mash",
    description: "Song Mashup Creator",
  },
  {
    still: lunchboxStill,
    demoLink: "https://lunchbox.io/",
    tools: "REACT/ANTD/NIVO",
    name: "Lunchbox",
    description: "Ordering Platform Admin Dashboard",
  },
  {
    still: trendingStill,
    screen: trendingScreen,
    tools: "HTML/CSS/REACT",
    name: "Trending Tees",
    description: "Automated E-commerce",
  },
];

class CardViewer extends Component {
  render() {
    return (
      <div id="cardViewer">
        {cardContents.map((cardContent, i) => (
          <Card {...cardContent} idx={i} />
        ))}
      </div>
    );
  }
}

export default CardViewer;
