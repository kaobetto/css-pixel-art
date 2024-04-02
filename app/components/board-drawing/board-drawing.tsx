import styles from './board-drawing.module.scss';

interface IBoardDrawingProps {
  backgroundColor: string;
  boxShadow: string;
  color: string;
}

const BoardDrawing = ({
  backgroundColor,
  boxShadow,
  color,
}: IBoardDrawingProps) => {
  return (
    <>
      <div
        className={styles.drawing}
        style={{ backgroundColor, boxShadow, color }}
      ></div>
    </>
  );
};

export default BoardDrawing;
