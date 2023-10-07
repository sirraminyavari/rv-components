import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { getRandomInt } from '../../utils';
import { TemplateSelectionPanel, RVTemplateSelectionPanel } from '.';

export default {
  title: 'Layouts/TemplateSelectionPanel',
  component: TemplateSelectionPanel,
  argTypes: {} as RVTemplateSelectionPanel,
} as ComponentMeta<typeof TemplateSelectionPanel>;

const templatesCallback: RVTemplateSelectionPanel['loadTemplateItems'] = async () => {
  await new Promise((res) => setTimeout(res, 1000));
  return new Array(10).fill(0).map((_, idx) => {
    return {
      id: `parent-${idx}`,
      avatarSrc: 'https://i.pravatar.cc/300?img=' + idx,
      title: `template no.${idx}`,
      childTemplates: [
        {
          id: `child-${idx}-1`,
          avatarSrc: 'https://i.pravatar.cc/300?img=' + (idx + 1),
          title: `child no.${idx}-1`,
        },
        {
          id: `child-${idx}-2`,
          avatarSrc: 'https://i.pravatar.cc/300?img=' + (idx + 3),
          title: `child no.${idx}-2`,
        },
      ],
    };
  });
};
const templatesPreviewCallback: RVTemplateSelectionPanel['loadPreviewItems'] = async (
  templateID: string
) => {
  await new Promise((res) => setTimeout(res, 500));
  if (getRandomInt() % 2)
    return [
      {
        type: 'text',
        label: `template no. ${templateID} text input`,
      },
      {
        type: 'checkbox',
        label: `template no. ${templateID} checkbox input`,
      },
      {
        type: 'date',
        label: `template no. ${templateID} date input`,
      },
      {
        type: 'radio',
        label: `template no. ${templateID} radio input`,
      },
    ];
  else return [];
};

export const ShowCase: ComponentStory<typeof TemplateSelectionPanel> = ({
  loadTemplateItems = templatesCallback,
  loadPreviewItems = templatesPreviewCallback,
}) => {
  return (
    <div style={{ height: '60vh' }}>
      <TemplateSelectionPanel
        loadTemplateItems={loadTemplateItems}
        loadPreviewItems={loadPreviewItems}
      />
    </div>
  );
};
