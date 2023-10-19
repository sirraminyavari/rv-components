import { RVSvgProps } from '../types';

const CheckedSvg = ({ size, outline, ...props }: RVSvgProps) => {
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
          <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="32"
            d="M416 128L192 384l-96-96"
          />
        </>
      ) : (
        <path
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="32"
          d="M416 128L192 384l-96-96"
        />
      )}
    </svg>
  );
};

export default CheckedSvg;
