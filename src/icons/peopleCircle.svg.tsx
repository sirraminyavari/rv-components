import { RVSvgProps } from '../types';

const PeopleCircleSvg = ({ size, outline, ...props }: RVSvgProps) => {
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
            fill="currentColor"
            d="M256 464c-114.69 0-208-93.31-208-208S141.31 48 256 48s208 93.31 208 208s-93.31 208-208 208Zm0-384c-97 0-176 79-176 176s79 176 176 176s176-78.95 176-176S353.05 80 256 80Z"
          />
          <path
            fill="currentColor"
            d="M323.67 292c-17.4 0-34.21-7.72-47.34-21.73a83.76 83.76 0 0 1-22-51.32c-1.47-20.7 4.88-39.75 17.88-53.62S303.38 144 323.67 144c20.14 0 38.37 7.62 51.33 21.46s19.47 33 18 53.51a84 84 0 0 1-22 51.3C357.86 284.28 341.06 292 323.67 292Zm55.81-74Zm-215.66 77.36c-29.76 0-55.93-27.51-58.33-61.33c-1.23-17.32 4.15-33.33 15.17-45.08s26.22-18 43.15-18s32.12 6.44 43.07 18.14s16.5 27.82 15.25 45c-2.44 33.77-28.6 61.27-58.31 61.27Zm256.55 59.92c-1.59-4.7-5.46-9.71-13.22-14.46c-23.46-14.33-52.32-21.91-83.48-21.91c-30.57 0-60.23 7.9-83.53 22.25c-26.25 16.17-43.89 39.75-51 68.18c-1.68 6.69-4.13 19.14-1.51 26.11a192.18 192.18 0 0 0 232.75-80.17Zm-256.74 46.09c7.07-28.21 22.12-51.73 45.47-70.75a8 8 0 0 0-2.59-13.77c-12-3.83-25.7-5.88-42.69-5.88c-23.82 0-49.11 6.45-68.14 18.17c-5.4 3.33-10.7 4.61-14.78 5.75a192.84 192.84 0 0 0 77.78 86.64l1.79-.14a102.82 102.82 0 0 1 3.16-20.02Z"
          />
        </>
      ) : (
        <>
          <path
            fill="currentColor"
            d="M258.9 48C141.92 46.42 46.42 141.92 48 258.9c1.56 112.19 92.91 203.54 205.1 205.1c117 1.6 212.48-93.9 210.88-210.88C462.44 140.91 371.09 49.56 258.9 48Zm-3.68 152.11c.21-1.2.44-2.4.71-3.59a66.46 66.46 0 0 1 16.29-31.21c12.89-13.73 31.16-21.31 51.45-21.31a74.05 74.05 0 0 1 25.06 4.26a66.69 66.69 0 0 1 26.27 17.2a68.15 68.15 0 0 1 18 42.14a78.46 78.46 0 0 1 0 11.4a86.19 86.19 0 0 1-8.2 31q-.76 1.59-1.59 3.15c-1.11 2.07-2.3 4.1-3.58 6.06a79.47 79.47 0 0 1-8.63 11c-13.12 14-29.92 21.73-47.31 21.73a59.61 59.61 0 0 1-19.17-3.18a63.47 63.47 0 0 1-6.1-2.43a70.76 70.76 0 0 1-22.07-16.12a83.76 83.76 0 0 1-22-51.32q-.27-3.88-.18-7.68a75.62 75.62 0 0 1 1.05-11.08Zm-149.73 24.34a59.87 59.87 0 0 1 5.2-20.64a56.76 56.76 0 0 1 2.78-5.3a54.49 54.49 0 0 1 7.19-9.56a55.62 55.62 0 0 1 14-10.82a56.84 56.84 0 0 1 8.11-3.64a63.85 63.85 0 0 1 33.35-2.39a57 57 0 0 1 30.78 17a57.86 57.86 0 0 1 15.41 38.62c.05 2.11 0 4.23-.15 6.38a71.58 71.58 0 0 1-6 23.84a69.49 69.49 0 0 1-5.73 10.42a65.39 65.39 0 0 1-15.76 16.57c-1.5 1.07-3.06 2.07-4.67 3.07a54.21 54.21 0 0 1-10 4.65a49.31 49.31 0 0 1-16.2 2.76c-.93 0-1.86 0-2.78-.08a47.6 47.6 0 0 1-5.48-.62a51.19 51.19 0 0 1-5.35-1.23a53.54 53.54 0 0 1-7.72-2.89c-.84-.39-1.66-.8-2.48-1.23c-18-9.49-31.57-29.16-34.23-52.12c-.12-1.05-.22-2.1-.29-3.16a66.59 66.59 0 0 1 .02-9.63Zm53.92 178.6a177.27 177.27 0 0 1-61.94-70.65a4 4 0 0 1 1.62-5.26C117.67 316.69 141.4 311 163.82 311c17 0 30.7 2 42.69 5.88a8 8 0 0 1 2.59 13.77c-23.35 19-38.4 42.54-45.47 70.75a2.77 2.77 0 0 1-4.22 1.65ZM256 432a175.12 175.12 0 0 1-65.7-12.72a4 4 0 0 1-2.4-4.46c.4-2.05.84-3.92 1.23-5.48c7.12-28.43 24.76-52 51-68.18c23.29-14.35 53-22.25 83.52-22.25c31.16 0 60 7.58 83.48 21.91a2.72 2.72 0 0 1 .91 3.67A176.1 176.1 0 0 1 256 432Z"
          />
          <path
            fill="currentColor"
            d="M161 295.28a47.6 47.6 0 0 1-5.48-.62a47.6 47.6 0 0 0 5.48.62Zm-26.36-117.15a55.62 55.62 0 0 0-14 10.82a54.49 54.49 0 0 0-7.19 9.56a54.49 54.49 0 0 1 7.19-9.56a55.62 55.62 0 0 1 14-10.82Zm81.53 79.76a71.58 71.58 0 0 0 6-23.84c.15-2.15.2-4.27.15-6.38q.08 3.15-.15 6.38a71.58 71.58 0 0 1-6 23.84Zm-81.53-79.76a56.84 56.84 0 0 1 8.11-3.64a56.84 56.84 0 0 0-8.11 3.64Zm15.57 115.3a53.54 53.54 0 0 1-7.72-2.89a53.54 53.54 0 0 0 7.72 2.89Zm-44.43-56.24c2.66 23 16.26 42.63 34.23 52.12c-18.01-9.49-31.57-29.16-34.23-52.12ZM254.34 219a83.76 83.76 0 0 0 22 51.32a70.76 70.76 0 0 0 22.07 16.12a70.76 70.76 0 0 1-22.07-16.12a83.76 83.76 0 0 1-22-51.32q-.27-3.88-.18-7.68q-.09 3.75.18 7.68Zm50.16 69.82a63.47 63.47 0 0 1-6.1-2.43a63.47 63.47 0 0 0 6.1 2.43Zm-48.57-92.28a66.46 66.46 0 0 1 16.29-31.21a66.46 66.46 0 0 0-16.29 31.21ZM375 165.46a68.15 68.15 0 0 1 18 42.14a68.15 68.15 0 0 0-18-42.14a66.69 66.69 0 0 0-26.27-17.2a66.69 66.69 0 0 1 26.27 17.2ZM393 219a86.19 86.19 0 0 1-8.2 31a86.19 86.19 0 0 0 8.2-31Zm-138.84-7.73a75.62 75.62 0 0 1 1.06-11.14a75.62 75.62 0 0 0-1.06 11.14Zm129.03 41.89Zm-176.31-64.11a57.86 57.86 0 0 1 15.41 38.62a57.86 57.86 0 0 0-15.41-38.62a57 57 0 0 0-30.78-17a57 57 0 0 1 30.78 17ZM190 288a54.21 54.21 0 0 1-10 4.65a54.21 54.21 0 0 0 10-4.65Zm-84.51-63.55a59.87 59.87 0 0 1 5.2-20.64a59.87 59.87 0 0 0-5.2 20.64Zm89.19 60.43C193.17 286 191.61 287 190 288c1.61-1 3.17-2 4.68-3.12Zm21.49-26.99a69.49 69.49 0 0 1-5.73 10.42a69.49 69.49 0 0 0 5.73-10.42Zm-105.48-54.08a56.76 56.76 0 0 1 2.78-5.3a56.76 56.76 0 0 0-2.78 5.3Zm83.99 81.07a65.39 65.39 0 0 0 15.76-16.57a65.39 65.39 0 0 1-15.76 16.57Z"
          />
        </>
      )}
    </svg>
  );
};

export default PeopleCircleSvg;