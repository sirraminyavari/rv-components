import { RVSvgProps } from '../types';

export const CaretLeftSvg = ({ size, outline, ...props }: RVSvgProps) => {
  return (
    <svg
      width={size || '1em'}
      height={size || '1em'}
      viewBox="0 0 256 256"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {outline ? (
        <>
          <path
            fill="currentColor"
            d="m160 208l-80-80l80-80v160z"
            opacity=".1"
          />
          <path
            fill="currentColor"
            d="M160 216a8.3 8.3 0 0 1-5.7-2.3l-80-80a8.1 8.1 0 0 1 0-11.4l80-80a8.4 8.4 0 0 1 8.8-1.7A8 8 0 0 1 168 48v160a8 8 0 0 1-4.9 7.4a8.5 8.5 0 0 1-3.1.6Zm-68.7-88l60.7 60.7V67.3Z"
          />
        </>
      ) : (
        <>
          <path
            fill="currentColor"
            d="M168 48v160a8 8 0 0 1-4.9 7.4a8.5 8.5 0 0 1-3.1.6a8.3 8.3 0 0 1-5.7-2.3l-80-80a8.1 8.1 0 0 1 0-11.4l80-80a8.4 8.4 0 0 1 8.8-1.7A8 8 0 0 1 168 48Z"
          />
        </>
      )}
    </svg>
  );
};
export const CaretRightSvg = ({ size, outline, ...props }: RVSvgProps) => {
  return (
    <svg
      width={size || '1em'}
      height={size || '1em'}
      viewBox="0 0 256 256"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {outline ? (
        <>
          <path fill="currentColor" d="m96 48l80 80l-80 80V48z" opacity=".1" />
          <path
            fill="currentColor"
            d="M96 216a8.5 8.5 0 0 1-3.1-.6A8 8 0 0 1 88 208V48a8 8 0 0 1 4.9-7.4a8.4 8.4 0 0 1 8.8 1.7l80 80a8.1 8.1 0 0 1 0 11.4l-80 80A8.3 8.3 0 0 1 96 216Zm8-148.7v121.4l60.7-60.7Z"
          />
        </>
      ) : (
        <>
          <path
            fill="currentColor"
            d="m181.7 133.7l-80 80A8.3 8.3 0 0 1 96 216a8.5 8.5 0 0 1-3.1-.6A8 8 0 0 1 88 208V48a8 8 0 0 1 4.9-7.4a8.4 8.4 0 0 1 8.8 1.7l80 80a8.1 8.1 0 0 1 0 11.4Z"
          />
        </>
      )}
    </svg>
  );
};
export const CaretUpSvg = ({ size, outline, ...props }: RVSvgProps) => {
  return (
    <svg
      width={size || '1em'}
      height={size || '1em'}
      viewBox="0 0 256 256"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {outline ? (
        <>
          <path fill="currentColor" d="m48 160l80-80l80 80H48z" opacity=".1 " />
          <path
            fill="currentColor"
            d="M208 168H48a8 8 0 0 1-7.4-4.9a8.4 8.4 0 0 1 1.7-8.8l80-80a8.1 8.1 0 0 1 11.4 0l80 80a8.4 8.4 0 0 1 1.7 8.8a8 8 0 0 1-7.4 4.9ZM67.3 152h121.4L128 91.3Z"
          />
        </>
      ) : (
        <>
          <path
            fill="currentColor"
            d="M215.4 163.1a8 8 0 0 1-7.4 4.9H48a8 8 0 0 1-7.4-4.9a8.4 8.4 0 0 1 1.7-8.8l80-80a8.1 8.1 0 0 1 11.4 0l80 80a8.4 8.4 0 0 1 1.7 8.8Z"
          />
        </>
      )}
    </svg>
  );
};
export const CaretDownSvg = ({ size, outline, ...props }: RVSvgProps) => {
  return (
    <svg
      width={size || '1em'}
      height={size || '1em'}
      viewBox="0 0 256 256"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {outline ? (
        <>
          <path fill="currentColor" d="m48 160l80-80l80 80H48z" opacity=".1 " />
          <path
            fill="currentColor"
            d="M208 168H48a8 8 0 0 1-7.4-4.9a8.4 8.4 0 0 1 1.7-8.8l80-80a8.1 8.1 0 0 1 11.4 0l80 80a8.4 8.4 0 0 1 1.7 8.8a8 8 0 0 1-7.4 4.9ZM67.3 152h121.4L128 91.3Z"
          />
        </>
      ) : (
        <>
          <path
            fill="currentColor"
            d="M215.4 163.1a8 8 0 0 1-7.4 4.9H48a8 8 0 0 1-7.4-4.9a8.4 8.4 0 0 1 1.7-8.8l80-80a8.1 8.1 0 0 1 11.4 0l80 80a8.4 8.4 0 0 1 1.7 8.8Z"
          />
        </>
      )}
    </svg>
  );
};
const CaretSvg = ({
  direction = 'left',
  ...props
}: RVSvgProps & { direction?: 'left' | 'right' | 'down' | 'up' }) => {
  switch (direction) {
    case 'right':
      return <CaretRightSvg {...props} />;
    case 'up':
      return <CaretUpSvg {...props} />;
    case 'left':
      return <CaretLeftSvg {...props} />;
    case 'down':
      return <CaretDownSvg {...props} />;
  }
};

export default CaretSvg;
