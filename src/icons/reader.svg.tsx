import { RVSvgProps } from '../types';

const ReaderSvg = ({ size, outline, ...props }: RVSvgProps) => {
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
            width="320"
            height="416"
            x="96"
            y="48"
            fill="none"
            stroke="currentColor"
            stroke-linejoin="round"
            stroke-width="32"
            rx="48"
            ry="48"
          />
          <path
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="32"
            d="M176 128h160m-160 80h160m-160 80h80"
          />
        </>
      ) : (
        <>
          <path
            fill="currentColor"
            d="M368 32H144a64.07 64.07 0 0 0-64 64v320a64.07 64.07 0 0 0 64 64h224a64.07 64.07 0 0 0 64-64V96a64.07 64.07 0 0 0-64-64ZM256 304h-80a16 16 0 0 1 0-32h80a16 16 0 0 1 0 32Zm80-80H176a16 16 0 0 1 0-32h160a16 16 0 0 1 0 32Zm0-80H176a16 16 0 0 1 0-32h160a16 16 0 0 1 0 32Z"
          />
        </>
      )}
    </svg>
  );
};

export default ReaderSvg;
