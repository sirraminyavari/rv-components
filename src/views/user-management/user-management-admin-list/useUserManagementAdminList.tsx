import { FormEvent, ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { Button, RVSelectOptionItem, RVToast } from '../../../components';
import { RVSizeProp, RVVariantProp } from '../../../types';
import type { ColumnDef } from '@tanstack/react-table';
import { omit } from 'lodash';
import type {
  RVUserManagementAdminList,
  RVUserManagementAdminListUserEntity,
} from './UserManagementAdminList';
import UserManagementAdminListUserNameCell from './user-management-admin-list-cells/UserManagementAdminListUserNameCell';
import UserManagementAdminListFullNameCell from './user-management-admin-list-cells/UserManagementAdminListFullNameCell';
import styles from './UserManagementAdminList.module.scss';
import { getRandomInt } from '../../../utils';
import UserManagementAdminListActiveCell from './user-management-admin-list-cells/UserManagementAdminListActiveCell';
import { t } from 'i18next';
import { Trans } from 'react-i18next';

const useUserManagementAdminList = ({
  loadAllUsersDataCallback,
  updateUserDataCallback,
  loadConfidentialityLevelsCallback,
  updateUserApprovalCallback,
  // closeModal,
  openModal,
  unblockUserCallback,
  usersCountPerPage = 10,
}: RVUserManagementAdminList & {
  closeModal: () => void;
  openModal: (modalData?: {
    user?: RVUserManagementAdminListUserEntity;
    modalContentType?: 'newUser' | 'roleChange' | 'passwordReset' | 'confidentialityChange';
  }) => void;
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [usersListData, setUsersListData] = useState<
    RVUserManagementAdminListUserEntity[] | void
  >();

  const [pageLowerBoundary, setPageLowerBoundary] = useState<number | void>();
  const [totalUsers, setTotalUsers] = useState<number>(0);

  const [tempUserEditedFields, setTempUserEditedFields] = useState<
    Record<
      string,
      Partial<
        Record<
          keyof RVUserManagementAdminListUserEntity,
          Record<'saveStatus' | 'value', string | number | boolean>
        >
      >
    > & { hash?: number }
  >({});
  const [searchText, setSearchText] = useState<string>('');
  const [confidentialityLevels, setConfidentialityLevels] = useState<RVSelectOptionItem[]>();
  const [searchInOnlineUsers, setSearchInOnlineUsers] = useState<boolean>(false);
  const [searchInActiveUsers, setSearchInActiveUsers] = useState<boolean>(true);

  const loadConfidentialityInputTypes = useCallback(async () => {
    const { Levels } = await loadConfidentialityLevelsCallback();
    const formattedLevels = Levels.sort((a, b) => Number(a.LevelID) - Number(b.LevelID)).map(
      (level) => ({ label: level.Title, value: level.ID })
    );
    setConfidentialityLevels(formattedLevels);
  }, [loadConfidentialityLevelsCallback]);

  const loadDataCallback = useCallback(
    async (reset?: boolean) => {
      if (!loadAllUsersDataCallback) return;
      if (isLoading) return;

      if (reset) {
        try {
          setIsLoading(true);
          const { TotalCount, Users } = await loadAllUsersDataCallback({
            IsOnline: searchInOnlineUsers || false,
            IsApproved: searchInActiveUsers || false,
            Count: usersCountPerPage,
            LowerBoundary: reset ? 1 : pageLowerBoundary || 1,
            SearchText: searchText,
          });
          setTotalUsers(TotalCount);
          setPageLowerBoundary(
            (currentLowerBoundary) => (currentLowerBoundary || 1) + Users.length
          );
          setUsersListData((prev = []) => (reset ? Users : [...prev, ...Users]));
        } catch {}
        setIsLoading(false);
        return;
      } else if (pageLowerBoundary && totalUsers <= pageLowerBoundary) return;
      try {
        setIsLoading(true);
        const { TotalCount, Users } = await loadAllUsersDataCallback({
          IsOnline: searchInOnlineUsers || false,
          IsApproved: searchInActiveUsers || false,
          Count: usersCountPerPage,
          LowerBoundary: reset ? 1 : pageLowerBoundary || 1,
          SearchText: searchText,
        });
        setTotalUsers(TotalCount);
        setPageLowerBoundary((currentLowerBoundary) => (currentLowerBoundary || 1) + Users.length);
        setUsersListData((prev = []) => (reset ? Users : [...prev, ...Users]));
      } catch {}
      setIsLoading(false);
    },
    [
      pageLowerBoundary,
      totalUsers,
      searchInOnlineUsers,
      searchInActiveUsers,
      searchText,
      isLoading,
      usersListData,
    ]
  );

  useEffect(() => {
    if (confidentialityLevels === undefined) loadConfidentialityInputTypes();

    if (isLoading) return;
    setUsersListData();
    setPageLowerBoundary();
    setTotalUsers(0);
    loadDataCallback(true);

    return () => {};
  }, [JSON.stringify({ searchText, searchInActiveUsers, searchInOnlineUsers })]);

  const setEditableItem = useCallback(
    (
      user: RVUserManagementAdminListUserEntity,
      userEntityKey: keyof RVUserManagementAdminListUserEntity,
      saveStatus: boolean = false,
      clear: boolean = false
    ) => {
      if (clear)
        setTempUserEditedFields((prev) => {
          return {
            ...prev,
            [user.UserID]: {
              ...omit(prev[user.UserID], userEntityKey),
            },
          };
        });
      else
        setTempUserEditedFields((prev) => {
          return {
            ...prev,
            hash: getRandomInt(0, 10000),
            [user.UserID]: {
              ...prev[user.UserID],
              [userEntityKey]: {
                saveStatus: saveStatus,
                value: undefined,
              },
            },
          };
        });
    },

    [tempUserEditedFields]
  );
  const updateEditedData = useCallback(
    (
        user: RVUserManagementAdminListUserEntity,
        userEntityKeys: (keyof RVUserManagementAdminListUserEntity)[]
      ) =>
      async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (tempUserEditedFields[user.UserID] === undefined) return;
        for await (const userEntityKey of userEntityKeys) {
          const tempData = tempUserEditedFields[user.UserID][userEntityKey];
          if (tempData?.saveStatus === true) continue;
          setEditableItem(user, userEntityKey, true);

          const formData = new FormData((e.target as HTMLFormElement) || e.currentTarget);
          try {
            await updateUserDataCallback({
              UserID: user.UserID,
              [userEntityKey]: formData.get(userEntityKey),
            });

            setUsersListData((prev) => {
              if (prev)
                return prev.map((userItem) => {
                  if (userItem.UserID === user.UserID) {
                    if (userEntityKey === 'IsSystemAdmin')
                      return {
                        ...userItem,
                        [userEntityKey]: formData.get(userEntityKey) === 'admin',
                      };
                    if (userEntityKey === 'Confidentiality')
                      return {
                        ...userItem,
                        Confidentiality: {
                          ConfidentialityID: formData.get(userEntityKey) as string,
                          ID: formData.get(userEntityKey) as string,
                          LevelID: '0',
                          Title: confidentialityLevels?.find(
                            (i) => i.value === formData.get(userEntityKey)
                          )?.label as string,
                        },
                      };

                    return {
                      ...userItem,
                      [userEntityKey]: formData.get(userEntityKey) || userItem[userEntityKey],
                    };
                  } else return userItem;
                });
              else return;
            });
            setEditableItem(user, userEntityKey, undefined, true);
          } catch (error) {
            console.log(error);

            RVToast.error('error saving ...');
          }
        }
      },
    [tempUserEditedFields]
  );

  const usersTableColumns: ColumnDef<Record<string, ReactNode>>[] = useMemo(
    () => [
      {
        id: 'Full Name',
        header: t('full_name', {
          defaultValue: 'Full Name',
          ns: 'common',
        }),
        enableSorting: false,
        enableResizing: false,
        size: 450,
        accessorFn: (row) => row,

        cell: (cell) => {
          const FullNameCellComponent = UserManagementAdminListFullNameCell({
            cell,
            setEditableItem,
            tempUserEditedFields,
            updateEditedData,
            unblockUserCallback,
          });

          return <FullNameCellComponent />;
        },
      },
      {
        accessorKey: 'username',
        id: 'Username',
        header: t('user_name', {
          defaultValue: 'Username',
          ns: 'common',
        }),
        enableSorting: false,
        enableResizing: false,
        size: 250,
        accessorFn: (row) => row,
        cell: (cell) => {
          const UserNameCellComponent = UserManagementAdminListUserNameCell({
            cell,
            setEditableItem,
            tempUserEditedFields,
            updateEditedData,
          });

          return <UserNameCellComponent />;
        },
      },
      {
        id: 'active',
        accessorKey: 'active',
        header: t('active_status', {
          defaultValue: 'Active Status',
          ns: 'common',
        }),
        enableSorting: false,
        enableResizing: false,
        size: 100,
        accessorFn: (row) => row,
        cell: (cell) => {
          const ActiveCellComponent = UserManagementAdminListActiveCell({
            cell,
            updateUserApprovalCallback,
          });
          return <ActiveCellComponent />;
        },
      },
      {
        id: 'Confidentiality',
        accessorKey: 'Confidentiality',
        header: t('confidentiality', {
          defaultValue: 'Confidentiality',
          ns: 'common',
        }),
        enableSorting: false,
        enableResizing: false,
        size: 250,
        accessorFn: (row) => row,
        cell: (cell) => {
          const row = cell.getValue() as RVUserManagementAdminListUserEntity;
          const userConfidentiality = row.Confidentiality
            ? { label: row.Confidentiality?.Title, value: row.Confidentiality?.ID }
            : undefined;
          return (
            <>
              <div className={styles.clickableInputContainer}>
                <Button
                  type="button"
                  variant={RVVariantProp.outline}
                  size={RVSizeProp.small}
                  onClick={() =>
                    openModal({ user: row, modalContentType: 'confidentialityChange' })
                  }
                >
                  {userConfidentiality?.label
                    ? t(userConfidentiality?.label || '', {
                        defaultValue: userConfidentiality?.label,
                        ns: 'common',
                      })
                    : t('not_selected', {
                        defaultValue: 'Not Select ...',
                        ns: 'common',
                      })}
                </Button>
              </div>
            </>
          );
        },
      },
      {
        id: 'Role',
        accessorKey: 'Role',
        header: t('role', {
          defaultValue: 'Role',
          ns: 'common',
        }),
        enableSorting: false,
        enableResizing: false,
        size: 150,
        accessorFn: (row) => row,
        cell: (cell) => {
          const row = cell.getValue() as RVUserManagementAdminListUserEntity;
          return (
            <div className={styles.clickableInputContainer}>
              <Button
                type="button"
                variant={RVVariantProp.outline}
                size={RVSizeProp.small}
                onClick={() => openModal({ user: row, modalContentType: 'roleChange' })}
              >
                {row.IsSystemAdmin
                  ? t('admin', {
                      defaultValue: 'Admin',
                      ns: 'common',
                    })
                  : t('user', {
                      defaultValue: 'User',
                      ns: 'common',
                    })}
              </Button>
            </div>
          );
        },
      },
      {
        id: 'Reset Password',
        accessorKey: 'Reset Password',
        header: t('reset_password', {
          defaultValue: 'Reset Password',
          ns: 'common',
        }),
        enableSorting: false,
        enableResizing: false,
        size: 150,
        accessorFn: (row) => row,
        cell: (cell) => {
          const row = cell.getValue() as Exclude<typeof usersListData, void | undefined>[0];
          return (
            <>
              <div className={styles.clickableInputContainer}>
                <Button
                  size={RVSizeProp.small}
                  fullWidth
                  noWrap
                  onClick={() => openModal({ user: row, modalContentType: 'passwordReset' })}
                >
                  <Trans ns="common" i18nKey="reset_password">
                    Reset
                  </Trans>
                </Button>
              </div>
            </>
          );
        },
      },
    ],
    [tempUserEditedFields, confidentialityLevels, JSON.stringify(usersListData)]
  );

  return {
    isLoading,
    searchText,
    setSearchText,
    searchInOnlineUsers,
    setSearchInOnlineUsers,
    searchInActiveUsers,
    setSearchInActiveUsers,
    usersTableColumns,
    usersListData,
    loadDataCallback,
    updateEditedData,
    setEditableItem,
    confidentialityLevels,
  };
};

export default useUserManagementAdminList;
