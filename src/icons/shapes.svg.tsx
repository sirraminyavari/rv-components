import { RVSvgProps } from '../types';

const ShapesSvg = ({ size, outline, ...props }: RVSvgProps) => {
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
          <path
            fill="none"
            stroke="currentColor"
            strokeLinejoin="round"
            strokeWidth="32"
            d="M336 320H32L184 48l152 272z"
          />
          <path
            fill="none"
            stroke="currentColor"
            strokeLinejoin="round"
            strokeWidth="32"
            d="M265.32 194.51A144 144 0 1 1 192 320"
          />
        </>
      ) : (
        <>
          <path
            fill="currentColor"
            d="M336 336H32a16 16 0 0 1-14-23.81l152-272a16 16 0 0 1 27.94 0l152 272A16 16 0 0 1 336 336Z"
          />
          <path
            fill="currentColor"
            d="M336 160a161.07 161.07 0 0 0-32.57 3.32l74.47 133.27A48 48 0 0 1 336 368H183.33A160 160 0 1 0 336 160Z"
          />
        </>
      )}
    </svg>
  );
};

export default ShapesSvg;
