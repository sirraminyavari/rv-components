import { FunctionComponent, useState } from 'react';
import { Breadcrumb, Button, Switch, Table, TextInput } from '../../../components';
import { RVColorProp, RVSizeProp, RVVariantProp } from '../../../types';
import { PlusSvg, SearchSvg, peopleSvg } from '../../../icons';
import { t } from 'i18next';
import { Trans } from 'react-i18next';
import styles from './UserManagementAdminList.module.scss';
import useUserManagementAdminList from './useUserManagementAdminList';
import UserManagementAdminListModal from './user-management-admin-list-panels/UserManagementAdminListModal';
import UserManagementAdminListCreateUserPanel from './user-management-admin-list-panels/UserManagementAdminListCreateUserPanel';
import UserManagementAdminListRolePanel from './user-management-admin-list-panels/UserManagementAdminListRolePanel';
import UserManagementAdminListResetPasswordPanel from './user-management-admin-list-panels/UserManagementAdminListResetPasswordPanel';
import { useDebounce } from 'use-debounce';
import UserManagementAdminListConfidentialityPanel from './user-management-admin-list-panels/UserManagementAdminListConfidentialityPanel';

export interface RVUserManagementAdminList {
  usersCountPerPage?: number;
  loadAllUsersDataCallback: (data: {
    SearchText?: string;
    IsOnline?: boolean;
    IsApproved?: boolean;
    LockedStatus?: boolean;
    ApprovedStatus?: boolean;
    SystemAdminStatus?: boolean;
    Confidentiality?: boolean;
    LowerBoundary: number;
    Count: number;
  }) => Promise<{
    AppID: string;
    ConfidentialitiesEditable: boolean;
    SystemAdminsEditable: boolean;
    TotalCount: number;
    Users: {
      UserID: string;
      UserName: string;
      FirstName: string;
      LastName: string;
      ImageURL?: string;
      ProfileImageURL?: string;
      LastActivityTime: Date;
      IsApproved: boolean;
      IsLockedOut: boolean;
      IsSystemAdmin: boolean;
      Confidentiality?: {
        ID: string;
        ConfidentialityID: string;
        LevelID: string;
        Title: string;
      };
    }[];
  }>;
  updateUserDataCallback: (data: {
    UserID: string;
    FirstName?: string;
    LastName?: string;
    UserName?: string;
    Confidentiality?: string;
    SetUserRole?: string;
  }) => Promise<boolean>;
  loadConfidentialityLevelsCallback: () => Promise<{
    Levels: {
      ConfidentialityID: string;
      ID: string;
      LevelID: string;
      Title: string;
    }[];
  }>;
  createNewUserCallback: (data: {
    UserName?: string;
    FirstName?: string;
    LastName?: string;
    IsSystemAdmin?: boolean;
    confidentialityLevelID?: string;
  }) => Promise<{ status: boolean; message?: string }>;

  updateUserApprovalCallback: (data: { UserID: string; IsApproved: boolean }) => Promise<boolean>;
  unblockUserCallback: (data: { UserID: string }) => Promise<boolean>;
  updateUserAdminStatusCallback: (data: {
    UserID: string;
    IsSetToBeAdmin: boolean;
  }) => Promise<boolean>;
  setUserRandomPasswordCallback: (data: { UserID: string }) => Promise<{ Password: string }>;
}

export type RVUserManagementAdminListUserEntity = Awaited<
  ReturnType<RVUserManagementAdminList['loadAllUsersDataCallback']>
>['Users'][0];
const UserManagementAdminList: FunctionComponent<RVUserManagementAdminList> = ({
  loadAllUsersDataCallback,
  updateUserDataCallback,
  loadConfidentialityLevelsCallback,
  createNewUserCallback,
  updateUserApprovalCallback,
  updateUserAdminStatusCallback,
  setUserRandomPasswordCallback,
  unblockUserCallback,
  usersCountPerPage = 10,
}) => {
  const [loadAllUsersDataDebouncedCallback] = useDebounce(loadAllUsersDataCallback, 700, {
    leading: true,
  });

  const [modalStatus, setModalStatus] = useState(false);
  const [modalContent, setModalContent] = useState<{
    user?: RVUserManagementAdminListUserEntity;
    modalContentType?: 'newUser' | 'roleChange' | 'passwordReset' | 'confidentialityChange';
  }>({});
  const openModal = (modalData: typeof modalContent = {}) => {
    setModalStatus(true);
    setModalContent(modalData);
  };
  const closeModal = () => {
    setModalStatus(false);
    setModalContent({});
  };
  const {
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
    confidentialityLevels,
  } = useUserManagementAdminList({
    openModal,
    closeModal,
    loadAllUsersDataCallback: loadAllUsersDataDebouncedCallback as typeof loadAllUsersDataCallback,
    updateUserDataCallback,
    usersCountPerPage,
    loadConfidentialityLevelsCallback,
    updateUserApprovalCallback,
    createNewUserCallback,
    updateUserAdminStatusCallback,
    setUserRandomPasswordCallback,
    unblockUserCallback,
  });

  return (
    <>
      <div className={styles.headerContainer}>
        <Breadcrumb
          Icon={peopleSvg}
          variant={RVVariantProp.white}
          size={RVSizeProp.medium}
          routeLinks={[
            {
              label: t('all_users', {
                defaultValue: 'All Users',
                ns: 'common',
              }),
              path: '',
            },
          ]}
        />
        <Button size={RVSizeProp.small} onClick={() => openModal({ modalContentType: 'newUser' })}>
          <PlusSvg />
          <Trans ns="user-management" i18nKey="create_new_user">
            Create New User
          </Trans>
        </Button>
      </div>
      <div className={styles.searchInputContainer}>
        <TextInput
          label={t('all_users_search_placeholder', {
            defaultValue: 'Search through all users',
            ns: 'user_management_list',
          })}
          className={styles.searchInput}
          variant={RVVariantProp.outline}
          Icon={SearchSvg}
          color={RVColorProp.distant}
          onChange={(e) => setSearchText(e.target.value)}
          value={searchText}
          fullWidth
        />
        <Switch
          variant={RVVariantProp.white}
          id="search_online_users"
          label={t('online_users', {
            defaultValue: 'Online Users',
            ns: 'user_management_list',
          })}
          onChange={(e) => setSearchInOnlineUsers(e.target.checked)}
          checked={searchInOnlineUsers}
        />
        <Switch
          variant={RVVariantProp.white}
          id="search_active_users"
          label={t('active_users', {
            defaultValue: 'Active Users',
            ns: 'user_management_list',
          })}
          onChange={(e) => {
            setSearchInActiveUsers(e.target.checked);
          }}
          checked={searchInActiveUsers}
        />
      </div>

      <Table
        className={styles.tableContainer}
        columns={usersTableColumns}
        rowsData={usersListData || []}
        variant={RVVariantProp.white}
        tableHeight={'70dvh'}
        onBottomReachedCallback={async () => {
          loadDataCallback && loadDataCallback();
        }}
        disableInfiniteScroll={isLoading}
        showSkeleton={isLoading}
        fixedColumn={['Full Name', 'Username']}
        overScan={5}
      />
      <UserManagementAdminListModal modalStatus={modalStatus} closeCallback={closeModal}>
        {modalContent.modalContentType === 'confidentialityChange' && (
          <UserManagementAdminListConfidentialityPanel
            closeModalCallback={closeModal}
            confidentialityLevels={confidentialityLevels}
            updateUserDataCallback={updateUserDataCallback}
            user={modalContent.user!}
          />
        )}
        {modalContent.modalContentType === 'newUser' && (
          <UserManagementAdminListCreateUserPanel
            closeModalCallback={closeModal}
            confidentialityLevels={confidentialityLevels}
            createNewUserCallback={createNewUserCallback}
          />
        )}
        {modalContent.modalContentType === 'roleChange' && (
          <UserManagementAdminListRolePanel
            closeModalCallback={closeModal}
            user={modalContent.user!}
            updateUserAdminStatusCallback={updateUserAdminStatusCallback}
          />
        )}
        {modalContent.modalContentType === 'passwordReset' && (
          <UserManagementAdminListResetPasswordPanel
            closeModalCallback={closeModal}
            user={modalContent.user!}
            setUserRandomPasswordCallback={setUserRandomPasswordCallback}
          />
        )}
      </UserManagementAdminListModal>
    </>
  );
};

export default UserManagementAdminList;
