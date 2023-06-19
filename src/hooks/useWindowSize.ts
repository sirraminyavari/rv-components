import { useState, useEffect } from 'react';
import * as breakpoints from '../constants/breakpoints';

export type WindowSize = {
  width?: number;
  height?: number;
  isMobile?: boolean;
  isSmallTablet?: boolean;
  isLargeTablet?: boolean;
  isTablet?: boolean;
  isTabletOrMobile?: boolean;
  isMediumDesktop?: boolean;
  isLargeDesktop?: boolean;
  isDesktop?: boolean;
};

const {
  BREAKPOINT_MOBILE_MAX: xsMax,
  BREAKPOINT_TABLET_PORTRAIT_MIN: smMin,
  BREAKPOINT_TABLET_LANDSCAPE_MIN: mdMin,
  BREAKPOINT_LARGE_DESKTOP_MIN: lgMin,
  BREAKPOINT_LARGE_DESKTOP_MIN: xlgMin,
} = breakpoints;

const getValues = (): WindowSize => {
  const width = typeof window === 'undefined' ? 0 : window.innerWidth,
    height = typeof window === 'undefined' ? 0 : window.innerHeight;

  return {
    width,
    height,
    isMobile: !width ? undefined : width <= xsMax,
    isSmallTablet: !width ? undefined : width > xsMax && width < mdMin,
    isLargeTablet: !width ? undefined : width >= mdMin && width < lgMin,
    isTablet: !width ? undefined : width >= smMin && width < lgMin,
    isTabletOrMobile: !width ? undefined : width < lgMin,
    isMediumDesktop: !width ? undefined : width >= lgMin && width < xlgMin,
    isLargeDesktop: !width ? undefined : width >= xlgMin,
    isDesktop: !width ? undefined : width >= lgMin,
  };
};

export const useWindowSize = (): WindowSize => {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState<WindowSize>({});

  useEffect(() => {
    const handleResize = () => {
      setWindowSize(getValues());
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
      handleResize();
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', handleResize);
      }
    };
  }, []);

  return windowSize;
};
