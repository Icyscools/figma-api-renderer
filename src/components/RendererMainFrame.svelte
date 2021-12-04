<script>
  import { setContext } from "svelte";
  import RendererType from "./RendererType.svelte";

  export let data;

  // canvas id
  export let CANVAS_ID = 0;
  // frame id
  export let FRAME_ID = 0;

  setContext("main-frame", {
    getMainFrameBoundingBox: () => frameBox,
  });

  console.group("MAIN FRAME");
  console.log(data);

  // frame group
  let frame = data.document.children[CANVAS_ID].children[FRAME_ID];
  let frameBox = frame.absoluteBoundingBox;

  console.group("FRAME NAME");
  console.log(frame.name);
  console.groupEnd();

  console.group("BOUNDING FRAME");
  console.log(frameBox);
  console.groupEnd();

  console.groupEnd();

  function getFrameStyle() {
    let frameStyle = getFrameBackground(frame);
    return `width: ${frameBox.width}px;height: ${frameBox.height}px;${frameStyle}`;
  }

  function getFrameBackground(frame) {
    let color = frame.fills[0].color;
    return `background: rgb(${color.r * 255}, ${color.g * 255}, ${
      color.b * 255
    });`;
  }

  function renderChild(frame) {
    if (!frame && frame.type !== "FRAME") return new Error("no frame");
    let childrens = frame.children;
    return childrens;
  }
</script>

<div id="renderer" style={getFrameStyle()}>
  {#each renderChild(frame) as child}
    <RendererType data={child} />
  {/each}
</div>

<style>
  #renderer {
    position: relative;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    overflow: hidden;
  }
</style>
