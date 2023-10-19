import clsx from 'clsx';
import { FunctionComponent } from 'react';
import { RVColorProp, RVSizeProp, RVVariantProp } from '../../types';
import {
  CloseButtonProps,
  ToastContainer as ToastifyContainer,
  ToastContainerProps,
  toast,
} from 'react-toastify';
import 'react-toastify/scss/main.scss';
import styles from './Toast.module.scss';
import { Button } from '../Button';
import { CloseSvg } from '../../icons';

export interface RVToastContainer extends Omit<ToastContainerProps, 'color' | 'theme'> {
  /** set between the various designs of the component (default:RVVariantProp.white) */
  variant?: Exclude<RVVariantProp, RVVariantProp.disabled>;
  /** set the component color palette (default:RVColorProp.cgBlue) */
  color?: RVColorProp;
  /** set the size of the component (default:RVSizeProp.medium) */
  size?: RVSizeProp;
}

const CloseButton = ({ closeToast }: CloseButtonProps) => (
  <Button
    onClick={closeToast}
    variant={RVVariantProp.white}
    size={RVSizeProp.small}
    fullCircle
    rounded="half"
  >
    <CloseSvg />
  </Button>
);
const ToastContainer: FunctionComponent<RVToastContainer> = ({
  variant = RVVariantProp.white,
  color = RVColorProp.cgBlue,
  size = RVSizeProp.medium,
  position = 'top-right',
  autoClose = 50000,
  closeButton = false,
  ...props
}) => {
  return (
    <ToastifyContainer
      position={position}
      autoClose={autoClose}
      closeOnClick={false}
      closeButton={closeButton || CloseButton}
      className={clsx(color, styles.toastWrapperContainer)}
      toastClassName={clsx(styles.toastContainer, styles[variant], styles[size])}
      {...props}
    />
  );
};
export { toast as RVToast };
export default ToastContainer;
