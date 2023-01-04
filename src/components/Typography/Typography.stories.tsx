import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Typography as TypographyComponent, ITypography } from '.';

export default {
  title: 'Components/Typography',
  component: TypographyComponent,
  argTypes: {
    children: { control: 'text' },
  } as ITypography,
} as ComponentMeta<typeof TypographyComponent>;

const Template: ComponentStory<typeof TypographyComponent> = ({
  children = 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
  ...args
}) => <TypographyComponent {...args}>{children}</TypographyComponent>;  

export const H1 = Template.bind({});
H1.args = { type: 'H1' };

export const H2 = Template.bind({});
H2.args = { type: 'H2' };

export const H3 = Template.bind({});
H3.args = { type: 'H3' };

export const H4 = Template.bind({});
H4.args = { type: 'H4' };

export const H5 = Template.bind({});
H5.args = { type: 'H5' };

export const H6 = Template.bind({});
H6.args = { type: 'H6' };

export const Paragraph = Template.bind({});
Paragraph.args = { type: 'p' };

export const Subtitle = Template.bind({});
Subtitle.args = { type: 'sub' };
