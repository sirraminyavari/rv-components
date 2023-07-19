import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';

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
  ...args
}) => <AccordionComponent {...{ label, ...args }}>{children}</AccordionComponent>;

// More on args: https://storybook.js.org/docs/react/writing-stories/args
export const Accordion = Template.bind({});
