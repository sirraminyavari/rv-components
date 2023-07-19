import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Dropdown as DropdownComponent, RVDropdown } from '.';
import { ShapesSvg } from '../../icons';
import { Button } from '../Button';
import { RVColorProp, RVSizeProp, RVVariantProp } from '../../types';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/Dropdown',
  component: DropdownComponent,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {} as RVDropdown,
} as ComponentMeta<typeof DropdownComponent>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof DropdownComponent> = ({
  label = 'label',
  size = RVSizeProp.small,
  ...args
}) => (
  <div style={{ minHeight: '100vh' }}>
    <DropdownComponent label={label} size={size} {...args}>
      <Button size={size} color={RVColorProp.cgBlue} variant={RVVariantProp.white}>
        some link/button
      </Button>
      <Button size={size} color={RVColorProp.cgBlue} variant={RVVariantProp.white}>
        some link/button
      </Button>
      <Button size={size} color={RVColorProp.cgBlue} variant={RVVariantProp.white}>
        some link/button
      </Button>
    </DropdownComponent>
  </div>
);

// More on args: https://storybook.js.org/docs/react/writing-stories/args
export const Dropdown = Template.bind({});

export const primary = Template.bind({});
primary.args = { variant: 'primary' };

export const outline = Template.bind({});
outline.args = { variant: 'outline' };

export const white = Template.bind({});
white.args = { variant: 'white' };

export const disabled = Template.bind({});
disabled.args = { disabled: true };
