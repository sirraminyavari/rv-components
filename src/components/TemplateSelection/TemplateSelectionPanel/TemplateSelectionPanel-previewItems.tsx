import clsx from 'clsx';
import { VoidFunctionComponent } from 'react';
import ListCircleSvg from '../../../icons/listCircle.svg';
import RadioButtonSvg from '../../../icons/radioButton.svg';
import PenSvg from '../../../icons/pen.svg';
import CheckboxSvg from '../../../icons/checkbox.svg';
import CalendarSvg from '../../../icons/calendar.svg';
import { RVColorProp } from '../../../types';
import { Typography } from '../../Typography';
import styles from './TemplateSelectionPanel.module.scss';
import { Skeleton } from '../../Skeleton';
import EmptyState from '../../../layouts/EmptyState/EmptyState';
import { NumericSvg } from '../../../icons';
import { t } from 'i18next';

export interface RVTemplateSelectionPanelPreviewItems {
  previewItems?: {
    type: 'text' | 'checkbox' | 'date' | 'radio' | 'numeric';
    label: string;
  }[];
  showSkeleton?: boolean;
}

const TemplateSelectionPanelPreviewItems: VoidFunctionComponent<
  RVTemplateSelectionPanelPreviewItems
> = ({ previewItems, showSkeleton }) => {
  return showSkeleton ? (
    <LoadingState />
  ) : (
    <div className={styles.templatesPreviewWrapper}>
      {!previewItems?.length && (
        <EmptyState
          IconComponent={ListCircleSvg}
          title={t('template_selection_empty_state_title', {
            defaultValue: 'No fields to show!',
            ns: 'common',
          })}
          description={t('template_selection_empty_state_description', {
            defaultValue: 'Please choose a template with form fields',
            ns: 'common',
          })}
        />
      )}
      {previewItems?.map(({ type, label }, idx) => {
        switch (type) {
          case 'radio':
            return (
              <Typography
                key={`preview-item-type-${idx}`}
                type="H4"
                className={styles.previewNodeItem}
                color={RVColorProp.gray}
              >
                <RadioButtonSvg className={styles.previewIcon} />
                {label}
              </Typography>
            );
          case 'checkbox':
            return (
              <Typography
                key={`preview-item-type-${idx}`}
                type="H4"
                className={styles.previewNodeItem}
                color={RVColorProp.gray}
              >
                <CheckboxSvg className={styles.previewIcon} />
                {label}
              </Typography>
            );
          case 'date':
            return (
              <>
                <Typography
                  key={`preview-item-type-${idx}`}
                  type="H4"
                  className={styles.previewNodeItem}
                  color={RVColorProp.gray}
                >
                  <CalendarSvg className={clsx(RVColorProp.gray, styles.previewIcon)} />
                  {label}
                </Typography>
              </>
            );
          case 'text':
            return (
              <>
                <Typography
                  key={`preview-item-type-${idx}`}
                  type="H4"
                  className={styles.previewNodeItem}
                  color={RVColorProp.gray}
                >
                  <PenSvg className={styles.previewIcon} />
                  {label}
                </Typography>
              </>
            );
          case 'numeric':
            return (
              <>
                <Typography
                  key={`preview-item-type-${idx}`}
                  type="H4"
                  className={styles.previewNodeItem}
                  color={RVColorProp.gray}
                >
                  <NumericSvg className={styles.previewIcon} />
                  {label}
                </Typography>
              </>
            );
          default:
            return null;
        }
      })}
    </div>
  );
};

export default TemplateSelectionPanelPreviewItems;

const LoadingState = () => {
  return (
    <div className={clsx(styles.LoadingPreviewContainer)}>
      {new Array(4).fill(0).map((_, idx) => {
        return (
          <Skeleton
            key={`preview-items-loading-state-${idx}`}
            inline
            wrapper={({ children }) => (
              <>
                <Typography type="H4" className={styles.loadingStateLabel} color={RVColorProp.gray}>
                  <Skeleton className={styles.loadingStateIcon} />
                  {children}
                </Typography>
              </>
            )}
          />
        );
      })}
    </div>
  );
};
