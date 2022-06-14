import type {
  DetailedHTMLProps,
  HTMLAttributes,
  KeyboardEvent,
  KeyboardEventHandler,
  ReactNode,
} from 'react';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import classNames from 'classnames';
import usePeriod from '../../hooks/usePeriod';
import { GlobalUtilities } from '../../utilities';
// import { WindowContext } from '../../context/WindowProvider';

export type IInput = Omit<
  DetailedHTMLProps<HTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  'ref'
> & {
  children?: ReactNode;
  type?: string;
  className?: string;
  error?: boolean | string;
  shake?: boolean | number;
  // eslint-disable-next-line no-unused-vars
  afterChangeListener?: (event: KeyboardEvent) => void;
  enterListener?: KeyboardEventHandler<HTMLInputElement>;
  // eslint-disable-next-line no-unused-vars
  changeOrEnterListener?: (event: KeyboardEvent) => void;
  handleKeyDown?: KeyboardEventHandler<HTMLInputElement>;
  timeout?: number;
  loading?: boolean;
  value?: string;
  disabled?: boolean;
};

/**
 * @typedef PropType
 * @property {string} type - type of the input e.g. text, password, etc.
 * @property {boolean | string} error - true means there is an error and strgin value means there is an erorr with a message
 * @property {boolean | number} shake - if true or be a positive number, the component will shake for a second
 * @property {method} afterChangeListener - fires after a timeout after keydown event
 * @property {method} enterListener - fires when the user presses Enter key
 * @property {method} changeOrEnterListener - a combination of 'afterChangeListener' & 'enterListener'
 * @property {number} timeout - determines the timeout for 'afterChangeListener' and 'onEnterOrChange' events
 * @property {object} children - a component that will be rendedred as a button
 */

/**
 * @description Renders an input element
 * @component
 * @param {PropType} props
 */

const Input = React.forwardRef<HTMLInputElement, IInput>(
  (
    {
      type = '',
      error,
      shake = false,
      afterChangeListener,
      enterListener,
      changeOrEnterListener,
      timeout = 1000,
      className,
      style,
      children,
      ...props
    },
    ref
  ) => {
    const errorMessage =
      GlobalUtilities.get_type(error) === 'string' ? error : null;

    const shaking = usePeriod(shake, {}) && !!error;

    const hasButton = GlobalUtilities.get_type(children) === 'json';

    // handle key down events: afterChangeListener, enterListener, changeOrEnterListener
    const hasKeyDownAction = [
      afterChangeListener,
      enterListener,
      changeOrEnterListener,
    ].some((fn) => GlobalUtilities.get_type(fn) === 'function');

    const hasChangeAction = [afterChangeListener, changeOrEnterListener].some(
      (fn) => GlobalUtilities.get_type(fn) === 'function'
    );

    const [changeTimeout, setChangeTimeout] = useState<NodeJS.Timeout | null>(
      null
    );

    const clearChangeTimeout = () => {
      if (changeTimeout) {
        clearTimeout(changeTimeout);
        setChangeTimeout(null);
      }
    };

    useEffect(() => {
      return () => clearChangeTimeout();
    }, []);

    const handleKeyDown = !hasKeyDownAction
      ? null
      : (event: KeyboardEvent<HTMLInputElement>) => {
          if (event.which === 17) return; // 13: enter, 17: ctrl

          clearChangeTimeout();

          if (event.which === 13) {
            if (
              enterListener &&
              GlobalUtilities.get_type(enterListener) === 'function'
            )
              enterListener(event);
            if (
              changeOrEnterListener &&
              GlobalUtilities.get_type(changeOrEnterListener) === 'function'
            )
              changeOrEnterListener(event);
          } else if (hasChangeAction) {
            const to = setTimeout(() => {
              if (
                afterChangeListener &&
                GlobalUtilities.get_type(afterChangeListener) === 'function'
              )
                afterChangeListener(event);
              if (
                changeOrEnterListener &&
                GlobalUtilities.get_type(changeOrEnterListener) === 'function'
              )
                changeOrEnterListener(event);
            }, timeout);

            setChangeTimeout(to);
          }
        };
    // end of handle key down events

    return (
      <InputContainer>
        <input
          ref={ref}
          type={type}
          className={classNames(
            'rv-input',
            error && 'rv-input-invalid',
            shaking && 'rv-shake',
            className
          )}
          style={{
            position: 'relative',
            paddingInlineEnd: hasButton ? '2.2rem' : '',
          }}
          onKeyUp={(e) => handleKeyDown && handleKeyDown(e)}
          autoComplete="off"
          {...props}
        />
        {hasButton && <ButtonContainer>{children}</ButtonContainer>}
        {!!errorMessage && (
          <ErrorContainer className="rv-red">{errorMessage}</ErrorContainer>
        )}
      </InputContainer>
    );
  }
);

Input.displayName = 'InputComponent';

export default Input;

const InputContainer = styled.div`
  position: relative;
  width: 100%;
`;

export const ButtonContainer = styled.div`
  position: absolute;
  display: flex;
  top: 0;
  bottom: 0;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  z-index: 2;
  inset-inline-start: 0.5rem;
`;

const ErrorContainer = styled.div`
  position: absolute;
  bottom: -1rem;
  height: 1rem;
  font-size: 0.6rem;
  inset-inline-start: 0.5rem;
`;
