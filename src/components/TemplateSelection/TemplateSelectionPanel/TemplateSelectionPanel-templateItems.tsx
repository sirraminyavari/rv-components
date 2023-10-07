import { useCallback, useEffect, useState } from 'react';
import { RVSizeProp, RVVariantProp } from '../../../types';
import { Accordion } from '../../Accordion';
import { Avatar } from '../../Avatar';
import { Button } from '../../Button';
import { Typography } from '../../Typography';
import styles from './TemplateSelectionPanel.module.scss';

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
}

const TemplateSelectionPanelTemplateItems = ({
  loadTemplateItems,
  onSelect,
}: RVTemplateSelectionPanelTemplateItems) => {
  const [templates, setTemplates] = useState<
    Awaited<ReturnType<RVTemplateSelectionPanelTemplateItems['loadTemplateItems']>> | undefined
  >();
  useEffect(() => {
    (async () => {
      const allTemplates = await loadTemplateItems();
      console.log(allTemplates);

      setTemplates(allTemplates);
    })();
  }, [loadTemplateItems]);

  const generateTemplateItemTree = useCallback((templateItems?: TemplateDetails[]) => {
    if (templateItems === undefined) return <>no items</>;
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
                    <Avatar src={templateItem.avatarSrc} size={RVSizeProp.small} />
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
                    {avatarSrc && <Avatar src={avatarSrc} size={RVSizeProp.small} />}
                    <Typography type="H4" className={styles.templateButtonLabel}>
                      {title}
                    </Typography>
                  </Button>
                );
              })}
            </Accordion>
          </>
        );
      else
        return templateItems?.map(({ id, title, avatarSrc }) => {
          return (
            <Button
              key={`template-${id}`}
              variant={RVVariantProp.white}
              size={RVSizeProp.small}
              fullWidth
              className={styles.templateButton}
              onClick={() => onSelect && onSelect(id)}
            >
              {avatarSrc && <Avatar src={avatarSrc} size={RVSizeProp.small} />}
              <Typography type="H4" className={styles.templateButtonLabel}>
                {title}
              </Typography>
            </Button>
          );
        });
    });
  }, []);

  return <>{generateTemplateItemTree(templates)}</>;
};

export default TemplateSelectionPanelTemplateItems;
