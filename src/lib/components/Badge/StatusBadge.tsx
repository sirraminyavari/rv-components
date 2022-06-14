import { HTMLAttributes } from 'react';
import * as Styled from './Badge.styles';

interface StatusBadgeProps
  extends Omit<HTMLAttributes<HTMLSpanElement>, 'className'> {
  type: 'default' | 'error';
}

/**
 *  @description Renders a status badge component.
 * @component
 * @param {string|number} props.children - The value of the badge.
 * @param {('default'|'error')} props.type - type of the badge
 */
function StatusBadge({
  type = 'default',
  children,
  ...restProps
}: StatusBadgeProps): JSX.Element {
  return (
    <Styled.PureBadge type={type} {...restProps}>
      {children}
    </Styled.PureBadge>
  );
}

StatusBadge.displayName = 'StatusBadge';

export default StatusBadge;
