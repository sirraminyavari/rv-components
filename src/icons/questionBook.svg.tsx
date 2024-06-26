import { RVSvgProps } from '../types';

const QuestionBookSvg = ({ size, outline, ...props }: RVSvgProps) => {
  return (
    <svg
      width={size || '1em'}
      height={size || '1em'}
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {outline ? (
        <>
          <path
            fill="currentColor"
            d="M4 4v12a2 2 0 0 0 2 2h9.5a.5.5 0 0 0 0-1H6a1 1 0 0 1-1-1h10a1 1 0 0 0 1-1V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2m10-1a1 1 0 0 1 1 1v11H5V4a1 1 0 0 1 1-1zM8.76 6.409C8.95 6.21 9.31 6 10 6s1.05.211 1.24.409c.2.21.26.456.26.591c0 .454-.27.698-.723.924a7 7 0 0 1-.343.156l-.022.01a5 5 0 0 0-.324.147a1.5 1.5 0 0 0-.345.228A.73.73 0 0 0 9.5 9v1a.5.5 0 1 0 1 0v-.85l.037-.02c.075-.038.166-.077.283-.127l.011-.005c.117-.051.253-.11.392-.18C11.77 8.548 12.5 8.047 12.5 7c0-.365-.14-.869-.54-1.284C11.55 5.29 10.91 5 10 5s-1.55.289-1.96.716c-.4.415-.54.919-.54 1.284a.5.5 0 0 0 1 0c0-.135.06-.381.26-.591M10 13a.75.75 0 1 0 0-1.5a.75.75 0 0 0 0 1.5"
          />
        </>
      ) : (
        <>
          <path
            fill="currentColor"
            d="M6 2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h9.5a.5.5 0 0 0 0-1H6a1 1 0 0 1-1-1h10a1 1 0 0 0 1-1V4a2 2 0 0 0-2-2zm2.76 4.409A.9.9 0 0 0 8.5 7a.5.5 0 0 1-1 0c0-.365.14-.869.54-1.284C8.45 5.29 9.09 5 10 5s1.55.289 1.96.716c.4.415.54.919.54 1.284c0 1.046-.73 1.547-1.277 1.819a8 8 0 0 1-.392.179l-.011.005a6 6 0 0 0-.32.146V10a.5.5 0 0 1-1 .001V9c0-.248.128-.426.243-.535c.109-.102.24-.175.345-.228c.102-.052.218-.102.324-.147l.022-.01c.118-.051.232-.1.343-.156c.453-.226.723-.47.723-.924a.9.9 0 0 0-.26-.591C11.05 6.21 10.69 6 10 6s-1.05.211-1.24.409M10 13a.75.75 0 1 1 0-1.5a.75.75 0 0 1 0 1.5"
          />
        </>
      )}
    </svg>
  );
};

export default QuestionBookSvg;
