export const MOTE_VALUE = 1000000000;

export const formatNumber = (number: number) => {
  // Limit to three significant digits
  return number.toLocaleString("en-US");
};
