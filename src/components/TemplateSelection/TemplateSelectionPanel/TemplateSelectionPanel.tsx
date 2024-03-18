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
import { Trans } from 'react-i18next';

export interface RVTemplateSelectionPanel {
  /** callback to load template items */
  loadTemplateItems?: RVTemplateSelectionPanelTemplateItems['loadTemplateItems'];
  /** callback to load the preview items for the selected template */
  loadPreviewItems?: (
    templateId: string
  ) => Promise<RVTemplateSelectionPanelPreviewItems['previewItems']>;
  /** callback to return the selected template ids */
  onSubmit?: (selectedTemplates: string[]) => void;

  /** allow multiple templates to be selected (default:false) */
  multi?: boolean;
}
const TemplateSelectionPanel = ({
  loadTemplateItems,
  loadPreviewItems,
  onSubmit,
  multi,
}: RVTemplateSelectionPanel) => {
  const [previewLoadingSkeleton, setPreviewLoadingSkeleton] = useState<boolean>(false);
  const [isSubmitInProgress, setIsSubmitInProgress] = useState<boolean>(false);
  const [previewTemplateID, setPreviewTemplateID] = useState<string>();
  const [selectedTemplates, setSelectedTemplates] = useState<string[]>([]);
  const [previewItems, setPreviewItems] = useState<
    | {
        type: 'text' | 'numeric' | 'checkbox' | 'date' | 'radio';
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

  const toggleTemplateSelection = useCallback(async () => {
    if (!previewTemplateID) return;
    if (!multi) {
      if (onSubmit) {
        setIsSubmitInProgress(true);
        await onSubmit([previewTemplateID]);
        setIsSubmitInProgress(false);
      }
      return;
    }

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
  }, [previewTemplateID, selectedTemplates, multi, onSubmit]);

  return (
    <div className={clsx(styles.container)}>
      <div className={styles.templatesContainer}>
        <Typography type="H3" muted className={styles.templatesTitle}>
          <Trans ns="common" i18nKey="choose_template">
            Choose a template
          </Trans>
        </Typography>
        <Scrollbar
          className={clsx(
            styles.templatesItemWrapper,
            multi && selectedTemplates.length !== 0 && styles.withSelectedButton
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
        {multi && selectedTemplates.length !== 0 && (
          <div className={styles.templatesButtonContainer}>
            <div>
              <Typography
                type="H6"
                color={RVColorProp.distant}
                className={styles.templatesCountLabel}
              >
                <span>
                  <Trans ns="common" i18nKey="selected_templates">
                    Selected Templates
                  </Trans>
                </span>
                <span>{selectedTemplates.length}</span>
              </Typography>
            </div>
            <Button
              className={styles.templateActionButton}
              variant={RVVariantProp.primary}
              onClick={() => onSubmit && onSubmit(selectedTemplates)}
              fullWidth
              disabled={isSubmitInProgress}
            >
              {isSubmitInProgress ? (
                <Trans ns="common" i18nKey="submitting">
                  submitting ...
                </Trans>
              ) : (
                <Trans ns="common" i18nKey="select_templates">
                  Select Templates
                </Trans>
              )}
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
              disabled={isSubmitInProgress}
            >
              {multi ? (
                <>
                  {selectedTemplates.includes(previewTemplateID || '') ? (
                    <Trans ns="common" i18nKey="add_to_selected">
                      Add to selected
                    </Trans>
                  ) : (
                    <Trans ns="common" i18nKey="select_template">
                      Select Template
                    </Trans>
                  )}
                </>
              ) : (
                <>
                  {isSubmitInProgress ? (
                    <Trans ns="common" i18nKey="submitting">
                      submitting ...
                    </Trans>
                  ) : (
                    <Trans ns="common" i18nKey="select_templates">
                      Select Template
                    </Trans>
                  )}
                </>
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TemplateSelectionPanel;
