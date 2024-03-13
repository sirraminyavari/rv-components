import { useCallback, useEffect, useState } from 'react';
import { RVSizeProp, RVVariantProp } from '../../../types';
import { Accordion } from '../../Accordion';
import { Avatar } from '../../Avatar';
import { Button } from '../../Button';
import { Skeleton } from '../../Skeleton';
import { Typography } from '../../Typography';
import styles from './TemplateSelectionPanel.module.scss';
import clsx from 'clsx';

type TemplateDetails = {
  id: string;
  title: string;
  avatarSrc: string;
  childTemplates?: {
    id: string;
    title: string;
    avatarSrc: string;
    childTemplates?: TemplateDetails[];
  }[];
};

export interface RVTemplateSelectionPanelTemplateItems {
  onSelect?: (templateID: string) => void;
  loadTemplateItems: () => Promise<TemplateDetails[]>;
  selectedTemplates: string[];
}

const TemplateSelectionPanelTemplateItems = ({
  loadTemplateItems,
  selectedTemplates,
  onSelect,
}: RVTemplateSelectionPanelTemplateItems) => {
  const [templatesLoadingSkeleton, setTemplatesLoadingSkeleton] = useState<boolean>(false);
  const [templates, setTemplates] = useState<
    Awaited<ReturnType<RVTemplateSelectionPanelTemplateItems['loadTemplateItems']>>
  >([]);
  useEffect(() => {
    (async () => {
      if (!loadTemplateItems) return;
      if (templatesLoadingSkeleton) return;
      setTemplatesLoadingSkeleton(true);
      const allTemplates = await loadTemplateItems();

      setTemplates((prev) => (prev.length ? prev : allTemplates));
      setTemplatesLoadingSkeleton(false);
    })();
  }, []);

  const generateTemplateItemTree = useCallback((templateItems?: TemplateDetails[]) => {
    if (templateItems === undefined) return <>no items</>;
    if (templateItems.length === 0) return <></>;

    return templateItems.map((templateItem) => {
      if (templateItem.childTemplates)
        return (
          <>
            <Accordion
              key={`template-${templateItem.id}`}
              id={`template-${templateItem.id}`}
              label={
                <Typography
                  type="H4"
                  className={styles.accordionLabelTitle}
                  onClick={() => onSelect && onSelect(templateItem.id)}
                >
                  {templateItem?.avatarSrc && (
                    <Avatar
                      className={styles.accordionLabelAvatar}
                      src={templateItem.avatarSrc}
                      size={RVSizeProp.small}
                      variant={RVVariantProp.outline}
                    />
                  )}
                  <span>{templateItem.title}</span>
                </Typography>
              }
              labelClassName={styles.accordionLabelButton}
              contentClassName={styles.accordionContent}
            >
              {templateItem.childTemplates?.map(({ id, title, avatarSrc, childTemplates }) => {
                if (childTemplates)
                  return generateTemplateItemTree([{ id, title, avatarSrc, childTemplates }]);

                return (
                  <Button
                    key={`child-template-${id}`}
                    variant={RVVariantProp.white}
                    size={RVSizeProp.small}
                    fullWidth
                    className={styles.templateButton}
                    onClick={() => onSelect && onSelect(id)}
                  >
                    {avatarSrc && (
                      <Avatar
                        src={avatarSrc}
                        size={RVSizeProp.small}
                        className={styles.accordionLabelAvatar}
                        variant={RVVariantProp.outline}
                      />
                    )}
                    <Typography
                      type="H4"
                      className={clsx(
                        styles.templateButtonLabel,
                        selectedTemplates.includes(id) && styles.templateButtonActiveLabel
                      )}
                    >
                      {title}
                    </Typography>
                  </Button>
                );
              })}
            </Accordion>
          </>
        );
      else
        return (
          <Button
            key={`template-${templateItem.id}`}
            variant={RVVariantProp.white}
            size={RVSizeProp.small}
            fullWidth
            className={styles.templateButton}
            onClick={() => onSelect && onSelect(templateItem.id)}
          >
            {templateItem.avatarSrc && (
              <Avatar src={templateItem.avatarSrc} size={RVSizeProp.small} />
            )}
            <Typography
              type="H4"
              className={clsx(
                styles.templateButtonLabel,
                selectedTemplates.includes(templateItem.id) && styles.templateButtonActiveLabel
              )}
            >
              {templateItem.title}
            </Typography>
          </Button>
        );
    });
  }, []);

  return templatesLoadingSkeleton ? <LoadingState /> : <>{generateTemplateItemTree(templates)}</>;
};

export default TemplateSelectionPanelTemplateItems;

const LoadingState = () => {
  return (
    <div className={styles.LoadingTemplateContainer}>
      <Skeleton className={styles.loadingStateLabel} />
      <Skeleton className={styles.loadingStateLabel} />
      <Skeleton className={styles.loadingStateLabel} />
      <Skeleton className={clsx(styles.loadingStateLabel, styles.loadingStateIndentedLabel)} />
      <Skeleton className={clsx(styles.loadingStateLabel, styles.loadingStateIndentedLabel)} />
      <Skeleton className={styles.loadingStateLabel} />
    </div>
  );
};
