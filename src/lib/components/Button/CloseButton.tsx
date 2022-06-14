import type { DetailedHTMLProps, ButtonHTMLAttributes } from 'react';
import classNames from 'classnames';
import React from 'react';
import styled from 'styled-components';
import { BO_RADIUS_CIRCLE } from '../../constant/classnames';
import CloseIcon from '../Icons/CloseIcon/CloseIcon';

export type ICloseButton = Omit<
  DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
  'children' | 'ref'
>;

/**
 * @component - Circular exit button
 */

function CloseButton({ className, ...props }: ICloseButton) {
  return (
    <ExitButton {...props} className={classNames(BO_RADIUS_CIRCLE, className)}>
      <CloseIcon />
    </ExitButton>
  );
}

CloseButton.displayName = 'CloseButton';
export default CloseButton;

const ExitButton = styled.button`
  flex: 0 0 auto;
  display: flex;
  flex-flow: row;
  align-items: center;
  justify-content: center;
  font-weight: bolder;
  color: red;
  width: 1.5rem;
  height: 1.5rem;
  font-size: 0.8rem;

  &:hover {
    color: white;
    background-color: red;
  }
`;
