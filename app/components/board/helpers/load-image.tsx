import { MutableRefObject } from 'react';
import { IImageParsedData } from '../common/image-data.interface';

export const parseImage = async (
  imageUrl: string,
  resolution: number,
  canvas?: MutableRefObject<HTMLCanvasElement | null>
): Promise<IImageParsedData> => {
  return new Promise((resolve, reject) => {
    if (!imageUrl || !canvas) {
      return reject(undefined);
    }

    // Draw the image on the canvas
    if (canvas.current) {
      const ctx = canvas.current.getContext('2d');

      // Clear the canvas before drawing the new image
      ctx && ctx.clearRect(0, 0, canvas.current.width, canvas.current.height);

      const img = new Image();

      img.onload = async () => {
        if (ctx) {
          const imageRatio = img.height / img.width;
          const imageWidth = resolution;
          const imageHeight = Math.ceil(imageWidth * imageRatio);

          ctx.drawImage(img, 0, 0, imageWidth, imageHeight);

          // Get pixel data from the canvas
          const pixelData = ctx.getImageData(
            0,
            0,
            imageWidth,
            imageHeight
          ).data;

          // Collect unique colors from the image
          const uniqueColors = new Set<string>();
          const pixelMap: string[] = [];
          const lengthLimit = resolution ** 2 * 4;

          for (let i = 0; i < Math.min(pixelData.length, lengthLimit); i += 4) {
            const red = pixelData[i];
            const green = pixelData[i + 1];
            const blue = pixelData[i + 2];
            const alpha = pixelData[i + 3];

            // Ensure valid RGBA values
            if (red != null && green != null && blue != null && alpha != null) {
              // Convert RGBA values to string representation
              const colorString =
                alpha === 0
                  ? ''
                  : `#${((1 << 24) | (red << 16) | (green << 8) | blue)
                      .toString(16)
                      .slice(1)}`;

              if (colorString) {
                uniqueColors.add(colorString);
              }

              pixelMap.push(colorString);
            }
          }

          resolve({
            width: imageWidth,
            height: Math.min(imageHeight, resolution),
            colors: uniqueColors,
            pixels: pixelMap,
          });
        }
      };

      img.src = imageUrl;
    }
  });
};
