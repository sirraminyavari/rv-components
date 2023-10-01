import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import {
  PasswordStrengthCheck as PasswordStrengthCheckComponent,
  RVPasswordStrengthCheck,
} from '.';
import { TextInput } from '../TextInput';
import { RVColorProp, RVVariantProp } from '../../types';

export default {
  title: 'Components/PasswordStrengthCheck',
  component: PasswordStrengthCheckComponent,
  argTypes: {} as RVPasswordStrengthCheck,
} as ComponentMeta<typeof PasswordStrengthCheckComponent>;
const Template: ComponentStory<typeof PasswordStrengthCheckComponent> = ({
  password,
  variant = RVVariantProp.outline,
  color = RVColorProp.cgBlue,
  size,
  ...args
}) => {
  const [passwordInput, setPasswordInput] = useState<string | undefined>();
  return (
    <>
      <TextInput
        label={'secure password input ...'}
        size={size}
        color={color}
        variant={variant}
        value={passwordInput}
        onChange={(e) => setPasswordInput(e.target.value)}
      />
      <PasswordStrengthCheckComponent
        password={passwordInput}
        variant={variant}
        color={color}
        size={size}
        {...args}
      />
    </>
  );
};
export const ShowCase: ComponentStory<typeof PasswordStrengthCheckComponent> = ({
  password,
  passwordPolicySetting = {
    MaxLength: 32,
    MinLength: 8,
    SpecialCharacters: true,
    UpperLower: true,
  },
  variant = RVVariantProp.outline,
  color = RVColorProp.cgBlue,
  size,
  ...args
}) => {
  const [passwordInput, setPasswordInput] = useState<string | undefined>();
  return (
    <>
      <TextInput
        label={'secure password input ...'}
        size={size}
        color={color}
        variant={variant}
        value={passwordInput}
        onChange={(e) => setPasswordInput(e.target.value)}
      />
      <PasswordStrengthCheckComponent
        password={passwordInput}
        passwordPolicySetting={passwordPolicySetting}
        variant={variant}
        color={color}
        size={size}
        {...args}
      />
    </>
  );
};

export const defaultPolicies = Template.bind({});

export const InputLengthLimit = Template.bind({});
InputLengthLimit.args = {
  passwordPolicySetting: {
    MaxLength: 15,
    MinLength: 6,
  },
};

export const WithUpperAndLowercase = Template.bind({});
WithUpperAndLowercase.args = {
  passwordPolicySetting: {
    UpperLower: true,
  },
};

export const NonAlphabetic = Template.bind({});
NonAlphabetic.args = {
  passwordPolicySetting: {
    NonAlphabetic: true,
  },
};

export const NonAlphaNumeric = Template.bind({});
NonAlphaNumeric.args = {
  passwordPolicySetting: {
    NonAlphaNumeric: true,
  },
};

export const Numeric = Template.bind({});
Numeric.args = {
  passwordPolicySetting: {
    Numeric: true,
  },
};

export const SpecialCharacters = Template.bind({});
SpecialCharacters.args = {
  passwordPolicySetting: {
    SpecialCharacters: true,
  },
};
