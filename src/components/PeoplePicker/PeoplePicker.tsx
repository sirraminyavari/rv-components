import clsx from 'clsx';
import {
  forwardRef,
  FunctionComponent,
  HTMLAttributes,
  Ref,
  useEffect,
  useState,
} from 'react';

import { usePopper } from 'react-popper';

import { RVColorProp, RVSizeProp, RVVariantProp } from '../../types';
import { PersonCircleSvg, SearchSvg } from '../../icons';
import { RVTextInput, TextInput } from '../TextInput';
import styles from './PeoplePicker.module.scss';
import { createPortal } from 'react-dom';
import { Scrollbar } from '../Scrollbar';
import { Avatar } from '../Avatar';

export interface RVPeoplePicker extends RVTextInput {
  disabled?: boolean;
  TriggerButtonElement: FunctionComponent<
    HTMLAttributes<HTMLButtonElement | HTMLDivElement> & {
      ref: Ref<HTMLDivElement | HTMLButtonElement>;
    }
  >;
  onSearch?: (userInput: string) => void;
  peopleList: {
    id: string;
    label?: string;
    avatarSrc?: string;
    selected: boolean;
  }[];
}

const PeoplePicker = forwardRef<HTMLInputElement, RVPeoplePicker>(
  (
    {
      className,
      disabled,
      onChange,
      color = RVColorProp.cgBlue,
      variant = RVVariantProp.outline,
      TriggerButtonElement,
      peopleList = [],
      onSearch,
      ...props
    },
    ref
  ) => {
    const [referenceElement, setReferenceElement] =
      useState<HTMLButtonElement | null>(null);
    const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
      null
    );
    const [isOpen, setIsOpen] = useState(false);
    const { styles: popperStyles, attributes: popperAttributes } = usePopper(
      referenceElement,
      popperElement,
      { placement: 'bottom-end' }
    );
    useEffect(() => {
      return () => {
        setIsOpen(false);
      };
    }, []);

    return (
      <>
        <TriggerButtonElement
          ref={setReferenceElement as Ref<HTMLButtonElement | HTMLDivElement>}
          onClick={() => setIsOpen((prev) => !prev)}
        />
        {createPortal(
          <>
            {!disabled && isOpen && (
              <div
                ref={setPopperElement}
                style={popperStyles.popper}
                {...popperAttributes.popper}
                className={styles.peoplePickerBoxContainer}
              >
                <TextInput
                  ref={ref}
                  variant={variant}
                  color={RVColorProp.distant}
                  Icon={SearchSvg}
                  IconPosition="trailing"
                  {...props}
                  onChange={(e) => {
                    if (onSearch) onSearch(e.currentTarget.value);
                  }}
                />
                <div className={styles.peoplePickerBoxItemContainer}>
                  <Scrollbar
                    variant={variant}
                    color={RVColorProp.distant}
                    className={styles.peoplePickerBoxItemContainer}
                  >
                    {peopleList.map((item) => {
                      return (
                        <button
                          key={item.id}
                          className={clsx(
                            color,
                            styles.peoplePickerBoxItem,
                            item.selected && styles.active
                          )}
                        >
                          {item.avatarSrc ? (
                            <Avatar
                              src={item.avatarSrc}
                              size={RVSizeProp.small}
                              rounded="full"
                              color={
                                item.selected ? color : RVColorProp.distant
                              }
                              variant={variant}
                              className={styles.peoplePickerBoxItemAvatar}
                            />
                          ) : (
                            <PersonCircleSvg
                              className={styles.peoplePickerBoxItemNoAvatar}
                            />
                          )}
                          <span
                            className={clsx(
                              RVColorProp.distant,
                              styles.peoplePickerBoxItemTitle
                            )}
                          >
                            {item.label || '----'}
                          </span>
                        </button>
                      );
                    })}
                  </Scrollbar>
                </div>
              </div>
            )}
          </>,
          document.body
        )}
      </>
    );
  }
);

export default PeoplePicker;
