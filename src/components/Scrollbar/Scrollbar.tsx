import clsx from 'clsx';
import {
  useState,
  useEffect,
  useRef,
  useCallback,
  PropsWithoutRef,
  DetailedHTMLProps,
  HTMLAttributes,
  forwardRef,
} from 'react';
import useCombinedRefs from '../../hooks/useCombinedRef';
import { RVColorProp, RVSizeProp, RVVariantProp } from '../../types';
import styles from './Scrollbar.module.scss';

export interface RVScrollbar
  extends Omit<
    PropsWithoutRef<
      DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
    >,
    'color' | 'size'
  > {
  variant?: Exclude<RVVariantProp, RVVariantProp.disabled>;
  color?: RVColorProp;
  size?: RVSizeProp;
  onScrollEnd?: () => void;
  scrollEndThreshold?: number;
  alwaysShowScrollbar?: boolean;
  contentContainerClassName?: string;
}
const Scrollbar = forwardRef<HTMLDivElement, RVScrollbar>(
  (
    {
      children,
      className,contentContainerClassName,
      color = RVColorProp.cgBlue,
      variant = RVVariantProp.primary,
      size = RVSizeProp.medium,
      onScrollEnd,
      scrollEndThreshold,
      alwaysShowScrollbar,
      ...props
    },
    ref
  ) => {
    const contentPointerRef = useRef<HTMLDivElement>(null);
    const contentRef = useCombinedRefs(contentPointerRef, ref);
    const contentInnerRef = useRef<HTMLDivElement>(null);
    const scrollTrackRef = useRef<HTMLDivElement>(null);
    const scrollingTimeoutRef = useRef<NodeJS.Timer>();
    const scrollThumbRef = useRef<HTMLDivElement>(null);
    const observer = useRef<ResizeObserver | null>(null);
    const [thumbHeight, setThumbHeight] = useState(20);
    const [scrollStartPosition, setScrollStartPosition] = useState<
      number | null
    >(null);
    const [initialScrollTop, setInitialScrollTop] = useState<number>(0);
    const [isDragging, setIsDragging] = useState(false);
    const [isScrolling, setIsScrolling] = useState(false);

    const handleResize = (
      scrollThumbElement?: HTMLDivElement,
      scrollTrackElement?: HTMLDivElement
    ) => {
      if (!scrollTrackElement || !scrollThumbElement) return;
      const { clientHeight, scrollHeight } = scrollThumbElement;

      const { clientHeight: trackSize } = scrollTrackElement;
      setThumbHeight(Math.max((clientHeight / scrollHeight) * trackSize, 20));
    };

    const handleTrackClick = useCallback(
      (e) => {
        e.preventDefault();
        e.stopPropagation();
        const { current: trackCurrent } = scrollTrackRef;
        const { current: contentCurrent } = contentRef;
        if (trackCurrent && contentCurrent) {
          const { clientY } = e;
          const target = e.target as HTMLDivElement;
          const rect = target.getBoundingClientRect();
          const trackTop = rect.top;
          const thumbOffset = -(thumbHeight / 2);
          const clickRatio =
            (clientY - trackTop + thumbOffset) / trackCurrent.clientHeight;
          const scrollAmount = Math.floor(
            clickRatio * contentCurrent.scrollHeight
          );
          contentCurrent.scrollTo({
            top: scrollAmount,
            behavior: 'smooth',
          });
        }
      },
      [thumbHeight]
    );

    const handleOnScrollEnd = useCallback(() => {
      if (contentRef?.current && contentInnerRef?.current)
        if (scrollEndThreshold !== undefined && onScrollEnd)
          if (
            contentInnerRef?.current.getBoundingClientRect().bottom -
              contentRef?.current.getBoundingClientRect().height <=
            200
          ) {
            onScrollEnd();
          }
    }, [onScrollEnd, scrollEndThreshold]);
    const handleThumbPosition = useCallback(() => {
      if (
        !contentRef.current ||
        !scrollTrackRef.current ||
        !scrollThumbRef.current
      ) {
        return;
      }

      const { scrollTop: contentTop, scrollHeight: contentHeight } =
        contentRef.current;
      const { clientHeight: trackHeight } = scrollTrackRef.current;

      if (scrollingTimeoutRef.current) {
        clearTimeout(scrollingTimeoutRef.current);
      }
      setIsScrolling(true);
      handleOnScrollEnd();
      scrollingTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 1000);

      let newTop = (+contentTop / +contentHeight) * trackHeight;
      newTop = Math.min(newTop, trackHeight - thumbHeight);
      const thumb = scrollThumbRef.current;
      thumb.style.top = `${newTop}px`;
    }, []);

    const handleThumbMousedown = useCallback((e) => {
      e.preventDefault();
      e.stopPropagation();
      setScrollStartPosition(e.clientY);
      if (contentRef.current) setInitialScrollTop(contentRef.current.scrollTop);
      setIsDragging(true);
    }, []);

    const handleThumbMouseup = useCallback(
      (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (isDragging) {
          setIsDragging(false);
        }
      },
      [isDragging]
    );

    const handleThumbMousemove = useCallback(
      (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (
          !contentRef.current ||
          !scrollTrackRef.current ||
          !scrollThumbRef.current
        ) {
          return;
        }
        if (isDragging) {
          const {
            scrollHeight: contentScrollHeight,
            offsetHeight: contentOffsetHeight,
          } = contentRef.current;

          const deltaY =
            (e.clientY - Number(scrollStartPosition)) *
            (contentOffsetHeight / thumbHeight);
          const newScrollTop = Math.min(
            initialScrollTop + deltaY,
            contentScrollHeight - contentOffsetHeight
          );

          contentRef.current.scrollTop = newScrollTop;
        }
      },
      [isDragging, scrollStartPosition, thumbHeight]
    );

    // If the content and the scrollbar track exist, use a ResizeObserver to adjust height of thumb and listen for scroll event to move the thumb
    useEffect(() => {
      if (
        !contentRef.current ||
        !scrollTrackRef.current ||
        !contentInnerRef.current
      )
        return;
      const contentElement = contentRef.current;
      const contentInnerElement = contentInnerRef.current;
      const scrollTrackElement = scrollTrackRef.current;
      const resizeObserver = () =>
        new ResizeObserver(() => {
          handleResize(contentElement, scrollTrackElement);
          scrollFunction();
        });
      const scrollFunction = () => {
        requestAnimationFrame(handleThumbPosition);
      };
      observer.current = resizeObserver();
      observer.current.observe(contentInnerElement);
      observer.current.observe(contentElement);
      contentElement.addEventListener('wheel', scrollFunction);
      contentElement.addEventListener('resize', scrollFunction);
      return () => {
        observer.current?.unobserve(contentInnerElement);
        observer.current?.unobserve(contentElement);
        contentElement.removeEventListener('wheel', scrollFunction);
        contentElement.removeEventListener('resize', scrollFunction);
      };
    }, []);

    // Listen for mouse events to handle scrolling by dragging the thumb
    useEffect(() => {
      document.addEventListener('mousemove', handleThumbMousemove);
      document.addEventListener('mouseup', handleThumbMouseup);
      document.addEventListener('mouseleave', handleThumbMouseup);
      return () => {
        document.removeEventListener('mousemove', handleThumbMousemove);
        document.removeEventListener('mouseup', handleThumbMouseup);
        document.removeEventListener('mouseleave', handleThumbMouseup);
      };
    }, [handleThumbMousemove, handleThumbMouseup]);

    return (
      <div className={clsx(styles.scrollbarContainer, className)}>
        <div className={styles.scrollbarContent} ref={contentRef} {...props}>
          <div ref={contentInnerRef} className={contentContainerClassName}>{children}</div>
        </div>
        <div
          className={clsx(
            styles.scrollbar,
            color,
            // variant,
            styles[size],
            (isScrolling || alwaysShowScrollbar) && styles.scrolling
          )}
        >
          <div className={styles.scrollbarTrackAndThumb}>
            <div
              className={styles.scrollbarTrack}
              ref={scrollTrackRef}
              onClick={handleTrackClick}
              style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
            />
            <div
              className={styles.scrollbarThumb}
              ref={scrollThumbRef}
              onMouseDown={handleThumbMousedown}
              style={{
                height: `${thumbHeight}px`,
                cursor: isDragging ? 'grabbing' : 'grab',
              }}
            />
          </div>
        </div>
      </div>
    );
  }
);

export default Scrollbar;
