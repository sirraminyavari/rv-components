import clsx from 'clsx';
import {
  DetailedHTMLProps,
  forwardRef,
  Fragment,
  FunctionComponent,
  HTMLAttributes,
  PropsWithoutRef,
  useState,
} from 'react';
import { CaretSvg } from '../../icons';
import { RVColorProp, RVSizeProp, RVSvgProps, RVVariantProp } from '../../types';
import { isRTL } from '../../utils';
import styles from './Breadcrumb.module.scss';

export interface RVBreadcrumb
  extends Omit<
    PropsWithoutRef<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>>,
    'color' | 'size'
  > {
  variant?: RVVariantProp;
  color?: RVColorProp;
  size?: RVSizeProp;
  label?: string;
  Icon?: FunctionComponent<RVSvgProps>;
  routeLinks?: {
    label: string;
    path: string;
    adjacentPaths?: {
      path: string;
      label: string;
    }[];
  }[];
}

const Breadcrumb = forwardRef<HTMLDivElement, RVBreadcrumb>(
  (
    {
      className,
      color = RVColorProp.cgBlue,
      variant = RVVariantProp.primary,
      size = RVSizeProp.small,
      routeLinks = [],
      Icon,
      ...props
    },
    ref
  ) => {
    const [adjacentPathsContainerStatus, setadjacentPathsContainerStatus] = useState<boolean[]>(
      routeLinks.map(() => false)
    );
    const toggleAdjacentPaths = (idx: number) => {
      setadjacentPathsContainerStatus((prev) => {
        return prev.map((status, prevIdx) => {
          if (idx === prevIdx) return !status;
          else return status;
        });
      });
    };
    return (
      <div
        className={clsx(
          styles.BreadcrumbContainer,
          color,
          styles[variant],
          styles[size],
          className
        )}
        ref={ref}
        {...props}
      >
        {Icon && <Icon className={styles.icon} />}
        <div className={styles.BreadcrumbItemsContainer}>
          {routeLinks.map(({ label, path, adjacentPaths }, idx) => (
            <Fragment key={`breadcrumb-${path}-${idx}`}>
              {Boolean(idx) && routeLinks.length - idx > 0 && (
                <>
                  <button
                    onClick={() => {
                      toggleAdjacentPaths(idx);
                    }}
                    className={clsx(
                      styles.separatorSvg,
                      adjacentPaths?.length &&
                        adjacentPathsContainerStatus[idx] &&
                        styles.showAdjacentPaths
                    )}
                  >
                    <CaretSvg direction={isRTL() === 'rtl' ? 'left' : 'right'} />
                    {adjacentPaths?.length ? (
                      <>
                        <div className={styles.adjacentPathsContainer}>
                          {adjacentPaths?.map((item, jdx) => {
                            return (
                              <a
                                href={item.path}
                                key={`breadcrumb-link-${item.path}-${idx}-${jdx}`}
                                className={clsx(styles.BreadcrumbItem, styles.adjacentPathItem)}
                              >
                                <span className={styles.label}>{item.label}</span>
                              </a>
                            );
                          })}
                        </div>
                      </>
                    ) : null}
                  </button>
                </>
              )}
              <a href={path} className={styles.BreadcrumbItem}>
                <span className={styles.label}>{label}</span>
              </a>
            </Fragment>
          ))}
        </div>
      </div>
    );
  }
);

export default Breadcrumb;
