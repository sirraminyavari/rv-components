import PlusCircleSvg from '../../../icons/plusCircle.svg';
import styles from './ServerManagementAdminNewServer.module.scss';
import clsx from 'clsx';
import { Button, RVTextInput, Scrollbar, TextInput, Typography } from '../../../components';
import { RVColorProp, RVVariantProp } from '../../../types';
import { FormEventHandler, useState } from 'react';

interface ServerEntity {
  title: string;
  url: string;
  port: string;
  username: string;
  password: string;
}

export interface RVServerManagementAdminNewServer {
  modalView?: boolean;
  onSubmitCallback: (newServer: ServerEntity) => void;
}

const ServerManagementAdminNewServer = ({
  modalView,
  onSubmitCallback,
}: RVServerManagementAdminNewServer) => {
  const [newServerData, setNewServerData] = useState<ServerEntity>({
    password: '',
    username: '',
    title: '',
    url: '',
    port: '',
  });
  const onInputChange: RVTextInput['onChange'] = (e) => {
    setNewServerData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const onFormSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    onSubmitCallback(newServerData);
  };
  return (
    <Scrollbar
      className={styles.scrollbarContainer}
      contentContainerClassName={clsx(styles.container)}
      asPanel={modalView}
    >
      <PlusCircleSvg outline className={clsx(RVColorProp.gray, styles.icon)} />
      <Typography type="H1" color={RVColorProp.gray}>
        New server
      </Typography>
      <form onSubmit={onFormSubmit}>
        <div className={styles.titleInputBlock}>
          <TextInput
            fullWidth
            color={RVColorProp.cgBlue}
            variant={RVVariantProp.outline}
            name="title"
            label="Title*"
            onChange={onInputChange}
            required
          />
        </div>
        <div className={styles.inputBlock}>
          <TextInput
            fullWidth
            color={RVColorProp.cgBlue}
            variant={RVVariantProp.outline}
            name="url"
            label="URL*"
            type="url"
            onChange={onInputChange}
            required
          />
          <TextInput
            fullWidth
            color={RVColorProp.cgBlue}
            variant={RVVariantProp.outline}
            name="port"
            label="Port*"
            type="number"
            min={0}
            max={999999}
            step={1}
            onChange={onInputChange}
            required
          />
        </div>
        <div className={styles.inputBlock}>
          <TextInput
            fullWidth
            color={RVColorProp.cgBlue}
            variant={RVVariantProp.outline}
            onChange={onInputChange}
            name="username"
            label="Username"
          />
          <TextInput
            fullWidth
            color={RVColorProp.cgBlue}
            variant={RVVariantProp.outline}
            onChange={onInputChange}
            name="password"
            label="Password"
            type="password"
          />
        </div>
        <div className={styles.actionContainer}>
          <Button type="submit" fullWidth>
            Add new server
          </Button>
        </div>
      </form>
    </Scrollbar>
  );
};

export default ServerManagementAdminNewServer;
