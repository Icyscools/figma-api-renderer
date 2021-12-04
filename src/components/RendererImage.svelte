<script>
  import { getContext } from "svelte";

  export let data;

  // console.group("IMAGE");
  // console.log(data);
  // console.groupEnd();

  const { projectId, figmaToken } = getContext("figma-api");

  async function getImage() {
    let bg = data.fills[0];
    if (bg.type === "IMAGE") {
      let nodeImageId = data.id;
      let image = await self.fetch(
        `https://api.figma.com/v1/images/${projectId}?ids=${nodeImageId}`,
        {
          headers: {
            "X-Figma-Token": figmaToken,
          },
        }
      );
      if (image.ok) {
        let imageData = await image.json();
        let imageUrl = imageData.images[nodeImageId];
        return imageUrl;
      } else {
        return new Error("wtf");
      }
    }
    return ``;
  }

  let promise = getImage();
</script>

{#await promise}
  <p>Loading...</p>
{:then data}
  <!-- svelte-ignore a11y-missing-attribute -->
  <img class="img" src={data} />
{:catch error}
  {error}
{/await}

<style>
  .img {
    width: 100%;
    height: auto;
    position: relative;
  }
</style>
