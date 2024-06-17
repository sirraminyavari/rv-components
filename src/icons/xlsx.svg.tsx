import { RVSvgProps } from '../types';

const XlsxSvg = ({ size, outline, ...props }: RVSvgProps) => {
  return (
    <svg
      width={size || '1em'}
      height={size || '1em'}
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {outline ? (
        <>
          <path
            fill="currentColor"
            fill-rule="evenodd"
            d="M14 4.5V14a2 2 0 0 1-2 2h-1v-1h1a1 1 0 0 0 1-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5zM6.472 15.29a1.2 1.2 0 0 1-.111-.449h.765a.58.58 0 0 0 .254.384q.106.073.25.114q.143.041.319.041q.246 0 .413-.07a.56.56 0 0 0 .255-.193a.5.5 0 0 0 .085-.29a.39.39 0 0 0-.153-.326q-.152-.12-.462-.193l-.619-.143a1.7 1.7 0 0 1-.539-.214a1 1 0 0 1-.351-.367a1.1 1.1 0 0 1-.123-.524q0-.366.19-.639q.19-.272.527-.422q.338-.15.777-.149q.457 0 .78.152q.324.153.5.41q.18.255.2.566h-.75a.56.56 0 0 0-.12-.258a.6.6 0 0 0-.247-.181a.9.9 0 0 0-.369-.068q-.325 0-.513.152a.47.47 0 0 0-.184.384q0 .18.143.3a1 1 0 0 0 .405.175l.62.143q.326.075.566.211a1 1 0 0 1 .375.358q.135.222.135.56q0 .37-.188.656a1.2 1.2 0 0 1-.539.439q-.351.158-.858.158q-.381 0-.665-.09a1.4 1.4 0 0 1-.478-.252a1.1 1.1 0 0 1-.29-.375m-2.945-3.358h-.893L1.81 13.37h-.036l-.832-1.438h-.93l1.227 1.983L0 15.931h.861l.853-1.415h.035l.85 1.415h.908L2.253 13.94zm2.727 3.325H4.557v-3.325h-.79v4h2.487z"
          />
        </>
      ) : (
        <>
          <path
            fill="currentColor"
            fill-rule="evenodd"
            d="M14 4.5V14a2 2 0 0 1-2 2h-1v-1h1a1 1 0 0 0 1-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5zM6.472 15.29a1.2 1.2 0 0 1-.111-.449h.765a.58.58 0 0 0 .254.384q.106.073.25.114q.143.041.319.041q.246 0 .413-.07a.56.56 0 0 0 .255-.193a.5.5 0 0 0 .085-.29a.39.39 0 0 0-.153-.326q-.152-.12-.462-.193l-.619-.143a1.7 1.7 0 0 1-.539-.214a1 1 0 0 1-.351-.367a1.1 1.1 0 0 1-.123-.524q0-.366.19-.639q.19-.272.527-.422q.338-.15.777-.149q.457 0 .78.152q.324.153.5.41q.18.255.2.566h-.75a.56.56 0 0 0-.12-.258a.6.6 0 0 0-.247-.181a.9.9 0 0 0-.369-.068q-.325 0-.513.152a.47.47 0 0 0-.184.384q0 .18.143.3a1 1 0 0 0 .405.175l.62.143q.326.075.566.211a1 1 0 0 1 .375.358q.135.222.135.56q0 .37-.188.656a1.2 1.2 0 0 1-.539.439q-.351.158-.858.158q-.381 0-.665-.09a1.4 1.4 0 0 1-.478-.252a1.1 1.1 0 0 1-.29-.375m-2.945-3.358h-.893L1.81 13.37h-.036l-.832-1.438h-.93l1.227 1.983L0 15.931h.861l.853-1.415h.035l.85 1.415h.908L2.253 13.94zm2.727 3.325H4.557v-3.325h-.79v4h2.487z"
          />
        </>
      )}
    </svg>
  );
};

export default XlsxSvg;
