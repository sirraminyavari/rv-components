import React, { useEffect, useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { TextAreaInput as TextAreaInputComponent, RVTextAreaInput } from '.';
import { ShapesSvg } from '../../icons';
import { ThemeBlock } from '../../storybookComponents';
import { RVSizeProp, RVVariantProp } from '../../types';

export default {
  title: 'Components/input/TextAreaInput',
  component: TextAreaInputComponent,
  argTypes: {} as RVTextAreaInput,
} as ComponentMeta<typeof TextAreaInputComponent>;

const Template: ComponentStory<typeof TextAreaInputComponent> = ({
  label,
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
      <div>
        <TextAreaInputComponent
          label={label}
          variant={variant || RVVariantProp.primary}
          color={colorClass}
          {...args}
        />
      </div>
      <div>
        <TextAreaInputComponent
          label={label}
          variant={variant || RVVariantProp.outline}
          color={colorClass}
          {...args}
        />
      </div>
      <div>
        <TextAreaInputComponent
          label={label}
          variant={variant || RVVariantProp.white}
          color={colorClass}
          {...args}
        />
      </div>
    </ThemeBlock>
  );
};

export const ShowCase = ({ label = 'label', ...args }) => {
  return (
    <>
      <TextAreaInputComponent label={label} {...args} />
    </>
  );
};

export const WithoutLabel = Template.bind({});
WithoutLabel.args = { label: undefined };

export const customColumns = Template.bind({});
customColumns.args = { cols: 12, label: 'text input label' };

export const customRows = Template.bind({});
customRows.args = { rows: 15, label: 'text input label' };

export const TrailingIcon = Template.bind({});
TrailingIcon.args = { Icon: ShapesSvg, IconPosition: 'trailing', label: 'text input label' };

export const LeadingIcon = Template.bind({});
LeadingIcon.args = { Icon: ShapesSvg, IconPosition: 'leading', label: 'text input label' };

export const WithValue = Template.bind({});
WithValue.args = { defaultValue: 'some input value', label: 'text input label' };

export const SmallSized = Template.bind({});
SmallSized.args = { size: RVSizeProp.small, label: 'text input label' };

export const MediumSized = Template.bind({});
MediumSized.args = { size: RVSizeProp.medium, label: 'text input label' };

export const LargeSized = Template.bind({});
LargeSized.args = { size: RVSizeProp.large, label: 'text input label' };

export const disabled = Template.bind({});
disabled.args = { disabled: true, defaultValue: 'some input value', label: 'text input label' };
