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
      label: 'some label for text search',
      canHaveMultipleInputs: true,
      placeholder: 'some placeholder',
      defaultValues: ['my values'],
    },
    myName2: {
      dataType: 'singleChoice',
      label: 'some label for checkboxes',
      placeholder: 'some placeholder',
      options: [
        { label: 'label1', value: false },
        { label: 'label2', value: true },
        { label: 'label3', value: false },
      ],
    },
    myName3: {
      dataType: 'MultipleChoices',
      label: 'some label for selectInput',
      placeholder: 'some placeholder',
      options: [
        { label: 'label1', value: '1000' },
        { label: 'label2', value: '1001' },
        { label: 'label3', value: '1002' },
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
