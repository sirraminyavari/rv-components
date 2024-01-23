import clsx from 'clsx';
import { CSSProperties, forwardRef, useCallback, useRef } from 'react';
import ReactModal, { Props as ModalProps } from 'react-modal';
import { mergeWith } from 'lodash';
import { RVColorProp, RVSizeProp, RVVariantProp } from '../../types';
import styles from './Modal.module.scss';

export interface RVModal extends ModalProps {
  /** set the component color palette (default:RVColorProp.cgBlue) */
  color?: RVColorProp;
  /** set the size of the component (default:RVSizeProp.small) */
  size?: RVSizeProp;
  /** set between the various designs of the component (default:RVVariantProp.white) */
  variant?: Exclude<RVVariantProp, RVVariantProp.disabled | RVVariantProp.outline>;
}

const Modal = forwardRef<ReactModal, RVModal>(
  (
    {
      className,
      overlayClassName,
      color = RVColorProp.cgBlue,
      size = RVSizeProp.small,
      variant = RVVariantProp.white,
      closeTimeoutMS = 200,
      style,
      children,
      isOpen,
      parentSelector,
      ...props
    },
    ref
  ) => {
    const elementID = `modal-${Date.now()}`;
    const appElement = useRef<HTMLElement>();
    const parentSelectorCallback = useCallback(() => {
      if (parentSelector) return parentSelector();
      if (appElement.current) return appElement.current!;
      console.log('no !!!');
      if (document.getElementById(elementID)) return document.getElementById(elementID)!;
      return document.body;
    }, [appElement.current, isOpen]);

    return (
      <div
        id={elementID}
        ref={(elRef) => {
          if (elRef) {
            appElement.current = elRef;
          }
        }}
      >
        <ReactModal
          ref={ref}
          appElement={appElement.current}
          portalClassName={clsx('RVPortal', styles[variant])}
          overlayClassName={clsx(styles.modalOverlay, color, overlayClassName)}
          className={clsx(styles.modalContent, styles[size], className)}
          closeTimeoutMS={closeTimeoutMS}
          parentSelector={parentSelectorCallback}
          isOpen={isOpen}
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
      </div>
    );
  }
);

export default Modal;
