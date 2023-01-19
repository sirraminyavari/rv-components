export const isRTL = (element?: Element) => {
  if (!window) throw new Error('window is not defined!');
  const elementToCompute = element || document.body;
  return window.getComputedStyle(elementToCompute).direction as 'rtl' | 'ltr';
};
