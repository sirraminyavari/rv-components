import { RVSvgProps } from '../types';

const ListCircleSvg = ({ size, outline, ...props }: RVSvgProps) => {
  return (
    <svg
      width={size || '1em'}
      height={size || '1em'}
      viewBox="0 0 72 72"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {outline ? (
        <>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M6.75 36.2812C6.75 20.1324 19.8511 7.03125 36 7.03125C52.1489 7.03125 65.25 20.1324 65.25 36.2812C65.25 52.4301 52.1489 65.5312 36 65.5312C19.8511 65.5312 6.75 52.4301 6.75 36.2812ZM36 11.5312C22.3364 11.5312 11.25 22.6176 11.25 36.2812C11.25 49.9449 22.3364 61.0312 36 61.0312C49.6636 61.0312 60.75 49.9449 60.75 36.2812C60.75 22.6176 49.6636 11.5312 36 11.5312ZM23.625 27C24.2463 27 24.75 26.4963 24.75 25.875C24.75 25.2537 24.2463 24.75 23.625 24.75C23.0037 24.75 22.5 25.2537 22.5 25.875C22.5 26.4963 23.0037 27 23.625 27ZM20.25 25.875C20.25 24.011 21.761 22.5 23.625 22.5C25.489 22.5 27 24.011 27 25.875C27 27.739 25.489 29.25 23.625 29.25C21.761 29.25 20.25 27.739 20.25 25.875ZM29.25 25.875C29.25 24.6324 30.2574 23.625 31.5 23.625H49.5C50.7426 23.625 51.75 24.6324 51.75 25.875C51.75 27.1176 50.7426 28.125 49.5 28.125H31.5C30.2574 28.125 29.25 27.1176 29.25 25.875ZM23.625 37.2656C24.2463 37.2656 24.75 36.7619 24.75 36.1406C24.75 35.5193 24.2463 35.0156 23.625 35.0156C23.0037 35.0156 22.5 35.5193 22.5 36.1406C22.5 36.7619 23.0037 37.2656 23.625 37.2656ZM20.25 36.1406C20.25 34.2767 21.761 32.7656 23.625 32.7656C25.489 32.7656 27 34.2767 27 36.1406C27 38.0046 25.489 39.5156 23.625 39.5156C21.761 39.5156 20.25 38.0046 20.25 36.1406ZM29.25 36C29.25 34.7574 30.2574 33.75 31.5 33.75H49.5C50.7426 33.75 51.75 34.7574 51.75 36C51.75 37.2426 50.7426 38.25 49.5 38.25H31.5C30.2574 38.25 29.25 37.2426 29.25 36ZM23.625 47.25C24.2463 47.25 24.75 46.7463 24.75 46.125C24.75 45.5037 24.2463 45 23.625 45C23.0037 45 22.5 45.5037 22.5 46.125C22.5 46.7463 23.0037 47.25 23.625 47.25ZM20.25 46.125C20.25 44.261 21.761 42.75 23.625 42.75C25.489 42.75 27 44.261 27 46.125C27 47.989 25.489 49.5 23.625 49.5C21.761 49.5 20.25 47.989 20.25 46.125ZM29.25 45.9844C29.25 44.7417 30.2574 43.7344 31.5 43.7344H49.5C50.7426 43.7344 51.75 44.7417 51.75 45.9844C51.75 47.227 50.7426 48.2344 49.5 48.2344H31.5C30.2574 48.2344 29.25 47.227 29.25 45.9844Z"
            fill="currentColor"
          />
        </>
      ) : (
        <>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M6.75 36.2812C6.75 20.1324 19.8511 7.03125 36 7.03125C52.1489 7.03125 65.25 20.1324 65.25 36.2812C65.25 52.4301 52.1489 65.5312 36 65.5312C19.8511 65.5312 6.75 52.4301 6.75 36.2812ZM36 11.5312C22.3364 11.5312 11.25 22.6176 11.25 36.2812C11.25 49.9449 22.3364 61.0312 36 61.0312C49.6636 61.0312 60.75 49.9449 60.75 36.2812C60.75 22.6176 49.6636 11.5312 36 11.5312ZM23.625 27C24.2463 27 24.75 26.4963 24.75 25.875C24.75 25.2537 24.2463 24.75 23.625 24.75C23.0037 24.75 22.5 25.2537 22.5 25.875C22.5 26.4963 23.0037 27 23.625 27ZM20.25 25.875C20.25 24.011 21.761 22.5 23.625 22.5C25.489 22.5 27 24.011 27 25.875C27 27.739 25.489 29.25 23.625 29.25C21.761 29.25 20.25 27.739 20.25 25.875ZM29.25 25.875C29.25 24.6324 30.2574 23.625 31.5 23.625H49.5C50.7426 23.625 51.75 24.6324 51.75 25.875C51.75 27.1176 50.7426 28.125 49.5 28.125H31.5C30.2574 28.125 29.25 27.1176 29.25 25.875ZM23.625 37.2656C24.2463 37.2656 24.75 36.7619 24.75 36.1406C24.75 35.5193 24.2463 35.0156 23.625 35.0156C23.0037 35.0156 22.5 35.5193 22.5 36.1406C22.5 36.7619 23.0037 37.2656 23.625 37.2656ZM20.25 36.1406C20.25 34.2767 21.761 32.7656 23.625 32.7656C25.489 32.7656 27 34.2767 27 36.1406C27 38.0046 25.489 39.5156 23.625 39.5156C21.761 39.5156 20.25 38.0046 20.25 36.1406ZM29.25 36C29.25 34.7574 30.2574 33.75 31.5 33.75H49.5C50.7426 33.75 51.75 34.7574 51.75 36C51.75 37.2426 50.7426 38.25 49.5 38.25H31.5C30.2574 38.25 29.25 37.2426 29.25 36ZM23.625 47.25C24.2463 47.25 24.75 46.7463 24.75 46.125C24.75 45.5037 24.2463 45 23.625 45C23.0037 45 22.5 45.5037 22.5 46.125C22.5 46.7463 23.0037 47.25 23.625 47.25ZM20.25 46.125C20.25 44.261 21.761 42.75 23.625 42.75C25.489 42.75 27 44.261 27 46.125C27 47.989 25.489 49.5 23.625 49.5C21.761 49.5 20.25 47.989 20.25 46.125ZM29.25 45.9844C29.25 44.7417 30.2574 43.7344 31.5 43.7344H49.5C50.7426 43.7344 51.75 44.7417 51.75 45.9844C51.75 47.227 50.7426 48.2344 49.5 48.2344H31.5C30.2574 48.2344 29.25 47.227 29.25 45.9844Z"
            fill="currentColor"
          />
        </>
      )}
    </svg>
  );
};

export default ListCircleSvg;
