export const hexToRgb = (hex: string, alpha: number) => {
  if (hex.includes("rgb")) {
    return hex;
  }

  let HEX = hex;
  if (hex.length === 4) {
    HEX = hex[0] + hex[1] + hex[1] + hex[2] + hex[2] + hex[3] + hex[3];
  }
  var r = parseInt(HEX.slice(1, 3), 16),
    g = parseInt(HEX.slice(3, 5), 16),
    b = parseInt(HEX.slice(5, 7), 16);

  if (alpha) {
    return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
  } else {
    return "rgb(" + r + ", " + g + ", " + b + ")";
  }
};
