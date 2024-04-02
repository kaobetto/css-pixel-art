import { Typography } from '@mui/material';
import styles from './header.module.scss';

const Header = () => {
  return (
    <header className={styles['main-header']}>
      <nav className={styles['header-inner']}>
        <a className={styles['nav-brand']} href="/">
          <Typography>2CSS-PixelArt</Typography>
        </a>

        <div className={styles['nav-actions']}></div>
      </nav>
    </header>
  );
};

export default Header;
