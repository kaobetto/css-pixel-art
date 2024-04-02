import styles from './board-grid.module.scss';

interface IBoardGridProps {
  showGrid: boolean;
}

const BoardGrid = ({ showGrid = true }: IBoardGridProps) => {
  const getPanelClasses = (): string =>
    [styles.panel, showGrid ? styles['bg-grid'] : ''].filter(Boolean).join(' ');

  return <div className={getPanelClasses()}></div>;
};

export default BoardGrid;
