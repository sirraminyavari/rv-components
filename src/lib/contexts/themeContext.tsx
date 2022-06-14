import type { PropsWithChildren } from 'react';
import React, { useContext, createContext } from 'react';

export type IThemeContext = {
  RVDic: { [key: string]: any };
  RVGlobal?: { IsDev: boolean; [key: string]: any };
  RVAPI?: { [key: string]: any };
  GlobalUtilities?: { [key: string]: any };
  DynamicFileUtilities?: unknown;
  RV_RTL?: boolean;
  RV_Float?: 'right' | 'left';
  RV_RevFloat?: 'right' | 'left';
  RV_Direction?: 'rtl' | 'ltr';
};

type IThemeContextProvider = PropsWithChildren<{ value: IThemeContext }>;

const ThemeContext = createContext<IThemeContext>({
  RVDic: {},
});

export function ThemeContextProvider({
  value,
  children,
}: IThemeContextProvider): JSX.Element {
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export const useThemeContext = () => {
  return useContext(ThemeContext);
};

export default ThemeContext;
