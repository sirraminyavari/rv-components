/**
 * A Badge component
 */
import { HTMLAttributes } from "react";
import * as Styled from "./Badge.styles";

interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
  value: number;
  limit: number;
  showText?: boolean;
}

/**
 * @description Renders a badge component.
 * @component
 * @property {number} props.value - The value of the badge.
 * @property {number} props.limit - The maximum number to show, If exceeds the limitation will show '+'.
 * @property {string} [props.showText] - The data that must show to user, Ignore value and limitation.
 */
const Badge = ({
  value,
  limit,
  showText,
  ...rest
}: BadgeProps): JSX.Element => {
  const getBadgeValue = () => {
    if (value < limit) {
      return value;
    } else {
      return `+${limit - 1}`;
    }
  };

  return (
    <Styled.BadgeWrapper length={(value + "").length} {...rest}>
      {!!showText ? showText : getBadgeValue()}
    </Styled.BadgeWrapper>
  );
};

Badge.defaultProps = {
  limit: 100,
  showText: "",
};

Badge.displayName = "BadgeComponent";

export default Badge;
