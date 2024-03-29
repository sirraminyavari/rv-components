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

export interface RVTemplateSelectionPanelPreviewItems {
  previewItems?: {
    type: 'text' | 'checkbox' | 'date' | 'radio';
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
    <>
      <div>
        {!previewItems?.length && (
          <EmptyState
            IconComponent={ListCircleSvg}
            title="No fields to show!"
            description="Please choose a template with form fields"
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
            default:
              return null;
          }
        })}
      </div>
    </>
  );
};

export default TemplateSelectionPanelPreviewItems;

const LoadingState = () => {
  return (
    <div className={styles.LoadingPreviewContainer}>
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
