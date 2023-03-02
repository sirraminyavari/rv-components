import React, { FunctionComponent } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ButtonGroup as ButtonGroupComponent, RVButtonGroup } from '.';
import HomeSvg from '../../icons/home.svg';
import ButtonComponent, { RVButton } from '../Button/Button';
import { RVColorProp, RVSizeProp, RVVariantProp } from '../../types';

export default {
  title: 'Components/ButtonGroup',
  component: ButtonGroupComponent,
  argTypes: {} as RVButtonGroup,
} as ComponentMeta<typeof ButtonGroupComponent>;

const Template: ComponentStory<FunctionComponent<RVButton>> = ({
  color,
  variant,
  size = RVSizeProp.small,
  rounded = 'half',
  ...props
}) => (
  <ButtonGroupComponent rounded={rounded}>
    <ButtonComponent color={color} variant={variant} size={size} {...props}>
      <HomeSvg />
      some content
    </ButtonComponent>
    <ButtonComponent color={color} variant={variant} size={size} {...props}>
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

export const disabled = Template.bind({});
disabled.args = { variant: 'disabled' };
