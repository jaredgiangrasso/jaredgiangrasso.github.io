// The site's content as the tests expect it. Mirrors what is live today;
// update this file (deliberately) whenever the content changes.

export const title = "Jared Giangrasso – Full-Stack Software Engineer";

export const bio = [
  "I'm a full-stack software engineer based in New York. I build scalable web platforms and developer tooling, with experience leading product development from architecture to production.",
  "Take a look at some of my projects to see what I've worked on, and feel free to follow me over to Github if you're interested in how anything works.",
] as const;

export const resume = {
  label: "Download Resume",
  downloadName: "Jared_Giangrasso_Resume.pdf",
} as const;

export type Project = {
  name: string;
  tools: string;
  description: string;
  /** Substring of the screenshot asset filename (bundlers may add hashes). */
  slug: string;
  demoLink?: string;
  gitLink?: string;
};

export const projects: Project[] = [
  {
    name: "Constellation",
    tools: "NEXTJS/NODE",
    description: "AI-Powered Advertising Automation Platform",
    slug: "constellation-screen",
    demoLink: "https://www.helloconstellation.com/",
  },
  {
    name: "Amazon Web Services",
    tools: "TYPESCRIPT/REACT",
    description: "SageMaker Data Wrangler",
    slug: "aws-screen",
    demoLink: "https://aws.amazon.com/",
  },
  {
    name: "Medly Pharmacy",
    tools: "TYPESCRIPT/REACT",
    description: "Digital Pharmacy Technology",
    slug: "medly-screen",
    demoLink: "https://medly.com/en-us",
    gitLink: "https://github.com/medly/medly-components",
  },
  {
    name: "Lunchbox",
    tools: "REACT/ANTD/NIVO",
    description: "Ordering Platform Admin Dashboard",
    slug: "lunchbox-screen",
    demoLink: "https://lunchbox.io/",
  },
];
