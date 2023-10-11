import clsx from 'clsx';
import { VoidFunctionComponent, useCallback, useState } from 'react';
import { Scrollbar } from '../../Scrollbar';
import { Typography } from '../../Typography';
import styles from './TemplateSelectionPanel.module.scss';
import TemplateItems, {
  RVTemplateSelectionPanelTemplateItems,
} from './TemplateSelectionPanel-templateItems';
import TemplateSelectionPanelPreviewItems, {
  RVTemplateSelectionPanelPreviewItems,
} from './TemplateSelectionPanel-previewItems';

export interface RVTemplateSelectionPanel {
  loadTemplateItems?: RVTemplateSelectionPanelTemplateItems['loadTemplateItems'];
  loadPreviewItems?: (
    templateId: string
  ) => Promise<RVTemplateSelectionPanelPreviewItems['previewItems']>;
}
const TemplateSelectionPanel: VoidFunctionComponent<RVTemplateSelectionPanel> = ({
  loadTemplateItems,
  loadPreviewItems,
}) => {
  const [previewLoadingSkeleton, setPreviewLoadingSkeleton] = useState<boolean>(false);
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
      setPreviewLoadingSkeleton(true);
      const items = await loadPreviewItems(templateID);
      setPreviewItems(items);
      setPreviewLoadingSkeleton(false);
    },
    [previewItems, loadPreviewItems]
  );

  return (
    <div className={clsx(styles.container)}>
      <div className={styles.templatesContainer}>
        <Typography type="H3" muted className={styles.templatesTitle}>
          Choose a template
        </Typography>
        <Scrollbar className={styles.templatesItemWrapper}>
          {loadTemplateItems && (
            <TemplateItems
              loadTemplateItems={loadTemplateItems}
              onSelect={loadPreViewItemsCallback}
            />
          )}
        </Scrollbar>
      </div>
      <div className={styles.previewContainer}>
        <TemplateSelectionPanelPreviewItems
          previewItems={previewItems}
          showSkeleton={previewLoadingSkeleton}
        />
      </div>
    </div>
  );
};

export default TemplateSelectionPanel;
