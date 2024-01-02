import { RVSvgProps } from '../types';

const ExternalLinkSvg = ({ size, outline, ...props }: RVSvgProps) => {
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
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12.5 2.5C12.5 2.15482 12.7798 1.875 13.125 1.875H17.5C17.8452 1.875 18.125 2.15482 18.125 2.5V6.875C18.125 7.22018 17.8452 7.5 17.5 7.5C17.1548 7.5 16.875 7.22018 16.875 6.875V4.00888L9.19194 11.6919C8.94786 11.936 8.55214 11.936 8.30806 11.6919C8.06398 11.4479 8.06398 11.0521 8.30806 10.8081L15.9911 3.125H13.125C12.7798 3.125 12.5 2.84518 12.5 2.5ZM4.0625 5.625C3.81386 5.625 3.5754 5.72377 3.39959 5.89959C3.22377 6.0754 3.125 6.31386 3.125 6.5625V15.9375C3.125 16.1861 3.22377 16.4246 3.39959 16.6004C3.5754 16.7762 3.81386 16.875 4.0625 16.875H13.4375C13.5606 16.875 13.6825 16.8507 13.7963 16.8036C13.91 16.7565 14.0134 16.6875 14.1004 16.6004C14.1875 16.5134 14.2565 16.41 14.3036 16.2963C14.3507 16.1825 14.375 16.0606 14.375 15.9375V8.75C14.375 8.40482 14.6548 8.125 15 8.125C15.3452 8.125 15.625 8.40482 15.625 8.75V15.9375C15.625 16.2248 15.5684 16.5092 15.4585 16.7746C15.3486 17.04 15.1874 17.2812 14.9843 17.4843C14.7812 17.6874 14.54 17.8486 14.2746 17.9585C14.0092 18.0684 13.7248 18.125 13.4375 18.125H4.0625C3.48234 18.125 2.92594 17.8945 2.5157 17.4843C2.10547 17.0741 1.875 16.5177 1.875 15.9375V6.5625C1.875 5.98234 2.10547 5.42594 2.5157 5.0157C2.92594 4.60547 3.48234 4.375 4.0625 4.375H10.6047C10.9499 4.375 11.2297 4.65482 11.2297 5C11.2297 5.34518 10.9499 5.625 10.6047 5.625H4.0625Z"
            fill="CurrentColor"
          />
        </>
      ) : (
        <>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12.5 2.5C12.5 2.15482 12.7798 1.875 13.125 1.875H17.5C17.8452 1.875 18.125 2.15482 18.125 2.5V6.875C18.125 7.22018 17.8452 7.5 17.5 7.5C17.1548 7.5 16.875 7.22018 16.875 6.875V4.00888L9.19194 11.6919C8.94786 11.936 8.55214 11.936 8.30806 11.6919C8.06398 11.4479 8.06398 11.0521 8.30806 10.8081L15.9911 3.125H13.125C12.7798 3.125 12.5 2.84518 12.5 2.5ZM4.0625 5.625C3.81386 5.625 3.5754 5.72377 3.39959 5.89959C3.22377 6.0754 3.125 6.31386 3.125 6.5625V15.9375C3.125 16.1861 3.22377 16.4246 3.39959 16.6004C3.5754 16.7762 3.81386 16.875 4.0625 16.875H13.4375C13.5606 16.875 13.6825 16.8507 13.7963 16.8036C13.91 16.7565 14.0134 16.6875 14.1004 16.6004C14.1875 16.5134 14.2565 16.41 14.3036 16.2963C14.3507 16.1825 14.375 16.0606 14.375 15.9375V8.75C14.375 8.40482 14.6548 8.125 15 8.125C15.3452 8.125 15.625 8.40482 15.625 8.75V15.9375C15.625 16.2248 15.5684 16.5092 15.4585 16.7746C15.3486 17.04 15.1874 17.2812 14.9843 17.4843C14.7812 17.6874 14.54 17.8486 14.2746 17.9585C14.0092 18.0684 13.7248 18.125 13.4375 18.125H4.0625C3.48234 18.125 2.92594 17.8945 2.5157 17.4843C2.10547 17.0741 1.875 16.5177 1.875 15.9375V6.5625C1.875 5.98234 2.10547 5.42594 2.5157 5.0157C2.92594 4.60547 3.48234 4.375 4.0625 4.375H10.6047C10.9499 4.375 11.2297 4.65482 11.2297 5C11.2297 5.34518 10.9499 5.625 10.6047 5.625H4.0625Z"
            fill="CurrentColor"
          />
        </>
      )}
    </svg>
  );
};

export default ExternalLinkSvg;