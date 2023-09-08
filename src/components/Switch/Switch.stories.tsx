import React, { useEffect, useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Switch as SwitchComponent, RVSwitch } from '.';
import { ThemeBlock } from '../../storybookComponents';
import { RVSizeProp, RVVariantProp } from '../../types';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/Switch',
  component: SwitchComponent,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {} as RVSwitch,
} as ComponentMeta<typeof SwitchComponent>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof SwitchComponent> = ({
  label = 'label',
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
        <SwitchComponent
          label={label}
          variant={variant || RVVariantProp.primary}
          color={colorClass}
          {...args}
        />
      </div>
      <div>
        <SwitchComponent
          label={label}
          variant={variant || RVVariantProp.outline}
          color={colorClass}
          {...args}
        />
      </div>
      <div>
        <SwitchComponent
          label={label}
          variant={variant || RVVariantProp.white}
          color={colorClass}
          {...args}
        />
      </div>
    </ThemeBlock>
  );
};

export const ShowCase = ({ label = 'label', color, variant, ...args }) => {
  return (
    <>
      <SwitchComponent label={label} variant={variant} color={color} {...args} />
    </>
  );
};

// More on args: https://storybook.js.org/docs/react/writing-stories/args
export const checked = Template.bind({});
checked.args = { checked: true };

export const SudoHover = Template.bind({});
SudoHover.args = { sudoAction: 'hover' };

export const SudoFocus = Template.bind({});
SudoFocus.args = { sudoAction: 'focus' };

export const activeState = Template.bind({});
activeState.args = { checked: true };

export const SmallSized = Template.bind({});
SmallSized.args = { size: RVSizeProp.small };

export const MediumSized = Template.bind({});
MediumSized.args = { size: RVSizeProp.medium };

export const LargeSized = Template.bind({});
LargeSized.args = { size: RVSizeProp.large };
