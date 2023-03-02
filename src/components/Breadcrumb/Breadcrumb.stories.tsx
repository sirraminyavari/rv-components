import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Breadcrumb as BreadcrumbComponent, RVBreadcrumb } from '.';
import { RVSizeProp } from '../../types';
import { FileTrayFullSvg } from '../../icons';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/Breadcrumb',
  component: BreadcrumbComponent,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {} as RVBreadcrumb,
} as ComponentMeta<typeof BreadcrumbComponent>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof BreadcrumbComponent> = ({
  label = 'label',
  routeLinks = [
    { label: 'test1', path: '#!' },
    {
      label: 'test',
      path: '#!',
      adjacentPaths: [
        { label: 'sub test', path: '#!' },
        { label: 'sub test2', path: '#!' },
        { label: 'sub test3', path: '#!' },
      ],
    },
  ],
  Icon = FileTrayFullSvg,
  size = RVSizeProp.small,
  ...args
}) => (
  <div style={{ minHeight: '100vh' }}>
    <BreadcrumbComponent
      routeLinks={routeLinks}
      size={size}
      Icon={Icon}
      {...args}
    />
  </div>
);

// More on args: https://storybook.js.org/docs/react/writing-stories/args
export const Breadcrumb = Template.bind({});

export const primary = Template.bind({});
primary.args = { variant: 'primary' };

export const outline = Template.bind({});
outline.args = { variant: 'outline' };

export const white = Template.bind({});
white.args = { variant: 'white' };

export const disabled = Template.bind({});
disabled.args = { variant: 'disabled' };
