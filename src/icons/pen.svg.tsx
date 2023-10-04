import { RVSvgProps } from '../types';

const PenSvg = ({ size, outline, ...props }: RVSvgProps) => {
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
          <g clipPath="url(#clip0_2311_1853)">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M9.28531 18.9288C9.27287 18.6331 9.14374 18.3542 8.92618 18.1535C8.70861 17.9527 8.42035 17.8463 8.12452 17.8576H1.15977C1.01124 17.8446 0.861639 17.8627 0.720468 17.9106C0.579295 17.9586 0.449636 18.0354 0.339725 18.1361C0.229815 18.2369 0.142053 18.3594 0.0820141 18.4958C0.0219755 18.6323 -0.00902843 18.7798 -0.00902843 18.9288C-0.00902843 19.0779 0.0219755 19.2254 0.0820141 19.3619C0.142053 19.4983 0.229815 19.6208 0.339725 19.7216C0.449636 19.8223 0.579295 19.8991 0.720468 19.9471C0.861639 19.995 1.01124 20.0131 1.15977 20.0001H8.12452C8.42035 20.0114 8.70861 19.905 8.92618 19.7042C9.14374 19.5035 9.27287 19.2246 9.28531 18.9288Z"
              fill="currentColor"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M5.71443 14.6426C5.72919 14.3745 5.63737 14.1114 5.459 13.9108C5.28063 13.7101 5.03016 13.5881 4.7622 13.5713H0.95224C0.689405 13.6016 0.446903 13.7276 0.270876 13.9251C0.0948482 14.1226 -0.00241852 14.378 -0.00241852 14.6426C-0.00241852 14.9071 0.0948482 15.1625 0.270876 15.36C0.446903 15.5575 0.689405 15.6835 0.95224 15.7138H4.7622C5.03016 15.697 5.28063 15.575 5.459 15.3743C5.63737 15.1737 5.72919 14.9106 5.71443 14.6426Z"
              fill="currentColor"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M5.45806 0.268813C5.373 0.183454 5.27192 0.115726 5.16062 0.0695129C5.04933 0.0233002 4.93001 -0.000488281 4.8095 -0.000488281C4.68899 -0.000488281 4.56967 0.0233002 4.45838 0.0695129C4.34708 0.115726 4.24601 0.183454 4.16094 0.268813L0.263493 4.16118C0.178133 4.24624 0.110405 4.34732 0.0641918 4.45861C0.0179787 4.56991 -0.00580978 4.68923 -0.00580978 4.80974C-0.00580978 4.93024 0.0179787 5.04956 0.0641918 5.16086C0.110405 5.27215 0.178133 5.37323 0.263493 5.45829L14.5409 19.7367C14.6261 19.822 14.7273 19.8897 14.8387 19.9357C14.9501 19.9818 15.0694 20.0055 15.19 20.0053H19.0844C19.3272 20.0053 19.5601 19.9089 19.7318 19.7371C19.9035 19.5654 20 19.3325 20 19.0897V15.1902C20.0002 15.0697 19.9765 14.9503 19.9304 14.8389C19.8843 14.7275 19.8167 14.6263 19.7314 14.5412L5.45806 0.268813ZM4.80899 2.215L18.1688 15.5656V18.1609H15.5695L2.21476 4.81024L4.80899 2.215Z"
              fill="currentColor"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M9.34737 4.16188C9.2623 4.07652 9.16123 4.00879 9.04993 3.96258C8.93864 3.91637 8.81932 3.89258 8.69881 3.89258C8.5783 3.89258 8.45898 3.91637 8.34769 3.96258C8.23639 4.00879 8.13531 4.07652 8.05025 4.16188L4.1589 8.05424C3.9869 8.22625 3.89026 8.45955 3.89026 8.7028C3.89026 8.94606 3.9869 9.17935 4.1589 9.35136C4.33091 9.52337 4.56421 9.62 4.80746 9.62C5.05072 9.62 5.28401 9.52337 5.45602 9.35136L9.34737 5.45899C9.43273 5.37393 9.50045 5.27285 9.54667 5.16156C9.59288 5.05027 9.61667 4.93094 9.61667 4.81044C9.61667 4.68993 9.59288 4.57061 9.54667 4.45931C9.50045 4.34802 9.43273 4.24694 9.34737 4.16188Z"
              fill="currentColor"
            />
          </g>
          <defs>
            <clipPath id="clip0_2311_1853">
              <rect width="20" height="20" fill="white" transform="matrix(-1 0 0 1 20 0)" />
            </clipPath>
          </defs>
        </>
      ) : (
        <>
          <g clipPath="url(#clip0_2311_1853)">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M9.28531 18.9288C9.27287 18.6331 9.14374 18.3542 8.92618 18.1535C8.70861 17.9527 8.42035 17.8463 8.12452 17.8576H1.15977C1.01124 17.8446 0.861639 17.8627 0.720468 17.9106C0.579295 17.9586 0.449636 18.0354 0.339725 18.1361C0.229815 18.2369 0.142053 18.3594 0.0820141 18.4958C0.0219755 18.6323 -0.00902843 18.7798 -0.00902843 18.9288C-0.00902843 19.0779 0.0219755 19.2254 0.0820141 19.3619C0.142053 19.4983 0.229815 19.6208 0.339725 19.7216C0.449636 19.8223 0.579295 19.8991 0.720468 19.9471C0.861639 19.995 1.01124 20.0131 1.15977 20.0001H8.12452C8.42035 20.0114 8.70861 19.905 8.92618 19.7042C9.14374 19.5035 9.27287 19.2246 9.28531 18.9288Z"
              fill="currentColor"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M5.71443 14.6426C5.72919 14.3745 5.63737 14.1114 5.459 13.9108C5.28063 13.7101 5.03016 13.5881 4.7622 13.5713H0.95224C0.689405 13.6016 0.446903 13.7276 0.270876 13.9251C0.0948482 14.1226 -0.00241852 14.378 -0.00241852 14.6426C-0.00241852 14.9071 0.0948482 15.1625 0.270876 15.36C0.446903 15.5575 0.689405 15.6835 0.95224 15.7138H4.7622C5.03016 15.697 5.28063 15.575 5.459 15.3743C5.63737 15.1737 5.72919 14.9106 5.71443 14.6426Z"
              fill="currentColor"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M5.45806 0.268813C5.373 0.183454 5.27192 0.115726 5.16062 0.0695129C5.04933 0.0233002 4.93001 -0.000488281 4.8095 -0.000488281C4.68899 -0.000488281 4.56967 0.0233002 4.45838 0.0695129C4.34708 0.115726 4.24601 0.183454 4.16094 0.268813L0.263493 4.16118C0.178133 4.24624 0.110405 4.34732 0.0641918 4.45861C0.0179787 4.56991 -0.00580978 4.68923 -0.00580978 4.80974C-0.00580978 4.93024 0.0179787 5.04956 0.0641918 5.16086C0.110405 5.27215 0.178133 5.37323 0.263493 5.45829L14.5409 19.7367C14.6261 19.822 14.7273 19.8897 14.8387 19.9357C14.9501 19.9818 15.0694 20.0055 15.19 20.0053H19.0844C19.3272 20.0053 19.5601 19.9089 19.7318 19.7371C19.9035 19.5654 20 19.3325 20 19.0897V15.1902C20.0002 15.0697 19.9765 14.9503 19.9304 14.8389C19.8843 14.7275 19.8167 14.6263 19.7314 14.5412L5.45806 0.268813ZM4.80899 2.215L18.1688 15.5656V18.1609H15.5695L2.21476 4.81024L4.80899 2.215Z"
              fill="currentColor"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M9.34737 4.16188C9.2623 4.07652 9.16123 4.00879 9.04993 3.96258C8.93864 3.91637 8.81932 3.89258 8.69881 3.89258C8.5783 3.89258 8.45898 3.91637 8.34769 3.96258C8.23639 4.00879 8.13531 4.07652 8.05025 4.16188L4.1589 8.05424C3.9869 8.22625 3.89026 8.45955 3.89026 8.7028C3.89026 8.94606 3.9869 9.17935 4.1589 9.35136C4.33091 9.52337 4.56421 9.62 4.80746 9.62C5.05072 9.62 5.28401 9.52337 5.45602 9.35136L9.34737 5.45899C9.43273 5.37393 9.50045 5.27285 9.54667 5.16156C9.59288 5.05027 9.61667 4.93094 9.61667 4.81044C9.61667 4.68993 9.59288 4.57061 9.54667 4.45931C9.50045 4.34802 9.43273 4.24694 9.34737 4.16188Z"
              fill="currentColor"
            />
          </g>
          <defs>
            <clipPath id="clip0_2311_1853">
              <rect width="20" height="20" fill="white" transform="matrix(-1 0 0 1 20 0)" />
            </clipPath>
          </defs>
        </>
      )}
    </svg>
  );
};

export default PenSvg;
