<script context="module">
  export function getColor(color) {
    return `rgba(${color.r * 255}, ${color.g * 255}, ${color.b * 255}, ${
      color.a
    })`;
  }

  export function getBackgroundColor(color) {
    return `background: ${getColor(color)}`;
  }

  export function getGradientColor(colors) {
    let renderStep = "";
    for (let i = 0; i < colors.length; i++) {
      let { color, position } = colors[i];
      renderStep += `${getColor(color)} ${position * 100}%`;
      if (i !== colors.length - 1) renderStep += ", ";
    }
    return `linear-gradient(90deg, ${renderStep});`;
  }
</script>
