import { RVSvgProps } from '../types';

const ChartColumnBarSvg = ({ size, outline, ...props }: RVSvgProps) => {
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
            fill="currentColor"
            d="M27 28V6h-8v22h-4V14H7v14H4V2H2v26a2 2 0 0 0 2 2h26v-2Zm-14 0H9V16h4Zm12 0h-4V8h4Z"
          />
        </>
      ) : (
        <>
          <path
            fill="currentColor"
            d="M27 28V6h-8v22h-4V14H7v14H4V2H2v26a2 2 0 0 0 2 2h26v-2Zm-14 0H9V16h4Zm12 0h-4V8h4Z"
          />
        </>
      )}
    </svg>
  );
};

export default ChartColumnBarSvg;
