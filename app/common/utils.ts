import { useEffect, useRef } from 'react';

export const genPalette = (colors: Iterable<string> | ArrayLike<string>) => {
  return Array.from(colors).reduce(
    (obj: { [key: string]: string }, item, index) => (
      (obj[`c${index}`] = item), obj
    ),
    {}
  );
};

export const getMode = (list: (string | undefined)[]) => {
  const counters = list.reduce(
    (obj: { [key: string]: number }, elem) => (
      elem && (obj[elem] = (obj[elem] || 0) + 1), obj
    ),
    {}
  );

  let mode = '';
  let reps = 0;

  for (const key of Object.keys(counters)) {
    if (counters[key] > reps) {
      reps = counters[key];
      mode = key;
    }
  }

  return mode;
};

const parseBoxShadow = (shadow: string, limit?: number) => {
  if (!shadow) {
    return '';
  }

  let values = shadow.split(',');

  if (limit) {
    values = values.slice(0, 20);
  }

  const maxLength = 19;
  const offset = 4;

  return values
    .map((line, index) => {
      const diff = Math.max(maxLength + offset - line.length, 0);
      const ident = new Array(diff).fill(' ').join('');

      if (!index) {
        return `\n${ident}${line}`;
      }

      return `${ident}${line}`;
    })
    .join(',\n');
};

export const getTemplate: (
  data: {
    pixels: number;
    zoom: number;
    backgroundColor: string;
    color: string;
    boxShadow: string;
  },
  full?: boolean,
  prefix?: string
) => string = (data, full = false, prefix = '') => {
  const limit = full ? undefined : 20;
  const parsedBoxShadow = parseBoxShadow(data.boxShadow, limit);
  const resolution = data.pixels ** 2;

  return [
    prefix,
    `:root {
  /* Amount of pixels to render (by side) */
  /* resolution: ${resolution} bits (${data.pixels}*${data.pixels}) */
  --pixels: ${data.pixels};

  /* Size available for rendering */
  --width: 512px;
  
  /* Zoom control */
  --zoom: ${data.zoom};
  
  /* Dynamic pixel size */
  --pixel-size: calc((var(--width) * var(--zoom)) / var(--pixels));
}

.board {
  position: relative;

  /* These will center the image */
  display: flex;
  align-items: center;
  justify-content: center;

  border: 1px solid #ccc;
  font-size: var(--pixel-size);
  width: var(--width);
  height: var(--width);
  overflow: hidden;
}

.board .drawing {
  position: absolute;

  /* This let us scale the image by font-size */
  width: 1em;
  height: 1em;
  margin-top: 1em;
  margin-left: 1em;

  /* This is the most frequent color in the image */
  color: ${data.color};

  /* Color of the pixel at the center of image */
  background-color: ${data.backgroundColor};

  /* Below are just a few lines of boxShadow */
  /* The value it's too long to be shown here */
  /* click on the 'copy' button to get the full template */
  box-shadow: ${parsedBoxShadow};
}`,
  ]
    .filter(Boolean)
    .join('');
};

export const getTemplateHTML = (prefix = '') => {
  return [prefix, '<div class="board">\n  <div class="drawing"></div>\n</div>']
    .filter(Boolean)
    .join('');
};

export const toClipboard = (text: string) => {
  return navigator.clipboard.writeText(text);
};

export const useDidUpdateEffect = (fn: () => void, inputs: any[]) => {
  const isMountingRef = useRef(false);

  useEffect(() => {
    isMountingRef.current = true;
  }, []);

  useEffect(() => {
    if (!isMountingRef.current) {
      return fn();
    } else {
      isMountingRef.current = false;
    }
  }, inputs);
};
