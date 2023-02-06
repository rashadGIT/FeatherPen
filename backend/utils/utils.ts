const getRandNumber = (min: number = 0, max: number = 10000) =>
  Math.floor(Math.random() * (max - min + 1) + min);

export { getRandNumber };
