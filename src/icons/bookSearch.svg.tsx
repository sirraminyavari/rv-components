import { RVSvgProps } from '../types';

const BookSearchSvg = ({ size, outline, ...props }: RVSvgProps) => {
  return (
    <svg
      width={size || '1em'}
      height={size || '1em'}
      viewBox="0 0 14 14"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {outline ? (
        <>
          <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10 12.5a2.5 2.5 0 1 0 0-5a2.5 2.5 0 0 0 0 5m3.5 1l-1.73-1.73M7 2A1.5 1.5 0 0 0 5.5.5h-5v10h5M7 2v4.5M7 2A1.5 1.5 0 0 1 8.5.5h5v7"
          />
        </>
      ) : (
        <>
          <path
            fill="currentColor"
            fillRule="evenodd"
            d="M.5.125a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h4.756A4.492 4.492 0 0 1 5 9.625c0-1.271.527-2.42 1.375-3.238v-4.96A2 2 0 0 0 4.5.126zm7.125 1.303v4.105a4.5 4.5 0 0 1 6.347 3.584H14V.625a.5.5 0 0 0-.5-.5h-4a2 2 0 0 0-1.875 1.303M9.5 7.875a1.75 1.75 0 1 0 0 3.5a1.75 1.75 0 0 0 0-3.5m-3.25 1.75a3.25 3.25 0 1 1 6.017 1.706l1.263 1.263a.75.75 0 0 1-1.06 1.061l-1.264-1.263A3.25 3.25 0 0 1 6.25 9.625"
            clipRule="evenodd"
          />
        </>
      )}
    </svg>
  );
};

export default BookSearchSvg;
