import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import {
  AdvancedSearchMenu as AdvancedSearchMenuComponent,
  RVAdvancedSearchMenu,
} from '.';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/AdvancedSearchMenu',
  component: AdvancedSearchMenuComponent,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {} as RVAdvancedSearchMenu,
} as ComponentMeta<typeof AdvancedSearchMenuComponent>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof AdvancedSearchMenuComponent> = ({
  color,
  variant,
  ...args
}) => {
  return (
    <AdvancedSearchMenuComponent
      {...{ ...args, color, variant }}
    />
  );
};

// More on args: https://storybook.js.org/docs/react/writing-stories/args
export const AdvancedSearchMenu = Template.bind({});

export const primary = Template.bind({});
primary.args = { variant: 'primary' };

export const outline = Template.bind({});
outline.args = { variant: 'outline' };

export const white = Template.bind({});
white.args = { variant: 'white' };
