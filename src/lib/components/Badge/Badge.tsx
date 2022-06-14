/**
 * A Badge component
 */
import React, { HTMLAttributes } from 'react';
import * as Styled from './Badge.styles';

interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
  value: number;
  limit: number;
  showText?: string;
}

/**
 * @description Renders a badge component.
 * @component
 * @property {number} props.value - The value of the badge.
 * @property {number} props.limit - The maximum number to show, If exceeds the limitation will show '+'.
 * @property {string} [props.showText] - The data that must show to user, Ignore value and limitation.
 */
function Badge({
  value,
  limit = 100,
  showText = '',
  ...rest
}: BadgeProps): JSX.Element {
  const getBadgeValue = () => {
    if (value < limit) {
      return value;
    }
    return `+${limit - 1}`;
  };

  return (
    <Styled.BadgeWrapper length={`${value}`.length} {...rest}>
      {showText || getBadgeValue()}
    </Styled.BadgeWrapper>
  );
}

Badge.displayName = 'BadgeComponent';

export default Badge;
