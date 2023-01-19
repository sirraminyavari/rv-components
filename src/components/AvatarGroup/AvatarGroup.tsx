import clsx from 'clsx';
import {
  HTMLAttributes,
  DetailedHTMLProps,
  forwardRef,
  PropsWithoutRef,
} from 'react';
import styles from './AvatarGroup.module.scss';

export interface RVAvatarGroup
  extends PropsWithoutRef<
    DetailedHTMLProps<HTMLAttributes<HTMLImageElement>, HTMLImageElement>
  > {}

const AvatarGroup = forwardRef<HTMLImageElement, RVAvatarGroup>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(styles.baseAvatarGroup, className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

export default AvatarGroup;
