import React, { FunctionComponent } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { AvatarGroup as AvatarGroupComponent } from '.';
import { RVColorProp, RVSizeProp, RVVariantProp } from '../../types';
import { default as AvatarComponent } from '../Avatar/Avatar';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/AvatarGroup',
  component: AvatarComponent,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof AvatarComponent>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<
  FunctionComponent<{
    color?: RVColorProp;
    variant?: RVVariantProp;
    size?: RVSizeProp;
  }>
> = ({ ...args }) => (
  <AvatarGroupComponent>
    <AvatarComponent
      rounded="full"
      size={RVSizeProp.large}
      stacked
      src="https://i.pravatar.cc/150?u=a042581f4e29026724d"
      {...args}
    />
    <AvatarComponent
      rounded="full"
      size={RVSizeProp.large}
      stacked
      src="https://i.pravatar.cc/150?u=a042581f4e29026744d"
      {...args}
    />
    <AvatarComponent
      rounded="full"
      size={RVSizeProp.large}
      stacked
      src="https://i.pravatar.cc/150?u=a042581f4e29026774d"
      {...args}
    />
    <AvatarComponent
      rounded="full"
      size={RVSizeProp.large}
      stacked
      src="https://i.pravatar.cc/150?u=a042581f4e29026754d"
      {...args}
    />
  </AvatarGroupComponent>
);

// More on args: https://storybook.js.org/docs/react/writing-stories/args
export const AvatarGroup = Template.bind({});

export const primary = Template.bind({});
primary.args = { variant: 'primary' };

export const outline = Template.bind({});
outline.args = { variant: 'outline' };

export const white = Template.bind({});
white.args = { variant: 'white' };

export const disabled = Template.bind({});
disabled.args = { variant: RVVariantProp.disabled };
