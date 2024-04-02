import React, { useEffect, useState } from 'react';
import ButtonToClipboard from '../button-to-clipboard/button-to-clipboard';
import Preview from '../editor/editor';
import { DEFAULT_CONTROLS_DATA } from './../../common/constants';
import BoardDrawing from './../board-drawing/board-drawing';
import BoardGrid from './../board-grid/board-grid';
import Controls, { IControlsData } from './../controls/controls';
import styles from './board.module.scss';
import { IImageData } from './common/image-data.interface';
import { drawImage } from './helpers/draw-image';
import { parseImage } from './helpers/load-image';

const getCSSVars = (resolution: number, zoom: number): React.CSSProperties => {
  return {
    '--pixels': resolution,
    '--zoom': zoom,
  } as React.CSSProperties;
};

const Board = () => {
  const [imageData, setImageData] = useState<IImageData>({
    color: '',
    colorBg: '',
    boxShadow: '',
  });

  const [controlsData, setControlsData] = useState<IControlsData>(
    DEFAULT_CONTROLS_DATA
  );

  const [stylesVars, setStylesVars] = useState<React.CSSProperties>(
    getCSSVars(DEFAULT_CONTROLS_DATA.resolution, DEFAULT_CONTROLS_DATA.zoom)
  );

  // Load image
  useEffect(() => {
    parseImage(
      controlsData.imageUrl,
      controlsData.resolution,
      controlsData.canvas
    )
      .then((parsed) => setImageData((prev) => ({ ...prev, parsed })))
      .catch(() => console.log('no image provided'));
  }, [controlsData.imageUrl, controlsData.resolution, controlsData.canvas]);

  // Draw pixels
  useEffect(() => {
    setImageData((prev) => ({
      ...prev,
      ...drawImage(controlsData.palette, imageData.parsed),
    }));
  }, [controlsData.palette, imageData.parsed]);

  // Update CSS vars
  useEffect(() => {
    setStylesVars(getCSSVars(controlsData.resolution, controlsData.zoom));
  }, [controlsData.resolution, controlsData.zoom]);

  return (
    <>
      <div className={styles.container}>
        <Controls
          initialData={controlsData}
          eventHandler={(data) => setControlsData(data)}
        ></Controls>
      </div>

      <div className={styles.container}>
        <div className={styles.col}>
          <div className={styles.board} style={stylesVars}>
            <BoardGrid showGrid={controlsData.gridToggle}></BoardGrid>
            <BoardDrawing
              backgroundColor={imageData.colorBg}
              boxShadow={imageData.boxShadow}
              color={imageData.color}
            ></BoardDrawing>
          </div>
        </div>

        <div className={styles.col}>
          <Preview
            backgroundColor={imageData.colorBg}
            boxShadow={imageData.boxShadow}
            color={imageData.color}
            resolution={controlsData.resolution}
            zoom={controlsData.zoom}
          ></Preview>
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.col}>
          <ButtonToClipboard
            backgroundColor={imageData.colorBg}
            boxShadow={imageData.boxShadow}
            color={imageData.color}
            resolution={controlsData.resolution}
            zoom={controlsData.zoom}
          ></ButtonToClipboard>
        </div>
      </div>
    </>
  );
};

export default Board;
