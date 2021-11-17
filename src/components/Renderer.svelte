<script>
  export let data;
  export let projectId;
  export let figmaToken;

  // frame
  let frame = data.document.children[0].children[0];
  let frameBox = frame.absoluteBoundingBox;

  function getBoundingBox(el) {
    return el.absoluteBoundingBox;
  }

  function getFrameStyle() {
    let frameStyle = getFrameBackground(frame);
    return `
      width: ${frameBox.width}px;
      height: ${frameBox.height}px;
      ${frameStyle}
    `;
  }

  function getFrameBackground(frame) {
    let color = frame.fills[0].color;
    return `
      background: rgb(${color.r * 255}, ${color.g * 255}, ${color.b * 255});
    `;
  }

  function renderChild(frame) {
    if (!frame && frame.type !== "FRAME") return new Error("no frame");
    let childrens = frame.children;
    // console.log(childrens);
    return childrens;
  }

  function calcBoundingBox(el) {
    let elSize = calcBoxSize(el);
    let elPosition = calcPosition(el);
    return `
      ${elSize}
      ${elPosition}
    `;
  }

  function calcBoxSize(el) {
    let elBox = getBoundingBox(el);
    return `
      width: ${(elBox.width / frameBox.width) * 100}%;
      height: ${(elBox.height / frameBox.height) * 100}%;
    `;
  }

  function calcPosition(el) {
    let elBox = getBoundingBox(el);
    return `
      top: ${elBox.y - frameBox.y}px;
      left: ${elBox.x - frameBox.x}px;
    `;
  }

  async function getBackground(el) {
    let bg = el.fills[0];

    if (el.type === "TEXT") return ``;
    else if (bg.type === "IMAGE") {
      let nodeImageId = el.id;
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
        return `
          background: url(${imageUrl}) no-repeat center center;
        `;
      } else {
        return new Error("wtf");
      }
    } else if (bg.type === "SOLID") {
      let color = bg.color;
      return `
        background: ${getColor(color)};
      `;
    } else if (bg.type === "GRADIENT_LINEAR") {
      let steps = bg.gradientStops;
      let renderStep = "";
      for (let i = 0; i < steps.length; i++) {
        let color = steps[i].color;
        let position = steps[i].position;
        renderStep += `${getColor(color)} ${position * 100}%`;
        if (i !== steps.length - 1) renderStep += ", ";
      }

      return `
        background: linear-gradient(${renderStep});
      `;
    }

    return ``;
  }

  function getTextStyle(el) {
    let fontSize = el?.style?.fontSize;
    let fontFamily = el?.style?.fontFamily;
    let fontWeight = el?.style?.fontWeight;
    let fontStyle = el?.style?.fontStyle;
    let textDecoration = el?.style?.textDecoration;
    let color = el?.style?.color;

    let finalStyle = ``;

    if (fontSize) {
      finalStyle += `font-size: ${fontSize}px;`;
    }

    if (fontFamily) {
      finalStyle += `font-family: ${fontFamily};`;
    }

    if (fontWeight) {
      finalStyle += `font-weight: ${fontWeight};`;
    }

    if (fontStyle) {
      finalStyle += `font-style: ${fontStyle};`;
    }

    if (textDecoration) {
      finalStyle += `text-decoration: ${textDecoration};`;
    }

    if (color) {
      finalStyle += `color: ${getColor(color)});`;
    }

    return finalStyle;
  }

  async function getBoxStyle(el) {
    let boundingBox;
    if (el.type === "TEXT") {
      boundingBox = calcPosition(el);
    } else {
      boundingBox = calcBoundingBox(el);
    }
    let background = await getBackground(el);
    let textStyle = getTextStyle(el);
    return `
      ${boundingBox}
      ${background}
      ${textStyle}
    `;
  }

  function getColor({ r, g, b, a }) {
    return `rgba(${r * 255}, ${g * 255}, ${b * 255}, ${a})`;
  }
</script>

<div id="renderer" style={getFrameStyle()}>
  {#each renderChild(frame) as child}
    {#await getBoxStyle(child)}
      <p>...</p>
    {:then boxStyle}
      <div class="child" style={boxStyle}>
        {#if child.type === "TEXT"}
          {child.characters}
        {/if}
      </div>
    {:catch error}
      {error}
    {/await}
  {/each}
</div>

<style>
  #renderer {
    position: relative;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    overflow: hidden;
  }

  #renderer .child {
    position: absolute;
  }
</style>
