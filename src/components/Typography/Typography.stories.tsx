import React, { useEffect, useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Typography as TypographyComponent, RVTypography } from '.';
import { ThemeBlock } from '../../storybookComponents';

export default {
  title: 'Components/Typography',
  component: TypographyComponent,
  argTypes: {
    children: { control: 'text' },
  } as RVTypography,
} as ComponentMeta<typeof TypographyComponent>;

const Template: ComponentStory<typeof TypographyComponent> = ({
  children = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro dicta corporis magni, esse unde odit aperiam rem expedita obcaecati sit natus! Sequi fugit quisquam laudantium vero impedit suscipit blanditiis. Quibusdam!',
  color,
  ...args
}) => {
  const [colorClass, setColorClass] = useState(color);
  useEffect(() => {
    setColorClass(color);
  }, [color]);

  return (
    <ThemeBlock onColorChange={setColorClass}>
      <TypographyComponent color={colorClass} {...{ colorClass, ...args }}>
        {children}
      </TypographyComponent>
    </ThemeBlock>
  );
};

export const ShowCase = ({
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

export const Caption = Template.bind({});
Caption.args = { type: 'caption' };
