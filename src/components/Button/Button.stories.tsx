import React, { useEffect, useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Button as ButtonComponent, RVButton } from '.';
import { ButtonGroup as ButtonGroupComponent, RVButtonGroup } from '../ButtonGroup';
import { ThemeBlock } from '../../storybookComponents';
import HomeSvg from '../../icons/home.svg';
import { RVSizeProp, RVVariantProp } from '../../types';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/Button',
  component: ButtonComponent,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    children: { control: 'text' },
  } as RVButton,
  decorators: [],
} as ComponentMeta<typeof ButtonComponent>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ButtonComponent> = ({
  children = 'Button',
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
        <ButtonComponent variant={variant || RVVariantProp.primary} color={colorClass} {...args}>
          {children}
        </ButtonComponent>
      </div>
      <div>
        <ButtonComponent variant={variant || RVVariantProp.outline} color={colorClass} {...args}>
          {children}
        </ButtonComponent>
      </div>
      <div>
        <ButtonComponent variant={variant || RVVariantProp.white} color={colorClass} {...args}>
          {children}
        </ButtonComponent>
      </div>
      <div>
        <ButtonComponent variant={variant || RVVariantProp.disabled} color={colorClass} {...args}>
          {children}
        </ButtonComponent>
      </div>
    </ThemeBlock>
  );
};

// More on args: https://storybook.js.org/docs/react/writing-stories/args
export const ShowCase = ({ children = 'Button', color, variant, ...args }) => {
  return (
    <ButtonComponent variant={variant} color={color} {...args}>
      {children}
    </ButtonComponent>
  );
};

export const SudoHover = Template.bind({});
SudoHover.args = { sudoAction: 'hover' };

export const SudoFocus = Template.bind({});
SudoFocus.args = { sudoAction: 'focus' };

export const SudoActive = Template.bind({});
SudoActive.args = { sudoAction: 'active' };

export const activeState = Template.bind({});
activeState.args = { active: true };

export const badge = Template.bind({});
badge.args = { badge: true };

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

export const fullCircle = Template.bind({});
fullCircle.args = {
  fullCircle: true,
  children: <HomeSvg />,
};
export const withIcon = Template.bind({});
withIcon.args = {
  children: (
    <>
      <HomeSvg />
      custom icon
    </>
  ),
};
export const Stacked = ({
  children = 'some content',
  color,
  variant,
  rounded,
  size = RVSizeProp.small,
  ...args
}) => {
  const [colorClass, setColorClass] = useState(color);
  useEffect(() => {
    setColorClass(color);
  }, [color]);

  return (
    <ThemeBlock onColorChange={setColorClass}>
      <ButtonGroupComponent rounded={rounded}>
        <ButtonComponent
          variant={variant || RVVariantProp.primary}
          color={colorClass}
          size={size}
          {...args}
        >
          <HomeSvg />
          {children}
        </ButtonComponent>
        <ButtonComponent
          variant={variant || RVVariantProp.primary}
          color={colorClass}
          size={size}
          {...args}
        >
          <HomeSvg />
        </ButtonComponent>
      </ButtonGroupComponent>
      <ButtonGroupComponent rounded={rounded}>
        <ButtonComponent
          variant={variant || RVVariantProp.outline}
          color={colorClass}
          size={size}
          {...args}
        >
          <HomeSvg />
          {children}
        </ButtonComponent>
        <ButtonComponent
          variant={variant || RVVariantProp.outline}
          color={colorClass}
          size={size}
          {...args}
        >
          <HomeSvg />
        </ButtonComponent>
      </ButtonGroupComponent>
      <ButtonGroupComponent rounded={rounded}>
        <ButtonComponent
          variant={variant || RVVariantProp.white}
          color={colorClass}
          size={size}
          {...args}
        >
          <HomeSvg />
          {children}
        </ButtonComponent>
        <ButtonComponent
          variant={variant || RVVariantProp.white}
          color={colorClass}
          size={size}
          {...args}
        >
          <HomeSvg />
        </ButtonComponent>
      </ButtonGroupComponent>
      <ButtonGroupComponent rounded={rounded}>
        <ButtonComponent
          variant={variant || RVVariantProp.disabled}
          color={colorClass}
          size={size}
          {...args}
        >
          <HomeSvg />
          {children}
        </ButtonComponent>
        <ButtonComponent
          variant={variant || RVVariantProp.disabled}
          color={colorClass}
          size={size}
          {...args}
        >
          <HomeSvg />
        </ButtonComponent>
      </ButtonGroupComponent>
    </ThemeBlock>
  );
};
