import React, { useEffect, useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { CopyToClipboard as CopyToClipboardComponent, RVCopyToClipboard } from '.';
import { RVSizeProp, RVVariantProp } from '../../types';
import { ThemeBlock } from '../../storybookComponents';

export default {
  title: 'Components/CopyToClipboard',
  component: CopyToClipboardComponent,
  argTypes: { children: {} } as RVCopyToClipboard,
} as ComponentMeta<typeof CopyToClipboardComponent>;

const Template: ComponentStory<typeof CopyToClipboardComponent> = ({
  children = 'desired label',
  clipboardContext = 'Hotel Continental',
  color,
  variant,
  ...args
}) => {
  const [colorClass, setColorClass] = useState(color);
  useEffect(() => {
    setColorClass(color);
  }, [color]);
  return (
    <ThemeBlock onColorChange={setColorClass}>
      <CopyToClipboardComponent
        variant={variant || RVVariantProp.primary}
        color={colorClass}
        {...args}
      >
        {children}
      </CopyToClipboardComponent>
      <CopyToClipboardComponent
        variant={variant || RVVariantProp.outline}
        color={colorClass}
        {...args}
      >
        {children}
      </CopyToClipboardComponent>
      <CopyToClipboardComponent
        variant={variant || RVVariantProp.white}
        color={colorClass}
        {...args}
      >
        {children}
      </CopyToClipboardComponent>
    </ThemeBlock>
  );
};

export const ShowCase = ({
  children = 'desired label',
  clipboardContext = 'Hotel Continental',
  ...args
}) => (
  <CopyToClipboardComponent clipboardContext={clipboardContext} {...args}>
    {children}
  </CopyToClipboardComponent>
);

export const SmallSized = Template.bind({});
SmallSized.args = { size: RVSizeProp.small };

export const outlineIcon = Template.bind({});
outlineIcon.args = { copyIconOutline: true };

export const MediumSized = Template.bind({});
MediumSized.args = { size: RVSizeProp.medium };

export const LargeSized = Template.bind({});
LargeSized.args = { size: RVSizeProp.large };

export const disabled = Template.bind({});
disabled.args = { disabled: true };
