import CloseIcon from '@mui/icons-material/Close';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { IconButton, Snackbar } from '@mui/material';
import Button from '@mui/material/Button';
import { getTemplate, getTemplateHTML, toClipboard } from 'app/common/utils';
import React from 'react';
import styles from './button-to-clipboard.module.scss';

interface IPreviewProps {
  resolution: number;
  zoom: number;
  backgroundColor: string;
  color: string;
  boxShadow: string;
}

const ButtonToClipboard = ({
  backgroundColor,
  boxShadow,
  color,
  resolution,
  zoom,
}: IPreviewProps) => {
  const [showMessage, setShowMessage] = React.useState(false);
  const [message, setMessage] = React.useState('');

  const templateData = {
    backgroundColor,
    boxShadow,
    color,
    pixels: resolution,
    zoom,
  };

  const template = getTemplate(templateData, true);
  const templateHtml = getTemplateHTML();

  const onClick = (template: string) => {
    toClipboard(template)
      .then(
        () => setMessage('Template copied to clipboard'),
        () => setMessage('Unknown error when copying template')
      )
      .finally(() => setShowMessage(true));
  };

  const onCloseInfo = (_: unknown, reason?: string) => {
    setShowMessage(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={onCloseInfo}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <>
      {boxShadow && (
        <div className={styles['actions']}>
          <Button
            variant="contained"
            onClick={() => onClick(templateHtml)}
            sx={{ lineHeight: 1 }}
          >
            <ContentCopyIcon sx={{ marginRight: '0.5rem' }}></ContentCopyIcon>
            Copy HTML
          </Button>

          <Button
            variant="contained"
            onClick={() => onClick(template)}
            sx={{ lineHeight: 1 }}
          >
            <ContentCopyIcon sx={{ marginRight: '0.5rem' }}></ContentCopyIcon>
            Copy CSS
          </Button>
        </div>
      )}

      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={showMessage}
        autoHideDuration={2000}
        onClose={onCloseInfo}
        message={message}
        action={action}
      />
    </>
  );
};

export default ButtonToClipboard;
