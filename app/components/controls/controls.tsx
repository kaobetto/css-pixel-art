import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Slider from '@mui/material/Slider';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import React, { useEffect, useRef, useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import {
  RESOLUTIONS_MAP,
  VALID_FILE_TYPES,
  VALID_PALETTES,
  VALID_RESOLUTIONS,
  ZOOM_MAX,
  ZOOM_MIDDLE,
  ZOOM_MIN,
} from './../../common/constants';

import styles from './controls.module.scss';

interface IControlsProps {
  initialData: IControlsData;
  eventHandler: (data: IControlsData) => void;
}

export interface IControlsData {
  canvas?: React.MutableRefObject<HTMLCanvasElement | null>;
  palette: string;
  zoom: number;
  zoomPercent: number;
  imageUrl: string;
  resolution: number;
  gridToggle: boolean;
}

const Controls = ({ initialData, eventHandler }: IControlsProps) => {
  const refCanvas = useRef<HTMLCanvasElement | null>(null);
  const [data, setData] = useState<IControlsData>({
    ...initialData,
    canvas: refCanvas,
  });

  const onChangeZoom = (event: Event, newValue: number | number[]) => {
    if (typeof newValue === 'number') {
      const zoomPercent = newValue;
      const zoom = zoomPercent / 100;

      updateData({ zoom, zoomPercent });
    }
  };

  const onChangeResolution = (event: SelectChangeEvent) => {
    updateData({ resolution: +event.target.value });
  };

  const onChangeGridToggle = () => {
    updateData({ gridToggle: !data.gridToggle });
  };

  const onChangePalette = (event: SelectChangeEvent) => {
    updateData({ palette: event.target.value });
  };

  const onChangeFile = async (file: Blob) => {
    if (file) {
      const reader = new FileReader();

      reader.onload = async () => {
        const imageUrl = reader.result as string;
        updateData({ imageUrl });
      };

      reader.readAsDataURL(file);
    }
  };

  const updateData = (newData: Partial<IControlsData>) => {
    setData({ ...data, ...newData });
  };

  useEffect(() => {
    eventHandler && eventHandler(data);
  }, [eventHandler, data]);

  const formatterZoomLabel = (value: number) => {
    return `${value}%`;
  };

  return (
    <>
      <canvas className={styles['img-loader']} ref={refCanvas} />
      <div className={styles['row']}>
        <div className={styles['col-dnd']}>
          <FileUploader
            handleChange={onChangeFile}
            name="file"
            types={VALID_FILE_TYPES}
            classes={styles['dnd-item']}
          />
        </div>

        <div className={styles['col-controls']}>
          <div className={styles['row']}>
            <div className={styles['col-resolution']}>
              <FormControl fullWidth>
                <InputLabel id="select-resolution-label">
                  Resolution (bits)
                </InputLabel>
                <Select
                  labelId="select-resolution-label"
                  label="Resolution (bits)"
                  id="select-resolution"
                  value={data.resolution.toString()}
                  onChange={onChangeResolution}
                >
                  {VALID_RESOLUTIONS.map((key) => (
                    <MenuItem key={key} value={RESOLUTIONS_MAP[key]}>
                      {key}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>

            <div className={styles['col-palette']}>
              <FormControl fullWidth>
                <InputLabel id="select-palette-label">Palette</InputLabel>
                <Select
                  labelId="select-palette-label"
                  label="Palette"
                  id="select-palette"
                  value={data.palette}
                  onChange={onChangePalette}
                >
                  {VALID_PALETTES.map((palette) => (
                    <MenuItem key={palette} value={palette}>
                      {palette}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>

            <div className={styles['col-zoom']} style={{ marginBottom: 0 }}>
              <Typography id="input-slider" className={styles['placeholder']}>
                Zoom
              </Typography>

              <div className={styles['slider-item']}>
                <Slider
                  valueLabelDisplay="auto"
                  value={data.zoomPercent}
                  min={ZOOM_MIN}
                  max={ZOOM_MAX}
                  step={10}
                  onChange={onChangeZoom}
                  valueLabelFormat={formatterZoomLabel}
                  getAriaValueText={formatterZoomLabel}
                />

                <div className={styles['marks']}>
                  <Typography
                    onClick={() => onChangeZoom({} as any, ZOOM_MIN)}
                    sx={{ cursor: 'pointer' }}
                  >
                    {ZOOM_MIN}%
                  </Typography>
                  <Typography
                    onClick={() => onChangeZoom({} as any, ZOOM_MIDDLE)}
                    sx={{ cursor: 'pointer' }}
                  >
                    {ZOOM_MIDDLE}%
                  </Typography>
                  <Typography
                    onClick={() => onChangeZoom({} as any, ZOOM_MAX)}
                    sx={{ cursor: 'pointer' }}
                  >
                    {ZOOM_MAX}%
                  </Typography>
                </div>
              </div>
            </div>

            <div className={styles['col-grid']} style={{ marginBottom: 0 }}>
              <Typography id="input-slider" className={styles['placeholder']}>
                Grid
              </Typography>
              <Switch checked={data.gridToggle} onChange={onChangeGridToggle} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Controls;
