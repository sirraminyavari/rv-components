import { RVSvgProps } from '../types';

const FileTrayFullSvg = ({ size, outline, ...props }: RVSvgProps) => {
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
            stroke-linejoin="round"
            stroke-width="32"
            d="M384 80H128c-26 0-43 14-48 40L48 272v112a48.14 48.14 0 0 0 48 48h320a48.14 48.14 0 0 0 48-48V272l-32-152c-5-27-23-40-48-40Z"
          />
          <path
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="32"
            d="M48 272h144m128 0h144m-272 0a64 64 0 0 0 128 0M144 144h224m-240 64h256"
          />
        </>
      ) : (
        <>
          <path
            fill="currentColor"
            d="m479.66 268.7l-32-151.81C441.48 83.77 417.68 64 384 64H128c-16.8 0-31 4.69-42.1 13.94s-18.37 22.31-21.58 38.89l-32 151.87A16.65 16.65 0 0 0 32 272v112a64 64 0 0 0 64 64h320a64 64 0 0 0 64-64V272a16.65 16.65 0 0 0-.34-3.3Zm-384-145.4v-.28c3.55-18.43 13.81-27 32.29-27H384c18.61 0 28.87 8.55 32.27 26.91c0 .13.05.26.07.39l26.93 127.88a4 4 0 0 1-3.92 4.82H320a15.92 15.92 0 0 0-16 15.82a48 48 0 1 1-96 0A15.92 15.92 0 0 0 192 256H72.65a4 4 0 0 1-3.92-4.82Z"
          />
          <path
            fill="currentColor"
            d="M368 160H144a16 16 0 0 1 0-32h224a16 16 0 0 1 0 32Zm16 64H128a16 16 0 0 1 0-32h256a16 16 0 0 1 0 32Z"
          />
        </>
      )}
    </svg>
  );
};

export default FileTrayFullSvg;
