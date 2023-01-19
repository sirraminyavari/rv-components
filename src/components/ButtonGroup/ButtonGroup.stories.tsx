import React, { FunctionComponent } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ButtonGroup as ButtonGroupComponent } from '.';
import HomeSvg from '../../icons/home.svg';
import Button, { RVButton } from '../Button/Button';
import { RVColorProp, RVSizeProp, RVVariantProp } from '../../types';

export default {
  title: 'Components/ButtonGroup',
  component: ButtonGroupComponent,
  argTypes: {
    color: {
      control: {
        type: 'radio',
        labels: RVColorProp,
      },
    },
    variant: {
      control: {
        type: 'radio',
        labels: RVVariantProp,
      },
    },
    size: {
      control: {
        type: 'radio',
        labels: RVSizeProp,
      },
    },
  },
} as ComponentMeta<
  FunctionComponent<{
    color?: RVColorProp;
    variant?: RVVariantProp;
    size?: RVSizeProp;
  }>
>;

const Template: ComponentStory<
  FunctionComponent<{
    color?: RVColorProp;
    variant?: RVVariantProp;
    size?: RVSizeProp;
  }>
> = ({ color, variant, size = RVSizeProp.small }) => (
  <ButtonGroupComponent>
    <Button color={color} variant={variant} size={size}>
      <HomeSvg />
      some content
    </Button>
    <Button color={color} variant={variant} size={size}>
      <HomeSvg />
    </Button>
  </ButtonGroupComponent>
);

export const primary = Template.bind({});
primary.args = { variant: 'primary' };

export const outline = Template.bind({});
outline.args = { variant: 'outline' };

export const white = Template.bind({});
white.args = { variant: 'white' };
