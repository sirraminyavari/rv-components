import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Separator as SeparatorComponent, RVSeparator } from '.';

export default {
  title: 'Components/Separator',
  component: SeparatorComponent,
  argTypes: {
    children: { control: 'text' },
  } as RVSeparator,
} as ComponentMeta<typeof SeparatorComponent>;

const Template: ComponentStory<typeof SeparatorComponent> = ({
  children = 'Separator',
  ...args
}) => <SeparatorComponent {...args}>{children}</SeparatorComponent>;

export const primary = Template.bind({});
primary.args = { variant: 'primary' };

export const outline = Template.bind({});
outline.args = { variant: 'outline' };

export const white = Template.bind({});
white.args = { variant: 'white' };
