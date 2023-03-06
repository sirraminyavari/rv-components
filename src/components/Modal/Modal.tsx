import clsx from 'clsx';
import { CSSProperties, forwardRef } from 'react';
import ReactModal, { Props as ModalProps } from 'react-modal';
import mergeWith from 'lodash/mergeWith';
import { RVColorProp, RVSizeProp } from '../../types';
import styles from './Modal.module.scss';

export interface RVModal extends ModalProps {
  color?: RVColorProp;
  size?: RVSizeProp;
}

const Modal = forwardRef<ReactModal, RVModal>(
  (
    {
      className,
      overlayClassName,
      color = RVColorProp.cgBlue,
      size = RVSizeProp.small,
      closeTimeoutMS = 200,
      style,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <>
        <ReactModal
          ref={ref}
          portalClassName={'RVPortal'}
          overlayClassName={clsx(styles.modalOverlay, color, overlayClassName)}
          className={clsx(styles.modalContent, styles[size], className)}
          closeTimeoutMS={closeTimeoutMS}
          parentSelector={() => document.body}
          style={mergeWith(
            {
              overlay: {
                '--modal-transition-duration': `${closeTimeoutMS * 0.9}ms`,
              } as CSSProperties,
              content: {
                '--modal-transition-duration': `${closeTimeoutMS}ms`,
              } as CSSProperties,
            },
            style || {}
          )}
          {...props}
        >
          {children}
        </ReactModal>
      </>
    );
  }
);

export default Modal;
