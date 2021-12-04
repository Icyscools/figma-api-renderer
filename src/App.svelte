<script>
  import { setContext } from "svelte";
  import RendererMainFrame from "./components/RendererMainFrame.svelte";
  export let projectId;
  export let figmaToken;

  setContext("figma-api", {
    projectId,
    figmaToken,
  });

  async function fetchFigmaAPI() {
    const response = await self.fetch(
      `https://api.figma.com/v1/files/${projectId}?geometry=paths`,
      {
        headers: {
          "X-Figma-Token": figmaToken,
        },
      }
    );

    if (response.ok) {
      let x = response.json();
      return x;
    } else {
      return new Error("wtf");
    }
  }

  let promise = fetchFigmaAPI();
</script>

<main>
  {#await promise}
    <p>Loading...</p>
  {:then data}
    <RendererMainFrame {data} CANVAS_ID={0} FRAME_ID={0} />
    <!-- Render all frame -->
    <!-- {#each data.document.children as canvas, canvasId}
      {#each canvas.children as frame, frameId}
        {#if frame.type === "FRAME"}
          <div style="padding-top: 50px;">
            <RendererMainFrame {data} CANVAS_ID={canvasId} FRAME_ID={frameId} />
          </div>
        {/if}
      {/each}
    {/each} -->
  {:catch error}
    {error}
  {/await}
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    min-height: 100vh;
    margin: auto;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
