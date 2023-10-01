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
import { isEqual, orderBy } from 'lodash';

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
      defaultValues?: undefined;
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
      defaultValues?: undefined;
      options: { label: string; value?: Date }[];
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
    const [updateState, setUpdateState] = useState<number>();
    const [resetState, setResetState] = useState<number | undefined>(Date.now());

    useEffect(() => {
      let tempSearchInputDataState = { ...searchInputData };
      Object.keys(tempSearchInputDataState).forEach((name) => {
        if (searchInputData && searchInputData[name] !== undefined) {
          switch (tempSearchInputDataState[name].dataType) {
            case 'shortText':
              if (
                searchInputData[name].defaultValues &&
                !tempSearchInputDataState[name].inputValues
              ) {
                tempSearchInputDataState[name].inputValues = searchInputData[name].defaultValues;
              }
              if (!tempSearchInputDataState[name].inputValues) {
                tempSearchInputDataState[name].inputValues = [''];
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
      setSearchInputData(tempSearchInputDataState);
      setUpdateState(Date.now());
    }, [formFieldTypes, resetState]);
    const resetFormToInitialData = () => {
      setResetState(undefined);
      setResetState(Date.now());
      setSearchInputData(formFieldTypes);
      if (onReset) onReset();
    };
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
                tempSearchInputDataState[name].inputValues = [
                  //@ts-expect-error-next-line
                  ...searchInputData[name].defaultValues,
                ];
              }
              if (searchInputData[name].inputValues[inputIdx] !== undefined) {
                tempSearchInputDataState[name].inputValues[inputIdx] = newValue;
              } else {
                //@ts-expect-error-next-line
                (tempSearchInputDataState[name].inputValues as string[]).push(newValue);
              }
              tempSearchInputDataState[name].inputValues?.forEach((value: string, idx: number) => {
                if (value === '') {
                  tempSearchInputDataState[name].inputValues.splice(idx, 1);
                }
              });
              tempSearchInputDataState[name].inputValues = (
                tempSearchInputDataState[name].inputValues as string[]
              ).filter((i) => i);

              tempSearchInputDataState[name].inputValues.push('');
              tempSearchInputDataState[name].hasChanged =
                JSON.stringify(formFieldTypes[name].defaultValues || []) !==
                JSON.stringify(
                  tempSearchInputDataState[name].inputValues.filter((item: string) => item !== '')
                );
              console.log(tempSearchInputDataState[name]);

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
              tempSearchInputDataState[name].hasChanged = isEqual(
                orderBy(tempSearchInputDataState[name].options, 'name', 'asc'),
                orderBy(tempSearchInputDataState[name].inputValues, 'name', 'asc')
              );

              console.log(tempSearchInputDataState[name]);

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
          setUpdateState(Date.now());
        }
      },
      [searchInputData, updateState, formFieldTypes]
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
            {resetState && (
              <AdvancedSearchMenuInputFields
                searchInputData={searchInputData}
                setSearchInputDataChange={setSearchInputDataChange}
              />
            )}
          </Scrollbar>
          <div className={styles.advancedSearchMenuBoxActionsContainer}>
            <Button
              color={RVColorProp.crayola}
              variant={RVVariantProp.white}
              fullCircle
              onClick={resetFormToInitialData}
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
