import {
  DetailedHTMLProps,
  forwardRef,
  HTMLAttributes,
  PropsWithoutRef,
  useEffect,
  useState,
  useCallback,
} from 'react';
import { RVColorProp, RVSizeProp, RVVariantProp } from '../../types';
import { Checkbox } from '../Checkbox';
import styles from './PasswordStrengthCheck.module.scss';

export interface RVPasswordStrengthCheck
  extends Omit<
    PropsWithoutRef<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>>,
    'color' | 'size'
  > {
  variant?: Exclude<RVVariantProp, RVVariantProp.disabled>;
  color?: RVColorProp;
  size?: RVSizeProp;
  password?: string;
  onSuccessfulValidation?: (password: string, validations: Record<string, boolean>) => void;
  validations: {
    maxLength?: number | false;
    minLength?: number | false;
    withNumberAndSpecialCharacters?: boolean;
    uppercaseAndLowercase?: boolean;
  };
}

const PasswordStrengthCheck = forwardRef<HTMLDivElement, RVPasswordStrengthCheck>(
  (
    {
      className,
      color = RVColorProp.cgBlue,
      variant = RVVariantProp.primary,
      size = RVSizeProp.small,
      password,
      onChange,
      onSuccessfulValidation,
      validations = {
        maxLength: 32,
        minLength: 8,
        uppercaseAndLowercase: true,
        withNumberAndSpecialCharacters: true,
      },
      ...props
    },
    ref
  ) => {
    const [validationCheck, setValidationCheck] = useState<Record<string, boolean>>({});
    const validatePassword = useCallback(
      (passwordInput: string) => {
        const isPasswordValid: Record<string, boolean> = {};
        if (passwordInput === undefined) return;
        if (validations.maxLength && validations.maxLength > 0) {
          isPasswordValid.maxLength = String(passwordInput).length <= validations.maxLength;
        }
        if (validations.minLength && validations.minLength > 0) {
          isPasswordValid.minLength = String(passwordInput).length >= validations.minLength;
        }
        if (validations.uppercaseAndLowercase) {
          isPasswordValid.uppercaseAndLowercase = Boolean(
            String(passwordInput).match(/\b(?=[a-z]+[A-Z]+|[A-Z]+[a-z]+)[a-zA-Z]{8,20}\b/)
          );
        }
        if (validations.withNumberAndSpecialCharacters) {
          isPasswordValid.withNumberAndSpecialCharacters = Boolean(
            String(passwordInput).match(/[-._!"`'#%&,:;<>=@{}~\$\(\)\*\+\/\\\?\[\]\^\|]+/)
          );
        }
        if (onSuccessfulValidation) {
          const allValidationsCount = Object.keys(validations).length;
          const allValidatedStatesCount = Object.keys(validations)
            .map((validationName) => {
              return isPasswordValid[validationName];
            })
            .filter((item) => item).length;

          if (allValidationsCount === allValidatedStatesCount)
            onSuccessfulValidation(passwordInput, isPasswordValid);
        }
        return { ...isPasswordValid };
      },
      [validations]
    );

    useEffect(() => {
      if (password) setValidationCheck(() => validatePassword(password)!);
    }, [password]);

    return (
      <>
        <div ref={ref} className={styles.passwordStrengthCheckContainer} {...props}>
          {!isNaN(Number(validations.minLength)) && (
            <Checkbox
              label={`At least ${validations.minLength} characters`}
              className={styles.checkbox}
              variant={variant}
              color={color}
              size={size}
              checked={validationCheck.minLength}
            />
          )}
          {validations?.withNumberAndSpecialCharacters && (
            <Checkbox
              label={`Contains number or special characters`}
              className={styles.checkbox}
              variant={variant}
              color={color}
              size={size}
              checked={validationCheck.withNumberAndSpecialCharacters}
            />
          )}
          {validations?.uppercaseAndLowercase && (
            <Checkbox
              label={`Contains both lower and upper cases`}
              className={styles.checkbox}
              variant={variant}
              color={color}
              size={size}
              checked={validationCheck.uppercaseAndLowercase}
            />
          )}
          {!isNaN(Number(validations.maxLength)) && (
            <Checkbox
              label={`${validations.maxLength} characters maximum`}
              className={styles.checkbox}
              variant={variant}
              color={color}
              size={size}
              checked
            />
          )}
        </div>
      </>
    );
  }
);

export default PasswordStrengthCheck;
