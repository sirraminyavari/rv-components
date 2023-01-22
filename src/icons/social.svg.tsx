import { RVSvgProps } from '../types';

const SocialSvg = ({ size, outline, ...props }: RVSvgProps) => {
  return (
    <svg
      width={size || '1em'}
      height={size || '1em'}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {outline ? (
        <>
          <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><circle cx="12" cy="5" r="2"/><circle cx="5" cy="19" r="2"/><circle cx="19" cy="19" r="2"/><circle cx="12" cy="14" r="3"/><path d="M12 7v4m-5.3 6.8l2.8-2m7.8 2l-2.8-2"/></g>
        </>
      ) : (
        <>
          <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><circle cx="12" cy="5" r="2"/><circle cx="5" cy="19" r="2"/><circle cx="19" cy="19" r="2"/><circle cx="12" cy="14" r="3"/><path d="M12 7v4m-5.3 6.8l2.8-2m7.8 2l-2.8-2"/></g>
        </>
      )}
    </svg>
  );
};

export default SocialSvg;
