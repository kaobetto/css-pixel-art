import { Typography } from '@mui/material';
import styles from './intro.module.scss';

const Intro = () => {
  return (
    <div className={styles['container']}>
      <Typography variant="h6" component="h2">
        Convert any image into a CSS-PixelArt
      </Typography>

      <Typography>
        Each pixel from the source image is represented by the box-shadow
        property. The result is a pure CSS drawing, it&apos;s responsive and we
        can modify it using more CSS properties
      </Typography>
    </div>
  );
};

export default Intro;
