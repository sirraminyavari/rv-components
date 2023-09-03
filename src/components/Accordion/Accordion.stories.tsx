import { ComponentStory, ComponentMeta } from '@storybook/react';
import React, { useEffect, useState } from 'react';
import { Typography } from '../../components';
import { ThemeBlock } from '../../storybookComponents';

import { Accordion as AccordionComponent, RVAccordion } from '.';

export default {
  title: 'Components/Accordion',
  component: AccordionComponent,
  argTypes: {
    children: { control: 'text' },
  } as RVAccordion,
} as ComponentMeta<typeof AccordionComponent>;

const Template: ComponentStory<typeof AccordionComponent> = ({
  children = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro dicta corporis magni, esse unde odit aperiam rem expedita obcaecati sit natus! Sequi fugit quisquam laudantium vero impedit suscipit blanditiis. Quibusdam!',
  label = <>Accordion Label</>,
  color,
  ...args
}) => {
  const [colorClass, setColorClass] = useState(color);
  useEffect(() => {
    setColorClass(color);
  }, [color]);

  return (
    <ThemeBlock onColorChange={setColorClass}>
      <AccordionComponent color={colorClass} {...{ label, colorClass, ...args }}>
        {children}
      </AccordionComponent>
    </ThemeBlock>
  );
};

export const ShowCase = ({
  children = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro dicta corporis magni, esse unde odit aperiam rem expedita obcaecati sit natus! Sequi fugit quisquam laudantium vero impedit suscipit blanditiis. Quibusdam!',
  label = <>Accordion Label</>,
  ...args
}) => {
  return (
    <>
      <AccordionComponent {...{ label, ...args }}>{children}</AccordionComponent>
    </>
  );
};

export const JSXLabel = Template.bind({});
JSXLabel.args = { label: <Typography>Accordion Label</Typography> };

export const defaultOpen = Template.bind({});
defaultOpen.args = { defaultOpen: true };

export const alwaysOpen = Template.bind({});
alwaysOpen.args = { open: true };

export const activeState = Template.bind({});
activeState.args = { active: true };
