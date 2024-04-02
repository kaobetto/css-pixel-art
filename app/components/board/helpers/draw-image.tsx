import { COLOR_PALETTES } from 'app/common/palettes';
import { genPalette, getMode } from 'app/common/utils';
import nearestColor from 'nearest-color';
import { IImageParsedData } from '../common/image-data.interface';

export const drawImage = (palette: string, parsed?: IImageParsedData) => {
  if (!parsed) {
    return;
  }

  const { width, height, colors, pixels } = parsed;

  // Create a palette from unique colors
  const defaultPalette = genPalette(colors);
  const currentPalette = COLOR_PALETTES[palette] || defaultPalette;

  // Use nearest-color library to map colors to the generated palette
  const colorMap = nearestColor.from(currentPalette);
  const finalPixels = pixels.map((color) => color && colorMap(color)?.value);

  // Shadow Box
  const mostRepeatedColor = getMode(finalPixels);

  const shadowStr = finalPixels
    .map((color, index) => {
      if (!color) {
        return;
      }

      const x = (index % width) - Math.floor(width / 2);
      const y = Math.floor(index / width) - Math.floor(height / 2);

      const xOffset = x && `${x}em`;
      const yOffset = y && `${y}em`;

      if (color === mostRepeatedColor) {
        return `${xOffset} ${yOffset}`;
      }

      return `${xOffset} ${yOffset} ${color}`;
    })
    .filter(Boolean)
    .join(', ');

  // Root color
  const rootIndex = Math.floor((finalPixels.length + width) / 2);
  const rootColor = finalPixels[rootIndex] || 'transparent';

  return {
    color: mostRepeatedColor,
    boxShadow: shadowStr,
    colorBg: rootColor,
  };
};
