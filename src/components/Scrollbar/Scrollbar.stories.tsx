import React, { useEffect, useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Scrollbar as ScrollbarComponent, RVScrollbar } from '.';
import { ThemeBlock } from '../../storybookComponents';
import { RVSizeProp, RVVariantProp } from '../../types';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/Scrollbar',
  component: ScrollbarComponent,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {} as RVScrollbar,
} as ComponentMeta<typeof ScrollbarComponent>;

const LoremIpsum = () => (
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus tortor neque, vehicula sit
    amet odio quis, dictum tristique lorem. Phasellus mattis, nibh in volutpat consequat, diam
    lectus tristique purus, vitae mattis enim metus sed nulla. Sed et risus blandit, posuere arcu
    eu, bibendum eros. In hac habitasse platea dictumst. Vestibulum id elementum mi, ac bibendum
    ipsum. Phasellus venenatis enim nec arcu ullamcorper, eu vulputate augue imperdiet. Nulla
    sagittis egestas mi non mollis. Aenean dapibus in nulla eu elementum. Nam non nisl malesuada,
    suscipit massa euismod, pretium ligula. Nulla in porta nisi.
  </p>
);

const Template: ComponentStory<typeof ScrollbarComponent> = ({ color, ...args }) => {
  const [colorClass, setColorClass] = useState(color);
  useEffect(() => {
    setColorClass(color);
  }, [color]);

  return (
    <ThemeBlock onColorChange={setColorClass}>
      <div style={{ height: '200px', overflow: 'hidden' }}>
        <ScrollbarComponent color={colorClass} {...args}>
          <LoremIpsum />
          <LoremIpsum />
          <LoremIpsum />
          <LoremIpsum />
          <LoremIpsum />
        </ScrollbarComponent>
      </div>
    </ThemeBlock>
  );
};

export const ShowCase = ({ ...args }) => {
  return (
    <>
      <div style={{ height: '200px', overflow: 'hidden' }}>
        <ScrollbarComponent {...args}>
          <LoremIpsum />
          <LoremIpsum />
          <LoremIpsum />
          <LoremIpsum />
          <LoremIpsum />
        </ScrollbarComponent>
      </div>
    </>
  );
};

export const alwaysVisible = Template.bind({});
alwaysVisible.args = { alwaysShowScrollbar: true };

export const onScrollEnd = ({ onScrollEnd, scrollEndThreshold, ...args }) => {
  const [isAtTheEnd, setIsAtTheEnd] = useState(false);
  return (
    <>
      is at the bottom ? {isAtTheEnd ? 'yes' : 'not yet'}
      <div style={{ height: '200px', overflow: 'hidden' }}>
        <ScrollbarComponent
          onScrollEnd={(isAtTheBottom) => {
            setIsAtTheEnd(isAtTheBottom);
          }}
          scrollEndThreshold={100}
          {...args}
        >
          <LoremIpsum />
          <LoremIpsum />
          <LoremIpsum />
          <LoremIpsum />
          <LoremIpsum />
        </ScrollbarComponent>
      </div>
    </>
  );
};

export const SmallSized = Template.bind({});
SmallSized.args = { size: RVSizeProp.small };

export const MediumSized = Template.bind({});
MediumSized.args = { size: RVSizeProp.medium };

export const LargeSized = Template.bind({});
LargeSized.args = { size: RVSizeProp.large };
