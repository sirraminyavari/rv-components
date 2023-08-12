import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { AdvancedSearchMenu as AdvancedSearchMenuComponent, RVAdvancedSearchMenu } from '.';

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
  formFieldTypes,
  ...args
}) => {
  const data: typeof formFieldTypes = {
    myName1: {
      dataType: 'shortText',
      label: 'some label for short',
      canHaveMultipleInputs: true,
      placeholder: 'some placeholder',
    },
    myName2: {
      dataType: 'singleChoice',
      label: 'some label for short',
      placeholder: 'some placeholder',
      options: [
        { label: 'label1', value: false },
        { label: 'label2', value: false },
        { label: 'label3', value: false },
      ],
    },
    myName3: {
      dataType: 'MultipleChoices',
      label: 'some label for short',
      placeholder: 'some placeholder',
      options: [
        { label: 'label1', value: '123' },
        { label: 'label2', value: '1234' },
        { label: 'label3', value: '12345' },
      ],
    },
  };
  const [formData, setFormData] = useState(data);

  return (
    <>
      <AdvancedSearchMenuComponent
        formFieldTypes={formData || formFieldTypes}
        style={{ maxHeight: '90vh' }}
        {...{ ...args, color, variant }}
      />
    </>
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
