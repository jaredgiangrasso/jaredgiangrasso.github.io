// @ts-check
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://jaredgiangrasso.com",
  // Scope component styles with :where(), which adds zero specificity, so selectors
  // behave exactly as written (they were ported 1:1 from the original global CSS).
  scopedStyleStrategy: "where",
});
