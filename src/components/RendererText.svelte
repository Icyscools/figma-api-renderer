<script>
  import { getColor, getGradientColor } from "../utils/colors.svelte";
  export let data;

  // console.group("TEXT");
  // console.log(data);
  // console.groupEnd();

  function getTextBackground() {
    let fill = data.fills[0];
    if (fill.type === "SOLID") {
      return `color: ${getColor(fill.color)};`;
    } else if (fill.type === "GRADIENT_LINEAR") {
      return `background: ${getGradientColor(
        fill.gradientStops
      )};-webkit-background-clip: text;-webkit-text-fill-color: transparent;`;
    }
    return ``;
  }

  function getTextStyle() {
    let fontSize = data?.style?.fontSize;
    let fontFamily = data?.style?.fontFamily;
    let fontWeight = data?.style?.fontWeight;
    let fontStyle = data?.style?.fontStyle;
    let textDecoration = data?.style?.textDecoration;
    let textAlignHorizontal = data?.style?.textAlignHorizontal;
    let textStroke = data?.strokes?.[0];
    let color = getTextBackground();

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

    if (textAlignHorizontal) {
      finalStyle += `text-align: ${textAlignHorizontal.toLowerCase()};`;
    }

    if (textStroke) {
      let strokeWidth = data?.strokeWeight;
      let strokeColor = getColor(textStroke.color);
      finalStyle += `-webkit-text-stroke: ${strokeWidth}px ${strokeColor};`;
    }

    if (color) {
      finalStyle += color;
    }

    return finalStyle;
  }
</script>

<div class="text" style={getTextStyle()}>
  {data.characters}
</div>

<style>
  .text {
    z-index: 100;
  }
</style>
