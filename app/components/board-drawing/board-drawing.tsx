import CircularProgress from '@mui/material/CircularProgress';
import styles from './board-drawing.module.scss';

interface IBoardDrawingProps {
  backgroundColor: string;
  boxShadow: string;
  color: string;
  loading: boolean;
}

const BoardDrawing = ({
  backgroundColor,
  boxShadow,
  color,
  loading,
}: IBoardDrawingProps) => {
  const getClassName = (key: string, show: boolean) => {
    return [styles[key], show ? styles.show : undefined]
      .filter(Boolean)
      .join(' ');
  };

  return (
    <>
      <div
        className={getClassName('drawing', !loading)}
        style={{ backgroundColor, boxShadow, color }}
      ></div>

      <div className={getClassName('drawing', loading)}>
        <CircularProgress
          color="primary"
          variant="indeterminate"
          disableShrink={true}
        />
      </div>
    </>
  );
};

export default BoardDrawing;
