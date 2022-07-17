export function roundToTwo(value: number) {
  return Math.round(value * 100 + Number.EPSILON) / 100;
}
