import { RVSvgProps } from '../types';

const RemoteServerSvg = ({ size, outline, ...props }: RVSvgProps) => {
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
          <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12.5 1h-11a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1" />
            <path d="M3.5 4.5a.5.5 0 1 0 0-1a.5.5 0 0 0 0 1m4-.5H11M1.5 7a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1" />
            <path d="M3.5 10.5a.5.5 0 1 0 0-1a.5.5 0 0 0 0 1m4-.5H11" />
          </g>
        </>
      ) : (
        <>
          <path
            fill="currentColor"
            fillRule="evenodd"
            d="M1.5.407a1.5 1.5 0 0 0-1.5 1.5v2.925a1.5 1.5 0 0 0 1.5 1.5h11a1.5 1.5 0 0 0 1.5-1.5V1.907a1.5 1.5 0 0 0-1.5-1.5zM0 9.168a1.5 1.5 0 0 1 1.5-1.5h11a1.5 1.5 0 0 1 1.5 1.5v2.925a1.5 1.5 0 0 1-1.5 1.5h-11a1.5 1.5 0 0 1-1.5-1.5zM2.046 3.37a1.125 1.125 0 1 1 2.25 0a1.125 1.125 0 0 1-2.25 0m0 7.261a1.125 1.125 0 1 1 2.25 0a1.125 1.125 0 0 1-2.25 0m4.829-7.26c0-.346.28-.626.625-.626H11a.625.625 0 1 1 0 1.25H7.5a.625.625 0 0 1-.625-.625Zm.625 6.635a.625.625 0 1 0 0 1.25H11a.625.625 0 1 0 0-1.25z"
            clipRule="evenodd"
          />
        </>
      )}
    </svg>
  );
};

export default RemoteServerSvg;
