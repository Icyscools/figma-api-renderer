<script>
  import { getContext } from "svelte";
  import { getColor, getGradientColor } from "../utils/colors.svelte";
  import RendererImage from "./RendererImage.svelte";

  export let data;

  // console.group("CHILD FRAME");
  // console.log(data);
  // console.groupEnd();

  const { getMainFrameBoundingBox } = getContext("main-frame");
  const { x, y, width, height } = data.absoluteBoundingBox;
  const frameBox = getMainFrameBoundingBox();

  function getBoundingBox() {
    let elSize = calcBoxSize();
    let elPosition = calcPosition();
    return `${elSize}${elPosition}`;
  }

  function calcBoxSize() {
    let w = (width / frameBox.width) * 100;
    let h = (height / frameBox.height) * 100;
    return `width: ${w}%;height: ${h}%;`;
  }

  function calcPosition() {
    return `top: ${y - frameBox.y}px;left: ${x - frameBox.x}px;`;
  }

  function getBoxStyle() {
    return `${getBoundingBox()};${getBoxBgColor()};${getBoxOpacity()};`;
  }

  function getBoxOpacity() {
    if (data?.opacity) {
      return `opacity: ${data.opacity};`;
    }
    return ``;
  }

  function getBoxBgColor() {
    if (data.type !== "TEXT" && data.type !== "VECTOR") {
      let bg = data.fills[0];
      if (bg?.type === "SOLID") {
        return `background: ${getColor(bg.color)};`;
      } else if (bg?.type === "GRADIENT_LINEAR") {
        return `background: ${getGradientColor(bg.gradientStops)};`;
      }
    }
    return ``;
  }
</script>

<div class="child" style={getBoxStyle()}>
  {#if data.type === "RECTANGLE" && data?.fills[0]?.type === "IMAGE"}
    <RendererImage {data} />
  {:else}
    <slot />
  {/if}
</div>

<style>
  .child {
    position: absolute;
  }
</style>
