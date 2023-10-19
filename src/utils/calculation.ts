export const getRandomInt = (min: number = 0, max: number = 1000) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
};
