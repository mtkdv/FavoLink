export const mimeToFileFormat = (type: string) => {
  const fileFormat = type.split("/")[1].toUpperCase();
  return fileFormat;
};
