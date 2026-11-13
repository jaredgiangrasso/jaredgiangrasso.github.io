import type { ImageMetadata } from "astro";
import aws from "../assets/projects/aws-screen.png";
import constellation from "../assets/projects/constellation-screen.png";
import lunchbox from "../assets/projects/lunchbox-screen.png";
import medly from "../assets/projects/medly-screen.png";
import mixmash from "../assets/projects/mixmash-screen.png";
import trending from "../assets/projects/trending-screen.png";
import trendingVideo from "../assets/projects/trending-screen.mov";

export type Project = {
  name: string;
  /** Short stack label, e.g. "TYPESCRIPT/REACT". */
  tools: string;
  description: string;
  /** Screenshot (also used as the video poster when there's a recording). */
  still: ImageMetadata;
  /** Optional looping screen recording. */
  video?: string;
  /** Where the card links. Falls back to `gitLink`; with neither, the card isn't linked. */
  demoLink?: string;
  /** Public source. Shown as a separate GitHub icon when there's also a demo. */
  gitLink?: string;
};

export const projects: Project[] = [
  {
    name: "Constellation",
    tools: "NEXTJS/NODE",
    description: "AI-Powered Advertising Automation Platform",
    still: constellation,
    demoLink: "https://www.helloconstellation.com/",
  },
  {
    name: "Amazon Web Services",
    tools: "TYPESCRIPT/REACT",
    description: "SageMaker Data Wrangler",
    still: aws,
    demoLink: "https://aws.amazon.com/",
  },
  {
    name: "Medly Pharmacy",
    tools: "TYPESCRIPT/REACT",
    description: "Digital Pharmacy Technology",
    still: medly,
    demoLink: "https://medly.com/en-us",
    gitLink: "https://github.com/medly/medly-components",
  },
  {
    name: "Mix Mash",
    tools: "REACT/DJANGO",
    description: "Song Mashup Creator",
    still: mixmash,
  },
  {
    name: "Lunchbox",
    tools: "REACT/ANTD/NIVO",
    description: "Ordering Platform Admin Dashboard",
    still: lunchbox,
    demoLink: "https://lunchbox.io/",
  },
  {
    name: "Trending Tees",
    tools: "HTML/CSS/REACT",
    description: "Automated E-commerce",
    still: trending,
    video: trendingVideo,
  },
];
