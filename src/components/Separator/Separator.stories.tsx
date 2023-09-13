import React, { useEffect, useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Separator as SeparatorComponent, RVSeparator } from '.';
import { ThemeBlock } from '../../storybookComponents';
import { RVSizeProp, RVVariantProp } from '../../types';

export default {
  title: 'Components/Separator',
  component: SeparatorComponent,
  argTypes: {
    children: { control: 'text' },
  } as RVSeparator,
} as ComponentMeta<typeof SeparatorComponent>;

const Template: ComponentStory<typeof SeparatorComponent> = ({
  children = 'Separator',
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
      <div>
        <SeparatorComponent variant={variant || RVVariantProp.primary} color={colorClass} {...args}>
          {children}
        </SeparatorComponent>
      </div>
      <div>
        <SeparatorComponent variant={variant || RVVariantProp.outline} color={colorClass} {...args}>
          {children}
        </SeparatorComponent>
      </div>
      <div>
        <SeparatorComponent variant={variant || RVVariantProp.white} color={colorClass} {...args}>
          {children}
        </SeparatorComponent>
      </div>
      <div>
        <SeparatorComponent
          variant={variant || RVVariantProp.disabled}
          color={colorClass}
          {...args}
        >
          {children}
        </SeparatorComponent>
      </div>
    </ThemeBlock>
  );
};

export const ShowCase = ({ children = 'SEPARATOR', ...args }) => {
  return (
    <>
      <SeparatorComponent {...args}>{children}</SeparatorComponent>
    </>
  );
};

export const withoutLabel = Template.bind({});
withoutLabel.args = { children: '' };

export const SmallSized = Template.bind({});
SmallSized.args = { size: RVSizeProp.small };

export const MediumSized = Template.bind({});
MediumSized.args = { size: RVSizeProp.medium };

export const LargeSized = Template.bind({});
LargeSized.args = { size: RVSizeProp.large };
