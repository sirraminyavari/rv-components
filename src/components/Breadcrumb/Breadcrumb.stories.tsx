import React, { useEffect, useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Breadcrumb as BreadcrumbComponent, RVBreadcrumb } from '.';
import { RVSizeProp, RVVariantProp } from '../../types';
import { FileTrayFullSvg } from '../../icons';
import { ThemeBlock } from '../../storybookComponents';

export default {
  title: 'Components/Breadcrumb',
  component: BreadcrumbComponent,
  argTypes: {} as RVBreadcrumb,
} as ComponentMeta<typeof BreadcrumbComponent>;

const Template: ComponentStory<typeof BreadcrumbComponent> = ({
  label = 'label',
  routeLinks = [
    { label: 'test1', path: '#!' },
    {
      label: 'test2',
      path: '#!',
      adjacentPaths: [
        { label: 'sub test', path: '#!' },
        { label: 'sub test2', path: '#!' },
        { label: 'sub test3', path: '#!' },
      ],
    },
  ],
  Icon,
  size = RVSizeProp.small,

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
      <div style={{ minHeight: '10vh' }}>
        <BreadcrumbComponent
          routeLinks={routeLinks}
          size={size}
          Icon={Icon}
          variant={variant || RVVariantProp.primary}
          color={colorClass}
          {...args}
        />
      </div>
      <div style={{ minHeight: '10vh' }}>
        <BreadcrumbComponent
          routeLinks={routeLinks}
          size={size}
          Icon={Icon}
          variant={variant || RVVariantProp.outline}
          color={colorClass}
          {...args}
        />
      </div>
      <div style={{ minHeight: '10vh' }}>
        <BreadcrumbComponent
          routeLinks={routeLinks}
          size={size}
          Icon={Icon}
          variant={variant || RVVariantProp.white}
          color={colorClass}
          {...args}
        />
      </div>
      <div style={{ minHeight: '10vh' }}>
        <BreadcrumbComponent
          routeLinks={routeLinks}
          size={size}
          Icon={Icon}
          variant={variant || RVVariantProp.disabled}
          color={colorClass}
          {...args}
        />
      </div>
    </ThemeBlock>
  );
};

export const ShowCase = ({
  label = 'label',
  routeLinks = [
    { label: 'test1', path: '#!' },
    {
      label: 'test2',
      path: '#!',
      adjacentPaths: [
        { label: 'sub test', path: '#!' },
        { label: 'sub test2', path: '#!' },
        { label: 'sub test3', path: '#!' },
      ],
    },
  ],
  Icon,
  size = RVSizeProp.small,
  ...args
}) => {
  return (
    <>
      <BreadcrumbComponent routeLinks={routeLinks} size={size} Icon={Icon} {...args} />
    </>
  );
};

export const WithoutIcon = Template.bind({});
WithoutIcon.args = {};
export const WithIcon = Template.bind({});
WithIcon.args = { Icon: FileTrayFullSvg };

export const SmallSized = Template.bind({});
SmallSized.args = { size: RVSizeProp.small, Icon: FileTrayFullSvg };

export const MediumSized = Template.bind({});
MediumSized.args = { size: RVSizeProp.medium, Icon: FileTrayFullSvg };

export const LargeSized = Template.bind({});
LargeSized.args = { size: RVSizeProp.large, Icon: FileTrayFullSvg };
