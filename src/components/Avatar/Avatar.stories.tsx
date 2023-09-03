import React, { useEffect, useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeBlock } from '../../storybookComponents';
import { Avatar as AvatarComponent, RVAvatar } from '.';
import { AvatarGroup } from '../AvatarGroup';
import { RVSizeProp, RVVariantProp } from '../../types';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/Avatar',
  component: AvatarComponent,
  // argTypes: {} as RVAvatar,
} as ComponentMeta<typeof AvatarComponent>;

const Template: ComponentStory<typeof AvatarComponent> = ({
  src = 'https://i.pravatar.cc/300',
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
      <AvatarComponent
        variant={variant || RVVariantProp.primary}
        color={colorClass}
        src={src}
        {...args}
      />
      <AvatarComponent
        variant={variant || RVVariantProp.outline}
        color={colorClass}
        src={src}
        {...args}
      />
      <AvatarComponent
        variant={variant || RVVariantProp.white}
        color={colorClass}
        src={src}
        {...args}
      />
      <AvatarComponent
        variant={variant || RVVariantProp.disabled}
        color={colorClass}
        src={src}
        {...args}
      />
    </ThemeBlock>
  );
};

export const ShowCase = ({ src = 'https://i.pravatar.cc/300', ...args }) => {
  return (
    <>
      <AvatarComponent src={src} {...args} />
    </>
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

export const fullCircle = Template.bind({});
fullCircle.args = {
  fullCircle: true,
};
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

export const Stacked = ({
  src = 'https://i.pravatar.cc/300',
  stacked = true,
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
      <AvatarGroup>
        <AvatarComponent
          src={src}
          stacked={stacked}
          variant={variant || RVVariantProp.disabled}
          color={colorClass}
          {...args}
        />
        <AvatarComponent
          src={src}
          stacked={stacked}
          variant={variant || RVVariantProp.disabled}
          color={colorClass}
          {...args}
        />
        <AvatarComponent
          src={src}
          stacked={stacked}
          variant={variant || RVVariantProp.disabled}
          color={colorClass}
          {...args}
        />
        <AvatarComponent
          src={src}
          stacked={stacked}
          variant={variant || RVVariantProp.disabled}
          color={colorClass}
          {...args}
        />
        <AvatarComponent
          src={src}
          stacked={stacked}
          variant={variant || RVVariantProp.disabled}
          color={colorClass}
          {...args}
        />
      </AvatarGroup>
    </ThemeBlock>
  );
};
