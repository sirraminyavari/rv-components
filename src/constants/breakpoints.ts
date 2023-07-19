import variables from '../scss/variables.module.scss';

const toNumber = (value: string): number => Number((value || '').replace(/[a-z]+/gi, ''));

export const BREAKPOINT_MOBILE_MAX = toNumber(variables.screenSizePhoneMax);
export const BREAKPOINT_TABLET_PORTRAIT_MIN = toNumber(variables.screenSizeTabletPortraitMin);
export const BREAKPOINT_TABLET_LANDSCAPE_MIN = toNumber(variables.screenSizeTabletLandscapeMin);
export const BREAKPOINT_DESKTOP_MIN = toNumber(variables.screenSizeDesktopMin);
export const BREAKPOINT_LARGE_DESKTOP_MIN = toNumber(variables.screenSizeLargeDesktopMin);
