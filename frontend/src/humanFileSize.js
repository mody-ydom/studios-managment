export function humanFileSize(size, binary = true, fractionDigits = 1) {
  const i = Math.floor(Math.log(size) / Math.log(binary ? 1024 : 1000));
  return (size / Math.pow(binary ? 1024 : 1000, i)).toFixed?.(fractionDigits) * 1 + ' ' + ['B', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'][i];
}