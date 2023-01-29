import { RVSvgProps } from '../types';

const InProgressSvg = ({ size, outline, ...props }: RVSvgProps) => {
  return (
    <svg
      width={size || '1em'}
      height={size || '1em'}
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {outline ? (
        <>
          <path
            stroke="currentColor"
            d="M16 2a14 14 0 1 0 14 14A14.016 14.016 0 0 0 16 2Zm0 26a12 12 0 0 1 0-24v12l8.481 8.481A11.963 11.963 0 0 1 16 28Z"
          />
        </>
      ) : (
        <>
          <path
            fill="currentColor"
            d="M16 2a14 14 0 1 0 14 14A14.016 14.016 0 0 0 16 2Zm0 26a12 12 0 0 1 0-24v12l8.481 8.481A11.963 11.963 0 0 1 16 28Z"
          />
        </>
      )}
    </svg>
  );
};

export default InProgressSvg;
