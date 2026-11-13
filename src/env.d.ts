/// <reference types="astro/client" />

// Video files imported from src/assets resolve to their built URL.
declare module "*.mov" {
  const src: string;
  export default src;
}
