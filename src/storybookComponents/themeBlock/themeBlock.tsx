import clsx from 'clsx';
import { PropsWithChildren, useEffect, useState } from 'react';
import { RVColorProp } from '../../types';
import styles from './themeBlock.module.scss';
const themeClasses = ['default', 'dark', 'amoled'];

export interface RVThemeBlock {
  onColorChange?: (color?: RVColorProp) => void;
  defaultColor?: RVColorProp;
  withWindowFrame?: boolean;
}

const ThemeBlock = ({
  children,
  defaultColor,
  onColorChange,
  withWindowFrame = true,
}: PropsWithChildren<RVThemeBlock>) => {
  const [selectedColorPalette, setSelectedColorPalette] = useState<RVColorProp | undefined>(
    defaultColor
  );
  useEffect(() => {
    if (onColorChange) onColorChange(selectedColorPalette);
  }, [selectedColorPalette, onColorChange]);
  return (
    <div className={clsx(styles.themeBlock, withWindowFrame && styles.withWindowFrame)}>
      {onColorChange && (
        <div className={styles.paletteContainer}>
          {Object.entries(RVColorProp).map(([colorName, colorClass]) => {
            return (
              <button
                key={colorName + colorClass}
                onClick={() => setSelectedColorPalette(colorClass)}
                className={clsx(styles.themeBoxButton, colorClass)}
                title={colorName}
              />
            );
          })}
        </div>
      )}
      {themeClasses.map((themeClass) => {
        return (
          <div
            key={`ThemeBlock${themeClass}`}
            className={clsx(themeClass, styles.themeBox)}
            title={themeClass}
          >
            {withWindowFrame && (
              <div className={styles.windowDots}>
                <span className={styles.dot}></span>
                <span className={styles.dot}></span>
                <span className={styles.dot}></span>
              </div>
            )}
            <div className={styles.componentWrapper}>{children}</div>
          </div>
        );
      })}
    </div>
  );
};

export default ThemeBlock;
