import React from 'react';
import { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeBlock as ThemeBlockComponent, RVThemeBlock } from '.';
import { RVColorProp } from '../../types';

export default {
  title: 'Components/ThemeBlock',
  component: ThemeBlockComponent,
  argTypes: {
    defaultColor: RVColorProp.cgBlue,
    children: 'my component goes here',
  } as RVThemeBlock,
} as ComponentMeta<typeof ThemeBlockComponent>;

const Template: ComponentStory<typeof ThemeBlockComponent> = ({
  defaultColor,
  onColorChange,
  children,
}) => {
  const [colorPalette, setColorPalette] = useState<RVColorProp | undefined>();
  return (
    <ThemeBlockComponent
      onColorChange={onColorChange || setColorPalette}
      defaultColor={defaultColor}
    >
      selected color: {colorPalette || "default story's default"}
      <br />
      {children}
    </ThemeBlockComponent>
  );
};

export const ThemeBlock = Template.bind({});
