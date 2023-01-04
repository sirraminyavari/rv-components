import { RVSvgProps } from '../../types';

const BriefcaseSvg = ({ size, outline, ...props }: RVSvgProps) => {
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
            width="448"
            height="320"
            x="32"
            y="128"
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
            d="M144 128V96a32 32 0 0 1 32-32h160a32 32 0 0 1 32 32v32m112 112H32m288 0v24a8 8 0 0 1-8 8H200a8 8 0 0 1-8-8v-24"
          />
        </>
      ) : (
        <>
          <path
            fill="none"
            d="M336 80H176a16 16 0 0 0-16 16v16h192V96a16 16 0 0 0-16-16Z"
          />
          <path
            fill="currentColor"
            d="M496 176a64.07 64.07 0 0 0-64-64h-48V96a48.05 48.05 0 0 0-48-48H176a48.05 48.05 0 0 0-48 48v16H80a64.07 64.07 0 0 0-64 64v48h480Zm-144-64H160V96a16 16 0 0 1 16-16h160a16 16 0 0 1 16 16Zm-16 152a24 24 0 0 1-24 24H200a24 24 0 0 1-24-24v-4a4 4 0 0 0-4-4H16v144a64 64 0 0 0 64 64h352a64 64 0 0 0 64-64V256H340a4 4 0 0 0-4 4Z"
          />
        </>
      )}
    </svg>
  );
};

export default BriefcaseSvg;
