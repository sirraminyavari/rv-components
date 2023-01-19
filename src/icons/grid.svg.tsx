import { RVSvgProps } from '../types';

const GridSvg = ({ size, outline, ...props }: RVSvgProps) => {
  return (
    <svg
      width={size || '1em'}
      height={size || '1em'}
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {outline ? (
        <>
          <rect
            width="176"
            height="176"
            x="48"
            y="48"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="32"
            rx="20"
            ry="20"
          />
          <rect
            width="176"
            height="176"
            x="288"
            y="48"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="32"
            rx="20"
            ry="20"
          />
          <rect
            width="176"
            height="176"
            x="48"
            y="288"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="32"
            rx="20"
            ry="20"
          />
          <rect
            width="176"
            height="176"
            x="288"
            y="288"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="32"
            rx="20"
            ry="20"
          />
        </>
      ) : (
        <>
          <path
            fill="currentColor"
            d="M204 240H68a36 36 0 0 1-36-36V68a36 36 0 0 1 36-36h136a36 36 0 0 1 36 36v136a36 36 0 0 1-36 36Zm240 0H308a36 36 0 0 1-36-36V68a36 36 0 0 1 36-36h136a36 36 0 0 1 36 36v136a36 36 0 0 1-36 36ZM204 480H68a36 36 0 0 1-36-36V308a36 36 0 0 1 36-36h136a36 36 0 0 1 36 36v136a36 36 0 0 1-36 36Zm240 0H308a36 36 0 0 1-36-36V308a36 36 0 0 1 36-36h136a36 36 0 0 1 36 36v136a36 36 0 0 1-36 36Z"
          />
        </>
      )}
    </svg>
  );
};

export default GridSvg;
