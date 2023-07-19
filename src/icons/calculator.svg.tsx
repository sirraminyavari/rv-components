import { RVSvgProps } from '../types';

const CalculatorSvg = ({ size, outline, ...props }: RVSvgProps) => {
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
            width="288"
            height="416"
            x="112"
            y="48"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="32"
            rx="32"
            ry="32"
          />
          <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="32"
            d="M160.01 112H352v64H160.01z"
          />
          <circle cx="168" cy="248" r="24" fill="currentColor" />
          <circle cx="256" cy="248" r="24" fill="currentColor" />
          <circle cx="344" cy="248" r="24" fill="currentColor" />
          <circle cx="168" cy="328" r="24" fill="currentColor" />
          <circle cx="256" cy="328" r="24" fill="currentColor" />
          <circle cx="168" cy="408" r="24" fill="currentColor" />
          <circle cx="256" cy="408" r="24" fill="currentColor" />
          <rect width="48" height="128" x="320" y="304" fill="currentColor" rx="24" ry="24" />
        </>
      ) : (
        <>
          <path
            fill="currentColor"
            d="M416 80a48.05 48.05 0 0 0-48-48H144a48.05 48.05 0 0 0-48 48v352a48.05 48.05 0 0 0 48 48h224a48.05 48.05 0 0 0 48-48ZM168 432a24 24 0 1 1 24-24a24 24 0 0 1-24 24Zm0-80a24 24 0 1 1 24-24a24 24 0 0 1-24 24Zm0-80a24 24 0 1 1 24-24a24 24 0 0 1-24 24Zm88 160a24 24 0 1 1 24-24a24 24 0 0 1-24 24Zm0-80a24 24 0 1 1 24-24a24 24 0 0 1-24 24Zm0-80a24 24 0 1 1 24-24a24 24 0 0 1-24 24Zm112 136a24 24 0 0 1-48 0v-80a24 24 0 0 1 48 0Zm-24-136a24 24 0 1 1 24-24a24 24 0 0 1-24 24Zm19.31-100.69A16 16 0 0 1 352 176H160a16 16 0 0 1-16-16V96a16 16 0 0 1 16-16h192a16 16 0 0 1 16 16v64a16 16 0 0 1-4.69 11.31Z"
          />
        </>
      )}
    </svg>
  );
};

export default CalculatorSvg;
