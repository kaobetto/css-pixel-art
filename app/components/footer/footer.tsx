import { faTiktok } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';
import YouTubeIcon from '@mui/icons-material/YouTube';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import styles from './footer.module.scss';

const Footer = () => {
  const socialMedia = [
    {
      key: 'youtube',
      user: '@kaobetto',
      url: 'https://www.youtube.com/@kaobetto',
      icon: YouTubeIcon,
    },
    {
      key: 'instagram',
      user: '@kaobetto',
      url: 'https://www.instagram.com/kaobetto',
      icon: InstagramIcon,
    },
    {
      key: 'twitter',
      user: '@kaobetto',
      url: 'https://twitter.com/kaobetto',
      icon: XIcon,
    },
    {
      key: 'tiktok',
      user: '@kaobetto',
      url: 'https://www.tiktok.com/@kaobetto',
      icon: XIcon,
    },
    {
      key: 'github',
      user: '@kaobetto',
      url: 'https://github.com/kaobetto',
      icon: GitHubIcon,
    },
  ];

  const mediaList = socialMedia.map((media, key) => {
    const isTT = media.key === 'tiktok';
    const classes = styles['anchor-icon'];

    return (
      <li key={key}>
        <Link href={media.url} target="_blank" variant="body2">
          <div className={styles['anchor-inner']}>
            {isTT && <FontAwesomeIcon icon={faTiktok} className={classes} />}
            {!isTT && <media.icon className={classes} />}
            {media.user}
          </div>
        </Link>
      </li>
    );
  });

  return (
    <>
      <Divider sx={{ marginTop: '2rem' }} />

      <footer className={styles['main-footer']}>
        <div className={styles['footer-inner']}>
          <ul className={styles['social-media']}>{mediaList}</ul>
        </div>
      </footer>
    </>
  );
};

export default Footer;
