import clsx from 'clsx';
import { useCallback, useState } from 'react';
import { Scrollbar } from '../../Scrollbar';
import { Typography } from '../../Typography';
import styles from './TemplateSelectionPanel.module.scss';
import TemplateItems, {
  RVTemplateSelectionPanelTemplateItems,
} from './TemplateSelectionPanel-templateItems';
import TemplateSelectionPanelPreviewItems, {
  RVTemplateSelectionPanelPreviewItems,
} from './TemplateSelectionPanel-previewItems';
import { Button } from '../../Button';
import { RVColorProp, RVVariantProp } from '../../../types';

export interface RVTemplateSelectionPanel {
  /** callback to load template items */
  loadTemplateItems?: RVTemplateSelectionPanelTemplateItems['loadTemplateItems'];
  /** callback to load the preview items for the selected template */
  loadPreviewItems?: (
    templateId: string
  ) => Promise<RVTemplateSelectionPanelPreviewItems['previewItems']>;
  /** callback to return the selected template ids */
  onSubmit?: (selectedTemplates: string[]) => void;
}
const TemplateSelectionPanel = ({
  loadTemplateItems,
  loadPreviewItems,
  onSubmit,
}: RVTemplateSelectionPanel) => {
  const [previewLoadingSkeleton, setPreviewLoadingSkeleton] = useState<boolean>(false);
  const [previewTemplateID, setPreviewTemplateID] = useState<string>();
  const [selectedTemplates, setSelectedTemplates] = useState<string[]>([]);
  const [previewItems, setPreviewItems] = useState<
    | {
        type: 'text' | 'checkbox' | 'date' | 'radio';
        label: string;
      }[]
    | undefined
  >();

  const loadPreViewItemsCallback = useCallback(
    async (templateID: string) => {
      if (!loadPreviewItems) return;
      if (!templateID) return;
      setPreviewLoadingSkeleton(true);
      setPreviewTemplateID(templateID);
      const items = await loadPreviewItems(templateID);
      setPreviewItems(items);
      setPreviewLoadingSkeleton(false);
    },
    [previewItems, loadPreviewItems]
  );

  const toggleTemplateSelection = useCallback(() => {
    if (!previewTemplateID) return;
    const selectedTemplateIDs = [...selectedTemplates];
    if (selectedTemplateIDs.includes(previewTemplateID))
      setSelectedTemplates(
        selectedTemplateIDs.filter((id) => {
          return id !== previewTemplateID;
        })
      );
    else {
      selectedTemplateIDs.push(previewTemplateID);
      setSelectedTemplates(selectedTemplateIDs);
    }
    console.log(selectedTemplateIDs);
  }, [previewTemplateID, selectedTemplates]);

  return (
    <div className={clsx(styles.container)}>
      <div className={styles.templatesContainer}>
        <Typography type="H3" muted className={styles.templatesTitle}>
          Choose a template
        </Typography>
        <Scrollbar
          className={clsx(
            styles.templatesItemWrapper,
            selectedTemplates.length !== 0 && styles.withSelectedButton
          )}
        >
          {loadTemplateItems && (
            <TemplateItems
              loadTemplateItems={loadTemplateItems}
              onSelect={loadPreViewItemsCallback}
              selectedTemplates={selectedTemplates}
            />
          )}
        </Scrollbar>
        {selectedTemplates.length !== 0 && (
          <div className={styles.templatesButtonContainer}>
            <div>
              <Typography
                type="H6"
                color={RVColorProp.distant}
                className={styles.templatesCountLabel}
              >
                <span>Selected Templates</span>
                <span>{selectedTemplates.length}</span>
              </Typography>
            </div>
            <Button
              className={styles.templateActionButton}
              variant={RVVariantProp.primary}
              onClick={() => onSubmit && onSubmit(selectedTemplates)}
              fullWidth
            >
              Select Templates
            </Button>
          </div>
        )}
      </div>
      <div
        className={clsx(
          styles.previewContainer,
          !previewItems || previewItems.length === 0 ? styles.centeredContent : undefined
        )}
      >
        <TemplateSelectionPanelPreviewItems
          previewItems={previewItems}
          showSkeleton={previewLoadingSkeleton}
        />
        {!previewLoadingSkeleton && previewItems && previewItems?.length !== 0 && (
          <div>
            <Button
              className={styles.templateActionButton}
              variant={
                selectedTemplates.includes(previewTemplateID || '')
                  ? RVVariantProp.outline
                  : RVVariantProp.primary
              }
              onClick={toggleTemplateSelection}
            >
              {selectedTemplates.includes(previewTemplateID || '') ? (
                <>Add to selected</>
              ) : (
                <>Select Template</>
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TemplateSelectionPanel;
