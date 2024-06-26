import React, { useEffect, useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeBlock, withAvatarDemo } from '../../storybookComponents';
import { Avatar, RVAvatar } from '.';
import { AvatarGroup } from '../AvatarGroup';
import { RVColorProp, RVSizeProp, RVVariantProp } from '../../types';

const AvatarComponent = withAvatarDemo(Avatar, 'src');

export default {
  title: 'Components/Avatar',
  component: Avatar,
  // argTypes: {} as RVAvatar,
} as ComponentMeta<typeof AvatarComponent>;

const Template: ComponentStory<typeof AvatarComponent> = ({ src, color, variant, ...args }) => {
  const [colorClass, setColorClass] = useState(color);
  useEffect(() => {
    setColorClass(color);
  }, [color]);

  return (
    <ThemeBlock onColorChange={setColorClass}>
      <div>
        <AvatarComponent
          variant={variant || RVVariantProp.primary}
          color={colorClass}
          src={src}
          {...args}
        />
      </div>
      <div>
        <AvatarComponent
          variant={variant || RVVariantProp.outline}
          color={colorClass}
          src={src}
          {...args}
        />
      </div>
      <div>
        <AvatarComponent
          variant={variant || RVVariantProp.white}
          color={colorClass}
          src={src}
          {...args}
        />
      </div>
      <div>
        <AvatarComponent
          variant={variant || RVVariantProp.disabled}
          color={colorClass}
          src={src}
          {...args}
        />
      </div>
    </ThemeBlock>
  );
};

export const ShowCase: ComponentStory<typeof AvatarComponent> = ({ src, ...args }) => {
  return (
    <>
      <div>
        <AvatarComponent src={src} {...args} />
      </div>
    </>
  );
};
export const withIndicator = Template.bind({});
withIndicator.args = { withIndicator: true };

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

export const Stacked: ComponentStory<typeof AvatarComponent> = ({
  src,
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
          variant={variant || RVVariantProp.primary}
          color={colorClass}
          {...args}
        />
        <AvatarComponent
          src={src}
          stacked={stacked}
          variant={variant || RVVariantProp.primary}
          color={colorClass}
          {...args}
        />
        <AvatarComponent
          src={src}
          stacked={stacked}
          variant={variant || RVVariantProp.primary}
          color={colorClass}
          {...args}
        />
        <AvatarComponent
          src={src}
          stacked={stacked}
          variant={variant || RVVariantProp.primary}
          color={colorClass}
          {...args}
        />
        <AvatarComponent
          src={src}
          stacked={stacked}
          variant={variant || RVVariantProp.primary}
          color={colorClass}
          {...args}
        />
      </AvatarGroup>
    </ThemeBlock>
  );
};
