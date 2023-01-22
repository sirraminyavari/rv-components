import { RVSvgProps } from '../types';

const AlbumsSvg = ({ size, outline, ...props }: RVSvgProps) => {
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
            d="M368 96H144a16 16 0 0 1 0-32h224a16 16 0 0 1 0 32Zm32 48H112a16 16 0 0 1 0-32h288a16 16 0 0 1 0 32Zm19.13 304H92.87A44.92 44.92 0 0 1 48 403.13V204.87A44.92 44.92 0 0 1 92.87 160h326.26A44.92 44.92 0 0 1 464 204.87v198.26A44.92 44.92 0 0 1 419.13 448Z"
          />
        </>
      ) : (
        <>
          <rect
            width="384"
            height="256"
            x="64"
            y="176"
            fill="none"
            stroke="currentColor"
            stroke-linejoin="round"
            stroke-width="32"
            rx="28.87"
            ry="28.87"
          />
          <path
            fill="currentColor"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-miterlimit="10"
            stroke-width="32"
            d="M144 80h224m-256 48h288"
          />
        </>
      )}
    </svg>
  );
};

export default AlbumsSvg;
