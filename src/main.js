import App from "./App.svelte";
import { mount } from "svelte";

const app = mount(App, {
  target: document.body,
  props: {
    projectId: "<your Figma project id>",
    figmaToken: "<your Figma API token>",
  },
});

export default app;
