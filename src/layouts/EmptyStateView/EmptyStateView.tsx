import clsx from 'clsx';
import { Typography } from '../../components';
import { RVColorProp } from '../../types';
import styles from './EmptyStateView.module.scss';
import { PropsWithChildren, ReactNode, VoidFunctionComponent } from 'react';

export interface RVEmptyStateView {
  /** set the component color palette (default:RVColorProp.gray) */
  color?: RVColorProp;
  /** set the Empty State banner icon (default:undefined) */
  IconComponent?: VoidFunctionComponent<{ className: string }>;
  /** set the Empty State title string (default:undefined) */
  title?: ReactNode;
  /** set the Empty State description string (default:undefined) */
  description?: ReactNode;
}

const EmptyStateView = ({
  IconComponent,
  description,
  title,
  color = RVColorProp.gray,
  children,
}: PropsWithChildren<RVEmptyStateView>) => {
  return (
    <div className={clsx(color, styles.emptyStateContainer)}>
      {IconComponent !== undefined && <IconComponent className={clsx(styles.emptyStateIcon)} />}
      {typeof title === 'string' ? (
        <Typography type="H2" color={color} className={styles.emptyStateLabel}>
          {title}
        </Typography>
      ) : (
        title
      )}
      {typeof description === 'string' ? (
        <Typography type="H4" color={color} className={styles.emptyStateLabel}>
          {description}
        </Typography>
      ) : (
        description
      )}

      {children !== undefined && <div className={styles.emptyStateActions}>{children}</div>}
    </div>
  );
};
export default EmptyStateView;
