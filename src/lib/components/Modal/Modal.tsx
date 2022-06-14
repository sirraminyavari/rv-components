import { createPortal } from 'react-dom';
import type { HTMLProps, ReactNode } from 'react';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import usePrevious from '../../hooks/usePrevious';
import CloseButton from '../Button/CloseButton';
import * as GlobalUtilities from '../../utilities/global';

export type IModal = Omit<HTMLProps<HTMLDivElement>, 'ref'> & {
  noBackground?: boolean;
  middle?: boolean;
  stick?: boolean;
  show?: boolean;
  onClose?: () => void;
  contentClass?: string;
  contentWidth?: string;
  titleClass?: string;
  titleContainerClass?: string;
  children?: ReactNode;
};

// TODO inspect <MainContent/> and children's type ...

const Modal = ({
  title,
  noBackground,
  middle,
  stick,
  show = true,
  onClose,
  contentClass,
  contentWidth,
  titleClass,
  titleContainerClass,
  children,
  ...props
}: IModal) => {
  const [componentId] = useState(`r${GlobalUtilities.random_str(10)}`);
  const [disposed, _setDisposed] = useState(false);
  const [showState, setShowState] = useState(show);
  const prevDisposed = usePrevious(disposed);
  const prevShowState = usePrevious(showState);

  useEffect(() => {
    setShowState(show);
    if (show) {
      _setDisposed(false);
    }
  }, [show]);

  useEffect(() => {
    const disposedRecently = disposed && !prevDisposed;
    if (disposedRecently && typeof onClose === 'function') onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [disposed]);

  if (!showState && prevShowState)
    GlobalUtilities.after_fade_out(() => {
      _setDisposed(true);
    });

  return createPortal(
    disposed || (!showState && !prevShowState) ? (
      <></>
    ) : (
      <Container
        id={componentId}
        className={`RevDirection ${showState ? 'rv-fade-in' : 'rv-fade-out'}`}
        noBackground={noBackground}
        middle={middle}
        onClick={(e) => {
          e.stopPropagation();
          setShowState(false);
        }}
      >
        <ContentContainer>
          <ContentSection
            className={`Direction rv-border-radius-half SurroundingShadow ${
              contentClass || ' '
            }`}
            onClick={(e) => e.stopPropagation()}
            contentWidth={contentWidth}
          >
            {!title && stick ? (
              <></>
            ) : (
              <TitleContainer
                className={`rv-border-radius-half rv-ignore-bottom-radius ${titleContainerClass}`}
              >
                {!stick && <EmptyTitleSide />}
                <TitleArea className={`${titleClass || 'WarmColor'}`}>
                  {title}
                </TitleArea>
                {!stick && (
                  <CloseButton
                    className="RevTextAlign"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowState(false);
                    }}
                  />
                )}
              </TitleContainer>
            )}
            {/*
                // @ts-expect-error */}
            <MainContent {...props}>{children}</MainContent>
          </ContentSection>
        </ContentContainer>
      </Container>
    ),
    document.getElementById('root') as HTMLElement
  );
};

export default Modal;

const Container = styled.div<{
  middle?: boolean;
  noBackground?: boolean;
}>`
  display: flex;
  flex-flow: column;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  width: 100%;
  overflow: auto;
  z-index: ${GlobalUtilities.zIndex.dialog()};
  ${({ middle }) => middle && `justify-content: center; padding-bottom:15vh;`}
  ${({ noBackground }) => !noBackground && `background: rgba(0, 0, 0, 0.75);`}
`;

const EmptyTitleSide = styled.div`
  flex: 0 0 auto;
  width: 1.5rem;
`;

const ContentContainer = styled.div`
  flex: 0 0 auto;
  width: 100%;
`;

const ContentSection = styled.div<{ contentWidth?: string }>`
  margin: 5vw auto;
  cursor: default;
  background-color: white;
  ${({ contentWidth }) => contentWidth && `width: ${contentWidth};`}
`;

const MainContent = styled.div`
  padding: 1rem;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-flow: row;
  align-items: center;
  padding: 0.5rem 0.3rem;
  background-color: rgb(250, 250, 250);
`;

const TitleArea = styled.div`
  flex: 1 1 auto;
  padding: 0 0.5rem;
  font-weight: 600;
  font-size: 0.9rem;
  text-align: center;
`;
