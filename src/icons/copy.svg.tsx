import { RVSvgProps } from '../types';

const CopySvg = ({ size, outline, ...props }: RVSvgProps) => {
  return (
    <svg
      width={size || '1em'}
      height={size || '1em'}
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      {...props}
    >
      {outline ? (
        <>
          <rect
            width="336"
            height="336"
            x="128"
            y="128"
            fill="none"
            stroke="currentColor"
            strokeLinejoin="round"
            strokeWidth="32"
            rx="57"
            ry="57"
          />
          <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="32"
            d="m383.5 128l.5-24a56.16 56.16 0 0 0-56-56H112a64.19 64.19 0 0 0-64 64v216a56.16 56.16 0 0 0 56 56h24"
          />
        </>
      ) : (
        <>
          <path
            fill="currentColor"
            d="M408 480H184a72 72 0 0 1-72-72V184a72 72 0 0 1 72-72h224a72 72 0 0 1 72 72v224a72 72 0 0 1-72 72Z"
          />
          <path
            fill="currentColor"
            d="M160 80h235.88A72.12 72.12 0 0 0 328 32H104a72 72 0 0 0-72 72v224a72.12 72.12 0 0 0 48 67.88V160a80 80 0 0 1 80-80Z"
          />
        </>
      )}
    </svg>
  );
};

export default CopySvg;
