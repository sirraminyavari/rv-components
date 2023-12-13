import React, { useEffect, useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { RowItem as RowItemComponent, RVRowItem } from '.';
import HomeSvg from '../../icons/home.svg';
import { RVSizeProp, RVVariantProp } from '../../types';
import { ThemeBlock } from '../../storybookComponents';
import { Button } from '../../components/Button';

export default {
  title: 'Layouts/RowItem',
  component: RowItemComponent,
  argTypes: {} as RVRowItem,
} as ComponentMeta<typeof RowItemComponent>;

const Template: ComponentStory<typeof RowItemComponent> = ({
  color,
  variant,
  children = 'Find faculty mentor',
  size = RVSizeProp.large,
  ...args
}) => {
  const [colorClass, setColorClass] = useState(color);
  useEffect(() => {
    setColorClass(color);
  }, [color]);

  return (
    <ThemeBlock onColorChange={setColorClass}>
      <div>
        <RowItemComponent
          variant={variant || RVVariantProp.primary}
          color={colorClass}
          size={size}
          {...args}
        >
          {children}
        </RowItemComponent>
      </div>
      <div>
        <RowItemComponent
          variant={variant || RVVariantProp.outline}
          color={colorClass}
          size={size}
          {...args}
        >
          {children}
        </RowItemComponent>
      </div>
      <div>
        <RowItemComponent
          variant={variant || RVVariantProp.white}
          color={colorClass}
          size={size}
          {...args}
        >
          {children}
        </RowItemComponent>
      </div>
      <div>
        <RowItemComponent
          variant={variant || RVVariantProp.disabled}
          color={colorClass}
          size={size}
          {...args}
        >
          {children}
        </RowItemComponent>
      </div>
    </ThemeBlock>
  );
};
export const ShowCase: ComponentStory<typeof RowItemComponent> = (args) => (
  <RowItemComponent
    ActionsComponent={
      <Button color={args.color} variant={args.variant} size={RVSizeProp.small}>
        add
      </Button>
    }
    {...args}
  >
    <HomeSvg />
    Find faculty mentor
  </RowItemComponent>
);

export const RowItem = Template.bind({});

export const SmallSized = Template.bind({});
SmallSized.args = { size: RVSizeProp.small };

export const MediumSized = Template.bind({});
MediumSized.args = { size: RVSizeProp.medium };

export const LargeSized = Template.bind({});
LargeSized.args = { size: RVSizeProp.large };

export const RoundedHalf = Template.bind({});
RoundedHalf.args = { rounded: 'half' };

export const RoundedFull = Template.bind({});
RoundedFull.args = { rounded: 'full' };

export const clickable = Template.bind({});
clickable.args = { clickable: true };

// export const disabled = Template.bind({});
// disabled.args = { variant: 'disabled' };
