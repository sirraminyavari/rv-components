import React, { FunctionComponent } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ButtonGroup as ButtonGroupComponent } from '.';
import HomeSvg from '../../icons/home.svg';
import ButtonComponent, { RVButton } from '../Button/Button';
import { RVColorProp, RVSizeProp, RVVariantProp } from '../../types';

export default {
  title: 'Components/ButtonGroup',
  component: ButtonComponent,
  argTypes: {},
} as ComponentMeta<typeof ButtonComponent>;

const Template: ComponentStory<
  FunctionComponent<{
    color?: RVColorProp;
    variant?: RVVariantProp;
    size?: RVSizeProp;
  }>
> = ({ color, variant, size = RVSizeProp.small }) => (
  <ButtonGroupComponent>
    <ButtonComponent color={color} variant={variant} size={size}>
      <HomeSvg />
      some content
    </ButtonComponent>
    <ButtonComponent color={color} variant={variant} size={size}>
      <HomeSvg />
    </ButtonComponent>
  </ButtonGroupComponent>
);

export const primary = Template.bind({});
primary.args = { variant: 'primary' };

export const outline = Template.bind({});
outline.args = { variant: 'outline' };

export const white = Template.bind({});
white.args = { variant: 'white' };
