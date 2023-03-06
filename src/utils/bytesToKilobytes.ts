export const bytesToKilobytes = (bytes: number): string => {
  const kiloByte = 1024;
  const megaByte = kiloByte * 1024;

  if (bytes >= megaByte) {
    return `${(bytes / megaByte).toFixed(2)} MB`;
  } else if (bytes >= kiloByte) {
    return `${(bytes / kiloByte).toFixed(2)} KB`;
  }
  return `${bytes} B`;
};
