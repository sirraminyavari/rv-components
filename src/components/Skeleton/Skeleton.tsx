import clsx from 'clsx';
import LoadingSkeleton, { SkeletonProps } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { RVColorProp } from '../../types';
import styles from './Skeleton.module.scss';

export interface RVSkeleton extends SkeletonProps {
  /** set the component color palette (default:RVColorProp.grayDark) */
  color?: RVColorProp;
}

const Skeleton = ({ color = RVColorProp.grayLight, className, circle, ...props }: RVSkeleton) => {
  return (
    <>
      <LoadingSkeleton
        className={clsx(color, styles.baseSkeleton, circle && styles.circleSkeleton, className)}
        circle={circle}
        {...props}
      />
    </>
  );
};

export default Skeleton;
