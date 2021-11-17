<script>
  import Renderer from "./components/Renderer.svelte";

  export let projectId;
  export let figmaToken;

  async function fetchFigmaAPI() {
    const response = await self.fetch(
      `https://api.figma.com/v1/files/${projectId}`,
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
    <Renderer {data} {projectId} {figmaToken} />
  {:catch error}
    {error}
  {/await}
</main>

<style>
  main {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
    margin: auto;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
