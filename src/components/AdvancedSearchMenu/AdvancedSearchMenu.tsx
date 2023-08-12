import clsx from 'clsx';
import {
  DetailedHTMLProps,
  forwardRef,
  HTMLAttributes,
  PropsWithoutRef,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { RVColorProp, RVVariantProp } from '../../types';
import { Scrollbar } from '../Scrollbar';
import { Button } from '../Button';
import { CloseSvg, ReloadSvg } from '../../icons';
import { Typography } from '../Typography';
import styles from './AdvancedSearchMenu.module.scss';
import { RVSelectOptionItem } from '../SelectInput';
import { AdvancedSearchMenuInputFields } from './AdvancedSearchMenuInputFields';

export type RVFormFieldValueTypes = {
  placeholder?: string;
  canHaveMultipleInputs?: boolean;
  label?: string;
  hasChanged?: boolean;
  defaultValues?: { label: string; value?: boolean }[] | string[];
  options?: { label: string; value: string | boolean }[];
} & (
  | {
      dataType: 'shortText';
      defaultValues?: string[];
      options?: undefined;
      canHaveMultipleInputs?: boolean;
    }
  | {
      dataType: 'singleChoice';
      defaultValues?: { label: string; value?: boolean }[];
      options: { label: string; value: boolean }[];
      canHaveMultipleInputs?: undefined;
    }
  | {
      dataType: 'MultipleChoices';
      defaultValues?: { label: string; value: string }[];
      options: { label: string; value: string }[];
      canHaveMultipleInputs?: undefined;
    }
  | {
      dataType: 'date';
      defaultValues: { label: string; value?: Date }[];
      options?: undefined;
      canHaveMultipleInputs?: undefined;
    }
);

export type RVFormFieldTypes = Record<string, RVFormFieldValueTypes>;
export interface RVAdvancedSearchMenu
  extends Omit<
    PropsWithoutRef<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>>,
    'color'
  > {
  variant?: RVVariantProp;
  color?: RVColorProp;
  onReset?: () => void;
  onClose?: () => void;
  onFilterSubmit?: (data: RVFormFieldTypes) => void;
  formFieldTypes: RVFormFieldTypes;
}
const AdvancedSearchMenu = forwardRef<HTMLDivElement, RVAdvancedSearchMenu>(
  (
    {
      className,
      onChange,
      color = RVColorProp.cgBlue,
      variant = RVVariantProp.outline,
      onReset,
      onClose,
      onFilterSubmit,
      formFieldTypes,
      ...props
    },
    ref
  ) => {
    const [searchInputData, setSearchInputData] = useState<
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      Record<string, RVFormFieldValueTypes & { inputValues?: any }>
    >({ ...formFieldTypes });

    useEffect(() => {
      let tempSearchInputDataState = { ...searchInputData };
      Object.keys(tempSearchInputDataState).forEach((name) => {
        if (searchInputData && searchInputData[name] !== undefined) {
          switch (tempSearchInputDataState[name].dataType) {
            case 'shortText':
              if (!tempSearchInputDataState[name].inputValues) {
                tempSearchInputDataState[name].inputValues = [''];
              }
              if (
                searchInputData[name].defaultValues &&
                !tempSearchInputDataState[name].inputValues
              ) {
                tempSearchInputDataState[name].inputValues = searchInputData[name].defaultValues;
              }

              tempSearchInputDataState[name].hasChanged = false;

              break;
            case 'singleChoice':
              if (
                !searchInputData[name].defaultValues &&
                !tempSearchInputDataState[name].inputValues
              ) {
                tempSearchInputDataState[name].inputValues = [
                  ...tempSearchInputDataState[name].options!,
                ];
              }
              if (
                searchInputData[name].defaultValues &&
                !tempSearchInputDataState[name].inputValues
              ) {
                tempSearchInputDataState[name].inputValues = [
                  ...searchInputData[name].defaultValues!,
                ];
              }

              tempSearchInputDataState[name].hasChanged = false;

              break;

            case 'MultipleChoices':
              tempSearchInputDataState[name].inputValues = tempSearchInputDataState[name].options;

              tempSearchInputDataState[name].hasChanged = false;
              break;

            default:
              break;
          }
        }
      });
    }, [formFieldTypes]);

    const setSearchInputDataChange = useCallback(
      (
        name: string,
        inputIdx: number | undefined,
        newValue: string | RVSelectOptionItem[],
        isChecked?: boolean
      ) => {
        if (searchInputData && searchInputData[name] !== undefined) {
          let tempSearchInputDataState = { ...searchInputData };
          if (tempSearchInputDataState[name] === undefined) {
            return;
          }
          switch (tempSearchInputDataState[name].dataType) {
            case 'shortText':
              if (inputIdx === undefined) {
                break;
              }
              if (
                !searchInputData[name].defaultValues &&
                !tempSearchInputDataState[name].inputValues
              ) {
                tempSearchInputDataState[name].inputValues = [''];
              }
              if (
                searchInputData[name].defaultValues &&
                !tempSearchInputDataState[name].inputValues
              ) {
                tempSearchInputDataState[name].inputValues = searchInputData[name].defaultValues;
              }
              if (searchInputData[name].inputValues[inputIdx] !== undefined) {
                tempSearchInputDataState[name].inputValues[inputIdx] = newValue;
              } else {
                //@ts-expect-error-next-line
                (tempSearchInputDataState[name].inputValues as string[]).push(newValue);
              }
              tempSearchInputDataState[name].inputValues?.forEach((value: string, idx: number) => {
                if (value === '') {
                  delete tempSearchInputDataState[name].inputValues[idx];
                }
              });
              (tempSearchInputDataState[name].inputValues as string[]).push('');

              tempSearchInputDataState[name].hasChanged =
                JSON.stringify(formFieldTypes[name].defaultValues || []) !==
                JSON.stringify(
                  tempSearchInputDataState[name].inputValues.filter((item: string) => item !== '')
                );

              break;
            case 'singleChoice':
              if (
                !searchInputData[name].defaultValues &&
                !tempSearchInputDataState[name].inputValues
              ) {
                tempSearchInputDataState[name].inputValues = [
                  ...tempSearchInputDataState[name].options!,
                ];
              }
              if (
                searchInputData[name].defaultValues &&
                !tempSearchInputDataState[name].inputValues
              ) {
                tempSearchInputDataState[name].inputValues = [
                  ...searchInputData[name].defaultValues!,
                ];
              }
              //@ts-ignore-next-line
              tempSearchInputDataState[name].inputValues[inputIdx].value = isChecked;
              tempSearchInputDataState[name].hasChanged =
                JSON.stringify(
                  tempSearchInputDataState[name].options?.filter((item) => item.value)
                ) !=
                JSON.stringify(
                  tempSearchInputDataState[name].inputValues?.filter(
                    (item: Record<string, string | boolean>) => item.value
                  )
                );

              break;

            case 'MultipleChoices':
              //@ts-ignore-next-line
              tempSearchInputDataState[name].inputValues = newValue;

              tempSearchInputDataState[name].hasChanged =
                JSON.stringify(
                  tempSearchInputDataState[name].options?.filter((item) => item.value)
                ) !=
                JSON.stringify(
                  tempSearchInputDataState[name].inputValues?.filter(
                    (item: Record<string, string | boolean>) => item.value
                  )
                );

              break;

            default:
              break;
          }
          setSearchInputData(tempSearchInputDataState);
        }
      },
      [searchInputData, formFieldTypes]
    );

    return (
      <>
        <div ref={ref} className={clsx(color, styles.advancedSearchMenuBoxContainer)} {...props}>
          <div className={styles.advancedSearchMenuBoxTitleContainer}>
            <Typography type="H3" className={styles.advancedSearchMenuBoxTitle}>
              Advanced filters
            </Typography>
            <button
              className={clsx(color, styles.advancedSearchMenuBoxCloseButton)}
              onClick={onClose}
            >
              <CloseSvg />
            </button>
          </div>
          <Scrollbar color={RVColorProp.distant} className={styles.advancedSearchMenuItemContainer}>
            <AdvancedSearchMenuInputFields
              searchInputData={searchInputData}
              setSearchInputDataChange={setSearchInputDataChange}
            />
          </Scrollbar>
          <div className={styles.advancedSearchMenuBoxActionsContainer}>
            <Button
              color={RVColorProp.crayola}
              variant={RVVariantProp.white}
              fullCircle
              onClick={onReset}
            >
              <ReloadSvg />
            </Button>
            <Button
              color={color}
              fullWidth
              onClick={() => onFilterSubmit && onFilterSubmit(searchInputData)}
            >
              Filter items
            </Button>
          </div>
        </div>
      </>
    );
  }
);

export default AdvancedSearchMenu;
