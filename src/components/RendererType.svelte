<script>
  import RendererType from "./RendererType.svelte";
  import { getContext } from "svelte";
  import RendererBox from "./RendererBox.svelte";
  import RendererText from "./RendererText.svelte";
  import RendererVector from "./RendererVector.svelte";

  /** @type {{data: any}} */
  let { data } = $props();

  const { getMainFrameBoundingBox } = getContext("main-frame");
  const { x, y, width, height } = data.absoluteBoundingBox;
  const frameBox = getMainFrameBoundingBox();
</script>

{#if data.type === "GROUP" || data.type === "FRAME"}
  {#each data.children as child}
    <RendererType data={{ opacity: data.opacity, ...child }} />
  {/each}
{:else if data.type === "TEXT"}
  <RendererBox {data}>
    <RendererText {data} />
  </RendererBox>
{:else if data.type === "VECTOR"}
  <RendererBox {data}>
    <RendererVector {data} />
  </RendererBox>
{:else}
  <RendererBox {data} />
{/if}
