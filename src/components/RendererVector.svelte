<script>
  import { getColor } from "../utils/colors.svelte";
  export let data;

  let boundingBox = data.absoluteBoundingBox;

  // console.group("VECTOR");
  // console.log(data);
  // if (data.strokeGeometry.length > 1 || data.fillGeometry.length > 1) {
  //   console.warn("HEY! SOMETHING WENT WRONG");
  // }
  // console.groupEnd();
</script>

<svg
  class="child"
  viewBox={`0 0 ${boundingBox.width} ${boundingBox.height}`}
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  {#if data.strokeGeometry.length >= 1}
    {#if data.strokes[0].type === "SOLID"}
      <path
        d={data.strokeGeometry[0].path}
        opacity={data.opacity}
        stroke={getColor(data.strokes[0].color)}
        stroke-width={data.strokeWeight}
      />
    {:else if data.strokes[0].type === "GRADIENT_LINEAR"}
      <path
        d={data.strokeGeometry[0].path}
        opacity={data.opacity}
        stroke={`url(#${data.id})`}
        stroke-width={data.strokeWeight}
      />
      <defs>
        <linearGradient id={data.id} gradientUnits="userSpaceOnUse">
          {#each data.strokes[0].gradientStops as stop}
            <stop offset={stop.position} stop-color={getColor(stop.color)} />
          {/each}
        </linearGradient>
      </defs>
    {/if}
  {:else if data.fillGeometry.length >= 1}
    {#if data.fills[0].type === "SOLID"}
      <path
        d={data.fillGeometry[0].path}
        opacity={data.opacity}
        fill={getColor(data.fills[0].color)}
      />
    {:else if data.fills[0].type === "GRADIENT_LINEAR"}
      <path
        d={data.fillGeometry[0].path}
        opacity={data.opacity}
        fill={`url(#${data.id})`}
      />
      <defs>
        <linearGradient id={data.id} gradientUnits="userSpaceOnUse">
          {#each data.fills[0].gradientStops as stop}
            <stop offset={stop.position} stop-color={getColor(stop.color)} />
          {/each}
        </linearGradient>
      </defs>
    {/if}
  {/if}
</svg>

<style>
  .child {
    position: absolute;
  }
</style>
