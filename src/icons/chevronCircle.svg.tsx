import { RVSvgProps } from '../types';

export const ChevronCircleLeftSvg = ({
  size,
  outline,
  ...props
}: RVSvgProps) => {
  return (
    <svg
      width={size || '1em'}
      height={size || '1em'}
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fill="none"
        stroke="currentColor"
        stroke-miterlimit="10"
        stroke-width="32"
        d="M256 64C150 64 64 150 64 256s86 192 192 192s192-86 192-192S362 64 256 64Z"
      />
      <path
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="32"
        d="m296 352l-96-96l96-96"
      />
    </svg>
  );
};
export const ChevronCircleRightSvg = ({
  size,
  outline,
  ...props
}: RVSvgProps) => {
  return (
    <svg
      width={size || '1em'}
      height={size || '1em'}
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fill="none"
        stroke="currentColor"
        stroke-miterlimit="10"
        stroke-width="32"
        d="M64 256c0 106 86 192 192 192s192-86 192-192S362 64 256 64S64 150 64 256Z"
      />
      <path
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="32"
        d="m216 352l96-96l-96-96"
      />
    </svg>
  );
};
export const ChevronCircleUpSvg = ({ size, outline, ...props }: RVSvgProps) => {
  return (
    <svg
      width={size || '1em'}
      height={size || '1em'}
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="32"
        d="m352 296l-96-96l-96 96"
      />
      <path
        fill="none"
        stroke="currentColor"
        stroke-miterlimit="10"
        stroke-width="32"
        d="M256 64C150 64 64 150 64 256s86 192 192 192s192-86 192-192S362 64 256 64Z"
      />
    </svg>
  );
};
export const ChevronCircleDownSvg = ({
  size,
  outline,
  ...props
}: RVSvgProps) => {
  return (
    <svg
      width={size || '1em'}
      height={size || '1em'}
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fill="none"
        stroke="currentColor"
        stroke-miterlimit="10"
        stroke-width="32"
        d="M256 64C150 64 64 150 64 256s86 192 192 192s192-86 192-192S362 64 256 64Z"
      />
      <path
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="32"
        d="m352 216l-96 96l-96-96"
      />
    </svg>
  );
};
const ChevronCircleSvg = ({
  direction = 'left',
  ...props
}: RVSvgProps & { direction?: 'left' | 'right' | 'down' | 'up' }) => {
  switch (direction) {
    case 'right':
      return <ChevronCircleRightSvg {...props} />;
    case 'up':
      return <ChevronCircleUpSvg {...props} />;
    case 'left':
      return <ChevronCircleLeftSvg {...props} />;
    case 'down':
      return <ChevronCircleDownSvg {...props} />;
  }
};

export default ChevronCircleSvg;
