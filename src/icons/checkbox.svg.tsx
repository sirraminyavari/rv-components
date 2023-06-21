import { RVSvgProps } from '../types';

const CheckboxSvg = ({ size, outline, ...props }: RVSvgProps) => {
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
            d="M14.6213 6.14893L8.14947 13.8504L5.37973 10.7702"
            stroke="currentColor"
            stroke-width="1.5"
            fill="transparent"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M3.06907 0.758301H16.9309C17.5438 0.758301 18.1315 1.00174 18.5648 1.43507C18.9981 1.8684 19.2416 2.45613 19.2416 3.06895V16.9308C19.2416 17.5436 18.9981 18.1314 18.5648 18.5647C18.1315 18.998 17.5438 19.2415 16.9309 19.2415H3.06907C2.45625 19.2415 1.86853 18.998 1.4352 18.5647C1.00187 18.1314 0.758423 17.5436 0.758423 16.9308V3.06895C0.758423 2.45613 1.00187 1.8684 1.4352 1.43507C1.86853 1.00174 2.45625 0.758301 3.06907 0.758301V0.758301Z"
            stroke="currentColor"
            fill="transparent"
            stroke-width="1.5"
            stroke-linejoin="round"
          />
        </>
      ) : (
        <>
          <path
            d="M14.6213 6.14893L8.14947 13.8504L5.37973 10.7702"
            stroke="currentColor"
            stroke-width="1.5"
            fill="transparent"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M3.06907 0.758301H16.9309C17.5438 0.758301 18.1315 1.00174 18.5648 1.43507C18.9981 1.8684 19.2416 2.45613 19.2416 3.06895V16.9308C19.2416 17.5436 18.9981 18.1314 18.5648 18.5647C18.1315 18.998 17.5438 19.2415 16.9309 19.2415H3.06907C2.45625 19.2415 1.86853 18.998 1.4352 18.5647C1.00187 18.1314 0.758423 17.5436 0.758423 16.9308V3.06895C0.758423 2.45613 1.00187 1.8684 1.4352 1.43507C1.86853 1.00174 2.45625 0.758301 3.06907 0.758301V0.758301Z"
            stroke="currentColor"
            stroke-width="1.5"
            fill="transparent"
            stroke-linejoin="round"
          />
        </>
      )}
    </svg>
  );
};

export default CheckboxSvg;
