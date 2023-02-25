import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import {
  TextInput as TextInputComponent,
  RVTextInput,
  RVTextAreaInput,
  TextAreaInput as TextAreaInputComponent,
} from '.';
import HomeSvg from '../../icons/home.svg';
import { ShapesSvg } from '../../icons';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/TextInput',
  component: TextInputComponent,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {} as RVTextInput,
} as ComponentMeta<typeof TextInputComponent>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof TextInputComponent> = ({
  label = 'label',
  ...args
}) => <TextInputComponent label={label} {...args} />;
const TemplateTextArea: ComponentStory<typeof TextAreaInputComponent> = ({
  label = 'label',
  ...args
}) => <TextAreaInputComponent label={label} {...args} />;

// More on args: https://storybook.js.org/docs/react/writing-stories/args
export const TextInput = Template.bind({});

export const TextAreaInput = TemplateTextArea.bind({});

export const primary = Template.bind({});
primary.args = { variant: 'primary' };

export const outline = Template.bind({});
outline.args = { variant: 'outline' };

export const white = Template.bind({});
white.args = { variant: 'white' };

export const withIcon = Template.bind({});
withIcon.args = { Icon: ShapesSvg };
