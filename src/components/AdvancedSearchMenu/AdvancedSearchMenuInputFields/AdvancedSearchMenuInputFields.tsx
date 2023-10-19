import { CheckboxSvg, PenSvg, RadioButtonSvg } from '../../../icons';
import { RVColorProp, RVVariantProp } from '../../../types';
import { Checkbox } from '../../Checkbox';
import { RVSelectOptionItem, Select } from '../../SelectInput';
import { TextInput } from '../../TextInput';
import { RVFormFieldValueTypes } from '../AdvancedSearchMenu';
import { AdvancedSearchMenuItem } from '../AdvancedSearchMenuItem';

export interface RVAdvancedSearchMenuInputFields {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  searchInputData: Record<string, RVFormFieldValueTypes & { inputValues?: any }>;
  setSearchInputDataChange: (
    name: string,
    inputIdx: number | undefined,
    newValue: string | RVSelectOptionItem[],
    isChecked?: boolean
  ) => void;
}

const AdvancedSearchMenuInputFields = ({
  searchInputData,
  setSearchInputDataChange,
}: RVAdvancedSearchMenuInputFields) => {
  return (
    <>
      {Object.entries(searchInputData).map(
        ([
          name,
          {
            dataType,
            inputValues = [],
            canHaveMultipleInputs = false,
            placeholder,
            label = '',
            hasChanged: isActive,
            options = [],
            defaultValues,
          },
        ]) => {
          switch (dataType) {
            case 'shortText':
              if (!canHaveMultipleInputs || inputValues.length === 0)
                return (
                  <AdvancedSearchMenuItem
                    key={`${dataType}-${name}`}
                    Icon={PenSvg}
                    label={label}
                    isActive={isActive}
                  >
                    <TextInput
                      key={`${dataType}-${name}-input-${0}`}
                      id={`${dataType}-${name}-input-${0}`}
                      name={name}
                      label={placeholder}
                      variant={RVVariantProp.outline}
                      color={RVColorProp.distant}
                      defaultValue={inputValues[0]}
                      onChange={(event) => {
                        setSearchInputDataChange(name, 0, event.target.value);
                      }}
                    />
                  </AdvancedSearchMenuItem>
                );
              else
                return (
                  <AdvancedSearchMenuItem
                    key={`${dataType}-${name}`}
                    Icon={PenSvg}
                    label={label}
                    isActive={isActive}
                  >
                    {inputValues.map((value: string, idx: number) => (
                      <TextInput
                        key={`${dataType}-${name}-input-${idx}`}
                        id={`${dataType}-${name}-input-${idx}`}
                        name={name}
                        label={placeholder || label}
                        variant={RVVariantProp.outline}
                        color={RVColorProp.distant}
                        defaultValue={String(value)}
                        onChange={(event) => {
                          setSearchInputDataChange(name, idx, event.target.value);
                        }}
                      />
                    ))}
                  </AdvancedSearchMenuItem>
                );
            case 'singleChoice':
              return (
                <>
                  <AdvancedSearchMenuItem
                    key={`${dataType}-${name}`}
                    Icon={RadioButtonSvg}
                    label={label}
                    isActive={isActive}
                  >
                    {/* @ts-ignore-next-line */}
                    {options.map(({ label: inputLabel, value }, idx) => (
                      <Checkbox
                        key={`${dataType}-${name}-${inputLabel}-input-${idx}`}
                        id={`${dataType}-${name}-${inputLabel}-input-${idx}`}
                        name={`${name}`}
                        label={inputLabel || placeholder}
                        variant={RVVariantProp.outline}
                        color={RVColorProp.distant}
                        checked={Boolean((inputValues[idx] as RVSelectOptionItem)?.value || value)}
                        value={inputLabel}
                        onChange={(event) => {
                          setSearchInputDataChange(
                            name,
                            idx,
                            event.target.value,
                            event.target.checked
                          );
                        }}
                      />
                    ))}
                  </AdvancedSearchMenuItem>
                </>
              );
            case 'MultipleChoices':
              return (
                <>
                  <AdvancedSearchMenuItem
                    key={`${dataType}-${name}`}
                    Icon={CheckboxSvg}
                    label={label}
                    isActive={isActive}
                  >
                    <Select
                      key={`${dataType}-${name}-${label}-input`}
                      id={`${dataType}-${name}-${label}-input`}
                      label={label || placeholder}
                      variant={RVVariantProp.outline}
                      color={RVColorProp.distant}
                      options={options as RVSelectOptionItem[]}
                      selectedOptions={(defaultValues || inputValues) as RVSelectOptionItem[]}
                      menuPlacement="top"
                      isMulti
                      fullWidth
                      placeholder={placeholder}
                      onChange={(selectedItems) => {
                        setSearchInputDataChange(name, undefined, selectedItems);
                      }}
                    />
                  </AdvancedSearchMenuItem>
                </>
              );

            default:
              return <></>;
          }
        }
      )}
    </>
  );
};

export default AdvancedSearchMenuInputFields;
