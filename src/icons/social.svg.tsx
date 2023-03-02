import { RVSvgProps } from '../types';

const SocialSvg = ({ size, outline, ...props }: RVSvgProps) => {
  return (
    <svg
      width={size || '1em'}
      height={size || '1em'}
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      {...props}
    >
      {outline ? (
        <>
          {' '}
          <g>
            <path
              d="M16 8.22222C17.7182 8.22222 19.1111 6.82933 19.1111 5.11111C19.1111 3.39289 17.7182 2 16 2C14.2818 2 12.8889 3.39289 12.8889 5.11111C12.8889 6.82933 14.2818 8.22222 16 8.22222Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M5.11111 30.0002C6.82933 30.0002 8.22222 28.6073 8.22222 26.8891C8.22222 25.1708 6.82933 23.778 5.11111 23.778C3.39289 23.778 2 25.1708 2 26.8891C2 28.6073 3.39289 30.0002 5.11111 30.0002Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M26.8892 30.0002C28.6074 30.0002 30.0003 28.6073 30.0003 26.8891C30.0003 25.1708 28.6074 23.778 26.8892 23.778C25.171 23.778 23.7781 25.1708 23.7781 26.8891C23.7781 28.6073 25.171 30.0002 26.8892 30.0002Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M16.0002 23.7779C18.5775 23.7779 20.6668 21.6886 20.6668 19.1112C20.6668 16.5339 18.5775 14.4446 16.0002 14.4446C13.4228 14.4446 11.3335 16.5339 11.3335 19.1112C11.3335 21.6886 13.4228 23.7779 16.0002 23.7779Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M16.0001 8.22205V14.4443M7.75562 25.022L12.1112 21.9109M24.2445 25.022L19.8889 21.9109"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </>
      ) : (
        <>
          <g>
            <path
              d="M16 8.22222C17.7182 8.22222 19.1111 6.82933 19.1111 5.11111C19.1111 3.39289 17.7182 2 16 2C14.2818 2 12.8889 3.39289 12.8889 5.11111C12.8889 6.82933 14.2818 8.22222 16 8.22222Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M5.11111 30.0002C6.82933 30.0002 8.22222 28.6073 8.22222 26.8891C8.22222 25.1708 6.82933 23.778 5.11111 23.778C3.39289 23.778 2 25.1708 2 26.8891C2 28.6073 3.39289 30.0002 5.11111 30.0002Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M26.8892 30.0002C28.6074 30.0002 30.0003 28.6073 30.0003 26.8891C30.0003 25.1708 28.6074 23.778 26.8892 23.778C25.171 23.778 23.7781 25.1708 23.7781 26.8891C23.7781 28.6073 25.171 30.0002 26.8892 30.0002Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M16.0002 23.7779C18.5775 23.7779 20.6668 21.6886 20.6668 19.1112C20.6668 16.5339 18.5775 14.4446 16.0002 14.4446C13.4228 14.4446 11.3335 16.5339 11.3335 19.1112C11.3335 21.6886 13.4228 23.7779 16.0002 23.7779Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M16.0001 8.22205V14.4443M7.75562 25.022L12.1112 21.9109M24.2445 25.022L19.8889 21.9109"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </>
      )}
    </svg>
  );
};

export default SocialSvg;
