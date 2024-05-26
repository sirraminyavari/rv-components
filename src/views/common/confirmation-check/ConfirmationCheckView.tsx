import { FormEventHandler, FunctionComponent, ReactNode, useCallback, useState } from 'react';
import { Button, RVToast, Typography, ButtonGroup } from '../../../components';
import styles from './ConfirmationCheckView.module.scss';
import { RVColorProp, RVSizeProp, RVVariantProp } from '../../../types';
import { Trans } from 'react-i18next';
import { t } from 'i18next';
import { LoadingSvg } from '../../../icons';
import clsx from 'clsx';

export interface RVConfirmationCheckView {
  /** set the component color palette (default:RVColorProp.cgBlue) */
  color?: RVColorProp;
  /** on confirm callback */
  onConfirmCallback?: () => Promise<string | void> | void;
  /** on cancel callback */
  cancelCallback?: () => void;

  /** set the component to act as a inline component */
  fullWidth?: boolean;

  /** cancel button label (default:i18n-common-cancel) */
  confirmationLabel?: string;
  /** cancel button label (default:i18n-common-cancel) */
  cancelLabel?: ReactNode;
  /** confirm button label (default:i18n-common-confirm) */
  confirmLabel?: ReactNode;
}
const ConfirmationCheckView: FunctionComponent<RVConfirmationCheckView> = ({
  cancelCallback,
  onConfirmCallback,
  confirmationLabel,
  cancelLabel,
  confirmLabel,
  fullWidth,
  children,
  color = RVColorProp.cgBlue,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>();

  const onSubmit: FormEventHandler<HTMLFormElement> = useCallback(async (e) => {
    e.preventDefault();
    try {
      if (!onConfirmCallback) return;
      setIsLoading(true);
      await onConfirmCallback();
    } catch (error) {
      RVToast.error(
        (error as Error)?.message ||
          t('oporation_failed', {
            defaultValue: 'The oporation was not successful !',
            ns: 'common',
          })
      );
    }
    setIsLoading(false);
  }, []);
  return (
    <div className={clsx(styles.container)}>
      <form className={clsx(color, styles.form, fullWidth && styles.fullWidth)} onSubmit={onSubmit}>
        {confirmationLabel ? (
          <Typography className={styles.formDescription} type="H4">
            {confirmationLabel}
          </Typography>
        ) : null}

        {children}
        <ButtonGroup fullWidth>
          {cancelCallback && (
            <Button
              fullWidth
              color={RVColorProp.crayola}
              variant={RVVariantProp.white}
              size={RVSizeProp.medium}
              type="button"
              onClick={cancelCallback}
            >
              {cancelLabel || (
                <Trans ns="common" i18nKey="cancel">
                  Cancel
                </Trans>
              )}
            </Button>
          )}
          {onConfirmCallback && (
            <Button
              fullWidth
              color={color}
              variant={RVVariantProp.white}
              size={RVSizeProp.medium}
              type="submit"
              disabled={isLoading}
            >
              {confirmLabel || (
                <Trans ns="common" i18nKey="confirm">
                  Confirm
                </Trans>
              )}
              {isLoading && <LoadingSvg />}
            </Button>
          )}
        </ButtonGroup>
      </form>
    </div>
  );
};

export default ConfirmationCheckView;
