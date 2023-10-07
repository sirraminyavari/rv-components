import React, { useEffect, useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Skeleton as SkeletonComponent, RVSkeleton } from '.';
import { ThemeBlock } from '../../storybookComponents';

export default {
  title: 'Components/Skeleton',
  component: SkeletonComponent,
  argTypes: {
    children: { control: 'text' },
  } as RVSkeleton,
} as ComponentMeta<typeof SkeletonComponent>;

const Template: ComponentStory<typeof SkeletonComponent> = ({ color, ...args }) => {
  const [colorClass, setColorClass] = useState(color);
  useEffect(() => {
    setColorClass(color);
  }, [color]);

  return (
    <ThemeBlock onColorChange={setColorClass}>
      <SkeletonComponent color={colorClass} {...{ colorClass, ...args }}></SkeletonComponent>
    </ThemeBlock>
  );
};

export const ShowCase = ({ ...args }) => <SkeletonComponent {...args}></SkeletonComponent>;

export const multipleLines = Template.bind({});
multipleLines.args = { count: 5 };

export const fullyRounded = Template.bind({});
fullyRounded.args = { circle: true, width: 72 };

export const customWidthAndHeight = Template.bind({});
customWidthAndHeight.args = { width: '50%', height: 100 };

export const inlineElement = Template.bind({});
inlineElement.args = { inline: true, width: 250, count: 5 };

export const disabledAnimation = Template.bind({});
disabledAnimation.args = { enableAnimation: false, count: 5 };

export const customDuration = Template.bind({});
customDuration.args = { duration: 0.5, count: 5 };
