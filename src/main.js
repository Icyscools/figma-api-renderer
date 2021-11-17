import App from "./App.svelte";

const app = new App({
  target: document.body,
  props: {
    projectId: "<your Figma project id>",
    figmaToken: "<your Figma API token>",
  },
});

export default app;
