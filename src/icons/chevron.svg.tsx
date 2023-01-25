import { RVSvgProps } from '../types';

export const ChevronLeftSvg = ({ size, outline, ...props }: RVSvgProps) => {
  return (
    <svg
      width={size || '1em'}
      height={size || '1em'}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="m11 7l-5 5l5 5m6-10l-5 5l5 5"
      />
    </svg>
  );
};
export const ChevronRightSvg = ({ size, outline, ...props }: RVSvgProps) => {
  return (
    <svg
      width={size || '1em'}
      height={size || '1em'}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="m7 7l5 5l-5 5m6-10l5 5l-5 5"
      />
    </svg>
  );
};
export const ChevronUpSvg = ({ size, outline, ...props }: RVSvgProps) => {
  return (
    <svg
      width={size || '1em'}
      height={size || '1em'}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="m7 11l5-5l5 5M7 17l5-5l5 5"
      />
    </svg>
  );
};
export const ChevronDownSvg = ({ size, outline, ...props }: RVSvgProps) => {
  return (
    <svg
      width={size || '1em'}
      height={size || '1em'}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="m7 7l5 5l5-5M7 13l5 5l5-5"
      />
    </svg>
  );
};
const ChevronSvg = ({
  direction = 'left',
  ...props
}: RVSvgProps & { direction?: 'left' | 'right' | 'down' | 'up' }) => {
  switch (direction) {
    case 'right':
      return <ChevronRightSvg {...props} />;
    case 'up':
      return <ChevronUpSvg {...props} />;
    case 'left':
      return <ChevronLeftSvg {...props} />;
    case 'down':
      return <ChevronDownSvg {...props} />;
  }
};

export default ChevronSvg;
