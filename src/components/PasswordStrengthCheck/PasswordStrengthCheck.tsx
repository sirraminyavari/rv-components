import clsx from 'clsx';
import {
  DetailedHTMLProps,
  HTMLAttributes,
  PropsWithoutRef,
  FunctionComponent,
  useMemo,
} from 'react';
import { RVColorProp, RVSizeProp, RVVariantProp } from '../../types';
import { Checkbox } from '../Checkbox';
import styles from './PasswordStrengthCheck.module.scss';

type PasswordPolicySetting = {
  /** minimum acceptable length for input password (default:8) */
  MinLength?: number;
  /** maximum acceptable length for input password (default:undefined) */
  MaxLength?: number;
  /** check input password to contain at least one numeric character (default:undefined) */
  Numeric?: boolean;
  /** check input password to contain both capital and lowercase character (default:false) */
  UpperLower?: boolean;
  /** check input password to contain at least one non EN alphabet character (default:false) */
  NonAlphabetic?: boolean;
  /** check input password to contain at least one non EN alphabet/number character (default:false) */
  NonAlphaNumeric?: boolean;
  /** check input password to contain at least one common special character (default:false) */
  SpecialCharacters?: boolean;
};
export interface RVPasswordStrengthCheck
  extends Omit<
    PropsWithoutRef<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>>,
    'color' | 'size' | 'onChange'
  > {
  variant?: Exclude<RVVariantProp, RVVariantProp.disabled>;
  color?: RVColorProp;
  size?: RVSizeProp;
  password?: string;
  passwordPolicySetting?: PasswordPolicySetting;
  onChange?: (parameters: {
    password: string;
    passwordMetPolicies: Record<keyof PasswordPolicySetting, boolean | undefined>;
    isInputValid: boolean;
  }) => void;
}

const policyLabels = {
  MinLength: 'At least [length] characters',
  MaxLength: 'At most [length] characters',
  UpperLower: 'Both upper and lower case letters',
  Numeric: 'At least one number',
  NonAlphabetic: 'At least one non alphabetic character',
  NonAlphaNumeric: 'At least one non alphabetic/numeric character',
  SpecialCharacters: 'At least one Special character (!, @, #, ...)',
};

const PasswordStrengthCheck: FunctionComponent<RVPasswordStrengthCheck> = ({
  className,
  color = RVColorProp.cgBlue,
  variant = RVVariantProp.primary,
  size = RVSizeProp.small,
  passwordPolicySetting: rawPasswordPolicySetting = {},
  password = '',
  onChange,
  ...props
}) => {
  const passwordPolicies = useMemo(() => {
    const defaultPolicySetup = {
      MinLength: rawPasswordPolicySetting?.MinLength ?? 8,
      MaxLength: rawPasswordPolicySetting?.MaxLength ?? false,
      UpperLower: rawPasswordPolicySetting?.UpperLower ?? false,
      NonAlphabetic: rawPasswordPolicySetting?.NonAlphabetic ?? false,
      NonAlphaNumeric: rawPasswordPolicySetting?.NonAlphaNumeric ?? false,
      Numeric: rawPasswordPolicySetting?.Numeric ?? false,
      SpecialCharacters: rawPasswordPolicySetting?.SpecialCharacters ?? false,
    };
    if (defaultPolicySetup.MinLength < 2) defaultPolicySetup.MinLength = 8;
    if (defaultPolicySetup.MaxLength)
      if (defaultPolicySetup.MaxLength <= defaultPolicySetup.MinLength)
        defaultPolicySetup.MaxLength = 32;

    return defaultPolicySetup;
  }, [rawPasswordPolicySetting]);

  const metPasswordPolicyConditions = useMemo(() => {
    const MinLength = password.length >= passwordPolicies.MinLength;
    const MaxLength = passwordPolicies.MaxLength
      ? MinLength && password.length <= passwordPolicies.MaxLength
      : undefined;
    const UpperLower = passwordPolicies.UpperLower
      ? /[a-z]/g.test(password) && /[A-Z]/g.test(password)
      : undefined;
    const Numeric = passwordPolicies.Numeric
      ? /[0-9]/g.test(password) && password.length > 0
      : undefined;
    const NonAlphabetic = passwordPolicies.NonAlphabetic
      ? !/^[a-zA-Z]+$/g.test(password) && password.length > 0
      : undefined;
    const NonAlphaNumeric = passwordPolicies.NonAlphaNumeric
      ? !/^[a-zA-Z0-9]+$/g.test(password) && password.length > 0
      : undefined;
    const SpecialCharacters = passwordPolicies.SpecialCharacters
      ? /[!-\/:-@[-`{-~]/g.test(password) && password.length > 0
      : undefined;

    const conditions = {
      MinLength,
      MaxLength,
      UpperLower,
      Numeric,
      NonAlphabetic,
      NonAlphaNumeric,
      SpecialCharacters,
    };
    if (onChange)
      onChange({
        password,
        passwordMetPolicies: conditions,
        isInputValid: !Object.values(conditions).includes(false),
      });

    return conditions;
  }, [passwordPolicies, password, onChange]);
  return (
    <>
      <div className={clsx(styles.passwordStrengthCheckContainer, className)} {...props}>
        {Object.entries(metPasswordPolicyConditions)
          .filter(([_, status]) => status !== undefined)
          .map(([policy, status]) => {
            let label = policyLabels[policy as keyof PasswordPolicySetting];
            if (['MaxLength', 'MinLength'].includes(policy))
              label = label.replace(
                '[length]',
                passwordPolicies[policy as keyof PasswordPolicySetting].toString()
              );
            return (
              <Checkbox
                key={`passwordCheckPolicy-` + policy}
                label={label}
                className={styles.checkbox}
                color={color}
                size={size}
                checked={Boolean(status)}
                readOnly
              />
            );
          })}
      </div>
    </>
  );
};

export default PasswordStrengthCheck;
