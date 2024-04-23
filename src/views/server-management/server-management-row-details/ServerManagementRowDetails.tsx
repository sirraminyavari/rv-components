import { RVColorProp, RVSizeProp, RVVariantProp } from '../../../types';
import styles from './ServerManagementRowDetails.module.scss';
import { Panel } from '../../../layouts/Panel';
import { CopyToClipboard, Modal, Skeleton, Typography } from '../../../components';
import clsx from 'clsx';
import { Trans } from 'react-i18next';

export interface RVServerManagementRowDetails {
  title: string;
  details?: Record<string, string | number | null>;
  onClose?: () => void;
  isOpen: boolean;
}

const ServerManagementRowDetails = ({
  title,
  details,
  onClose,
  isOpen,
}: RVServerManagementRowDetails) => {
  return (
    <Modal
      isOpen={isOpen}
      size={RVSizeProp.medium}
      shouldCloseOnEsc
      onRequestClose={onClose}
      style={{ content: { maxHeight: '80vh' } }}
    >
      <Panel title={title} size={RVSizeProp.medium} onClose={onClose}>
        {!details && <LoadingState />}
        {details &&
          Object.entries(details).map(([itemTitle, value = null], idx) =>
            itemTitle.toLowerCase().includes('json') ? (
              <div
                className={clsx(styles.detailsBlock, styles.jsonCodeBlock)}
                key={`ServerManagementRowDetails-${idx}`}
              >
                <Typography
                  type="p"
                  color={details.isError ? RVColorProp.crayola : RVColorProp.cgBlue}
                  className={styles.detailsLabel}
                  muted={value === null}
                >
                  {itemTitle === 'serverJsonResult' ? (
                    <Trans ns="common" i18nKey="raw_result"></Trans>
                  ) : (
                    itemTitle
                  )}
                </Typography>
                {value !== null ? (
                  <CopyToClipboard
                    copyIconOutline
                    variant={RVVariantProp.white}
                    color={details.isError ? RVColorProp.crayola : RVColorProp.cgBlue}
                    clipboardContext={String(value)}
                    className={clsx(styles.detailsValueContainer)}
                  >
                    <div className={clsx(styles.detailsValue)}>
                      <pre dir="ltr">
                        <code>{JSON.stringify(JSON.parse((value as string) || ''), null, 2)}</code>
                      </pre>
                    </div>
                  </CopyToClipboard>
                ) : (
                  <Typography type="H4" className={styles.emptyDetailsLabel} muted>
                    -
                  </Typography>
                )}
              </div>
            ) : (
              <div className={styles.detailsBlock} key={`ServerManagementRowDetails-${idx}`}>
                <Typography
                  type="p"
                  color={RVColorProp.gray}
                  className={styles.detailsLabel}
                  muted={value === null}
                >
                  {itemTitle}
                </Typography>
                {value !== null ? (
                  <CopyToClipboard
                    copyIconOutline
                    variant={RVVariantProp.white}
                    clipboardContext={String(value)}
                    className={styles.detailsValueContainer}
                  >
                    <Typography type="H4" className={styles.detailsValue}>
                      {value}
                    </Typography>
                  </CopyToClipboard>
                ) : (
                  <Typography type="H4" className={styles.emptyDetailsLabel} muted>
                    -
                  </Typography>
                )}
              </div>
            )
          )}
      </Panel>
    </Modal>
  );
};

export default ServerManagementRowDetails;

const LoadingState = () => {
  return (
    <div>
      {new Array(6).fill(0).map((_, idx) => {
        return (
          <div key={`loading-state-skeleton-${idx}`} className={styles.loadingStateContainer}>
            <Skeleton
              key={`preview-items-loading-state-${idx}`}
              inline
              className={styles.loadingStateLabel}
            />
            <div className={styles.loadingStateCopyContainer}>
              <Skeleton key={`preview-items-loading-state-${idx}`} inline />
            </div>
          </div>
        );
      })}
    </div>
  );
};
