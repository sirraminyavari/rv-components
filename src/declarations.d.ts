declare module '*.scss' {
  const content: { [className: string]: string };
  export = content;
}
declare module '*.jpg?file' {
  const content: string;
  export = content;
}
