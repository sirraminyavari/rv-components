import { RVSvgProps } from '../types';

export const ArrowLeftSvg = ({ size, outline, ...props }: RVSvgProps) => {
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
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="32"
            d="M249.38 336L170 256l79.38-80m-68.35 80H342"
          />
          <path
            fill="none"
            stroke="currentColor"
            stroke-miterlimit="10"
            stroke-width="32"
            d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192s192-86 192-192Z"
          />
        </>
      ) : (
        <>
          <path
            fill="currentColor"
            d="M48 256c0 114.87 93.13 208 208 208s208-93.13 208-208S370.87 48 256 48S48 141.13 48 256Zm212.65-91.36a16 16 0 0 1 .09 22.63L208.42 240H342a16 16 0 0 1 0 32H208.42l52.32 52.73A16 16 0 1 1 238 347.27l-79.39-80a16 16 0 0 1 0-22.54l79.39-80a16 16 0 0 1 22.65-.09Z"
          />
        </>
      )}
    </svg>
  );
};
export const ArrowRightSvg = ({ size, outline, ...props }: RVSvgProps) => {
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
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="32"
            d="M262.62 336L342 256l-79.38-80m68.35 80H170"
          />
          <path
            fill="none"
            stroke="currentColor"
            stroke-miterlimit="10"
            stroke-width="32"
            d="M256 448c106 0 192-86 192-192S362 64 256 64S64 150 64 256s86 192 192 192Z"
          />
        </>
      ) : (
        <>
          <path
            fill="currentColor"
            d="M464 256c0-114.87-93.13-208-208-208S48 141.13 48 256s93.13 208 208 208s208-93.13 208-208Zm-212.65 91.36a16 16 0 0 1-.09-22.63L303.58 272H170a16 16 0 0 1 0-32h133.58l-52.32-52.73A16 16 0 1 1 274 164.73l79.39 80a16 16 0 0 1 0 22.54l-79.39 80a16 16 0 0 1-22.65.09Z"
          />
        </>
      )}
    </svg>
  );
};
export const ArrowUpSvg = ({ size, outline, ...props }: RVSvgProps) => {
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
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="32"
            d="M176 249.38L256 170l80 79.38m-80-68.35V342"
          />
          <path
            fill="none"
            stroke="currentColor"
            stroke-miterlimit="10"
            stroke-width="32"
            d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192s192-86 192-192Z"
          />
        </>
      ) : (
        <>
          <path
            fill="currentColor"
            d="M256 48C141.13 48 48 141.13 48 256s93.13 208 208 208s208-93.13 208-208S370.87 48 256 48Zm91.36 212.65a16 16 0 0 1-22.63.09L272 208.42V342a16 16 0 0 1-32 0V208.42l-52.73 52.32A16 16 0 1 1 164.73 238l80-79.39a16 16 0 0 1 22.54 0l80 79.39a16 16 0 0 1 .09 22.65Z"
          />
        </>
      )}
    </svg>
  );
};
export const ArrowDownSvg = ({ size, outline, ...props }: RVSvgProps) => {
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
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="32"
            d="M176 262.62L256 342l80-79.38m-80 68.35V170"
          />
          <path
            fill="none"
            stroke="currentColor"
            stroke-miterlimit="10"
            stroke-width="32"
            d="M256 64C150 64 64 150 64 256s86 192 192 192s192-86 192-192S362 64 256 64Z"
          />
        </>
      ) : (
        <>
          <path
            fill="currentColor"
            d="M256 464c114.87 0 208-93.13 208-208S370.87 48 256 48S48 141.13 48 256s93.13 208 208 208Zm-80.09-224L240 303.58V154h32v149.58L336.09 240l22.54 22.71L256 364.54L153.37 262.7Z"
          />
        </>
      )}
    </svg>
  );
};
const ArrowCircleSvg = ({
  direction = 'left',
  ...props
}: RVSvgProps & { direction?: 'left' | 'right' | 'down' | 'up' }) => {
  switch (direction) {
    case 'right':
      return <ArrowRightSvg {...props} />;
    case 'up':
      return <ArrowUpSvg {...props} />;
    case 'left':
      return <ArrowLeftSvg {...props} />;
    case 'down':
      return <ArrowDownSvg {...props} />;
  }
};

export default ArrowCircleSvg;
