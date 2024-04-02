export interface IImageParsedData {
  width: number;
  height: number;
  colors: Set<string>;
  pixels: string[];
}

export interface IImageData {
  color: string;
  colorBg: string;
  boxShadow: string;
  parsed?: IImageParsedData;
}
