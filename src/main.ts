import { mount } from "svelte";
import App from "./App.svelte";

const app = mount(App, {
  target: document.getElementById("app")!,
  props: {
    projectId: "<your Figma project id>",
    figmaToken: "<your Figma API token>",
  },
});

export default app;
