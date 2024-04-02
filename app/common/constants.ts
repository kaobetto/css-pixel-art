import { COLOR_PALETTES } from './palettes';

export const RESOLUTIONS_MAP: { [key: string]: number } = {
  '64': 8,
  '256': 16,
  '576': 24,
  '1k': 32,
  '2k': 48,
  '4k': 64,
  '8k': 96,
  '16k': 128,
  '20k': 140,
};

export const ZOOM_MIN = 10;
export const ZOOM_MIDDLE = 100;
export const ZOOM_MAX = 200;

export const DEFAULT_CONTROLS_DATA = {
  palette: 'default',
  zoom: 1,
  zoomPercent: 100,
  imageUrl: '',
  resolution: 32,
  gridToggle: true,
};

export const VALID_FILE_TYPES = [
  'jpg',
  'jpeg',
  'png',
  'svg',
  'webp',
  'gif',
  'bmp',
];
export const VALID_RESOLUTIONS = [...Object.keys(RESOLUTIONS_MAP)];
export const VALID_PALETTES = [
  ...Object.keys(COLOR_PALETTES),
  'default',
].sort();
