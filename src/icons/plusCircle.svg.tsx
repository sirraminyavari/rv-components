import { RVSvgProps } from '../types';

const PlusCircleSvg = ({ size, outline, ...props }: RVSvgProps) => {
  return (
    <svg
      width={size || '1em'}
      height={size || '1em'}
      viewBox="0 0 36 36"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {outline ? (
        <>
          <path
            fill="currentColor"
            d="M26.17 17H19V9.83a1 1 0 0 0-2 0V17H9.83a1 1 0 0 0 0 2H17v7.17a1 1 0 0 0 2 0V19h7.17a1 1 0 0 0 0-2Z"
          />
          <path
            fill="currentColor"
            d="M18 2a16 16 0 1 0 16 16A16 16 0 0 0 18 2Zm0 30a14 14 0 1 1 14-14a14 14 0 0 1-14 14Z"
          />
          <path fill="none" d="M0 0h36v36H0z" />
        </>
      ) : (
        <>
          <path
            fill="currentColor"
            d="M34 18A16 16 0 1 1 18 2a16 16 0 0 1 16 16Zm-8.41-1.5H19.5v-6.09a1.5 1.5 0 0 0-3 0v6.09h-6.09a1.5 1.5 0 0 0 0 3h6.09v6.09a1.5 1.5 0 0 0 3 0V19.5h6.09a1.5 1.5 0 0 0 0-3Z"
          />
          <path fill="none" d="M0 0h36v36H0z" />
        </>
      )}
    </svg>
  );
};

export default PlusCircleSvg;
