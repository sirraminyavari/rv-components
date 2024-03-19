import { FunctionComponent, useEffect, useState } from 'react';
import { Button } from '../../components';
import styles from './ManagementMenu.module.scss';
import Skeleton from 'react-loading-skeleton';
import { RVSvgProps, RVVariantProp } from '../../types';

export interface RVManagementMenu {
  menuItemsListCallback?: () => Promise<
    {
      id?: string;
      title: string;
      Icon?: FunctionComponent<RVSvgProps>;
      path: string;
      onClick?: (path: string) => void;
    }[]
  >;
}
const ManagementMenu: FunctionComponent<RVManagementMenu> = ({ menuItemsListCallback }) => {
  const [menuItemsList, setMenuItemsList] =
    useState<Awaited<ReturnType<Exclude<RVManagementMenu['menuItemsListCallback'], undefined>>>>();
  const [isLoading, setIsLoading] = useState<boolean>();
  useEffect(() => {
    setIsLoading(true);
    if (menuItemsListCallback)
      menuItemsListCallback()
        .then((menuItems) => {
          setMenuItemsList(menuItems);
        })
        .finally(() => {
          setIsLoading(false);
        });
  }, [menuItemsListCallback]);
  return (
    <div className={styles.menuContainer}>
      {isLoading ? (
        <LoadingState />
      ) : (
        menuItemsList?.map(({ id, title, Icon, path, onClick }) => {
          return (
            <Button
              key={`${id || title}-managementMenu-button`}
              className={styles.menuButton}
              onClick={() => onClick && onClick(path)}
              variant={RVVariantProp.outline}
            >
              {Icon && <Icon />}
              <span>{title}</span>
            </Button>
          );
        })
      )}
    </div>
  );
};

const LoadingState = () => {
  return (
    <>
      {new Array(9).fill(undefined).map((_, idx) => {
        return (
          <Skeleton
            key={`managementMenu-button-skeleton-${idx}`}
            className={styles.menuButton}
            inline
          />
        );
      })}
    </>
  );
};

export default ManagementMenu;
