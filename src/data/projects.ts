import type { ImageMetadata } from "astro";
import aws from "../assets/projects/aws-screen.png";
import constellation from "../assets/projects/constellation-screen.png";
import lunchbox from "../assets/projects/lunchbox-screen.png";
import medly from "../assets/projects/medly-screen.png";
import wedding from "../assets/projects/wedding-screen.png";

export type Project = {
  name: string;
  /** Short stack label, e.g. "TYPESCRIPT/REACT". */
  tools: string;
  description: string;
  /** Screenshot shown on the card. */
  still: ImageMetadata;
  /** Where the card links. Falls back to `gitLink`; with neither, the card isn't linked. */
  demoLink?: string;
  /** Public source. Shown as a separate GitHub icon when there's also a demo. */
  gitLink?: string;
  /** A personal (not professional) project: the card shows a "Personal project" label. */
  personal?: boolean;
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
    name: "Our Wedding Website",
    tools: "ASTRO/PREACT",
    description: "Designed & Built for My Wedding (Details Changed)",
    still: wedding,
    // An anonymized copy of the real site, published from its own repo (jaredgiangrasso/wedding-demo).
    demoLink: "https://jaredgiangrasso.com/wedding-demo/",
    personal: true,
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
    name: "Lunchbox",
    tools: "REACT/ANTD/NIVO",
    description: "Ordering Platform Admin Dashboard",
    still: lunchbox,
    demoLink: "https://lunchbox.io/",
  },
];
