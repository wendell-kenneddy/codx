export function forceCasing(casing: 'lower' | 'upper', str: string) {
  if (casing === 'lower') return str.toLowerCase();
  return str.toUpperCase();
}
