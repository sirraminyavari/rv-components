import React, { useEffect, useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Select as SelectComponent, RVSelect } from '.';
import { ThemeBlock } from '../../storybookComponents';

export default {
  title: 'Components/Select',
  component: SelectComponent,
  argTypes: {} as RVSelect,
} as ComponentMeta<typeof SelectComponent>;

const defaultOptions = [
  { label: 'John Wick', value: 'John Wick' },
  { label: 'Frank Castle', value: 'Frank Castle' },
  { label: 'John Constantine', value: 'John Constantine' },
  { label: 'Charlie Wax', value: 'Charlie Wax' },
  { label: 'Lucifer Morningstar', value: 'Lucifer Morningstar' },
  { label: 'Mike McLusky', value: 'Mike McLusky' },
  { label: 'Kayce Dutton', value: 'Kayce Dutton' },
  { label: 'Alfie Solomons', value: 'Alfie Solomons' },
  { label: 'Tyler Durden', value: 'Tyler Durden' },
  {
    label: 'Rhoshandiatellyneshiaunneveshenk Koyaanisquatsiuth Williams ',
    value: 'Rhoshandiatellyneshiaunneveshenk Koyaanisquatsiuth Williams ',
  },
];

const Template: ComponentStory<typeof SelectComponent> = ({
  color,
  options = defaultOptions,
  label,
  ...args
}) => {
  const [colorClass, setColorClass] = useState(color);
  useEffect(() => {
    setColorClass(color);
  }, [color]);

  return (
    <ThemeBlock onColorChange={setColorClass}>
      <div style={{ height: '350px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <SelectComponent label={label} color={colorClass} options={options} {...args} />
      </div>
    </ThemeBlock>
  );
};

export const ShowCase = ({ label, options = defaultOptions, ...args }) => {
  return (
    <>
      <div style={{ height: '200px' }}>
        <SelectComponent label={label} options={options} {...args} />
      </div>
    </>
  );
};
export const MultiSelect = Template.bind({});
MultiSelect.args = { isMulti: true };

export const ClearableSingleSelect = Template.bind({});
ClearableSingleSelect.args = { isClearable: true };

export const ClearableMultiSelect = Template.bind({});
ClearableMultiSelect.args = { isClearable: true, isMulti: true };

export const fullWidth = Template.bind({});
fullWidth.args = { fullWidth: true };

export const disabled = Template.bind({});
disabled.args = { disabled: true };

// export const SmallSized = Template.bind({});
// SmallSized.args = { size: RVSizeProp.small };

// export const MediumSized = Template.bind({});
// MediumSized.args = { size: RVSizeProp.medium };

// export const LargeSized = Template.bind({});
// LargeSized.args = { size: RVSizeProp.large };
