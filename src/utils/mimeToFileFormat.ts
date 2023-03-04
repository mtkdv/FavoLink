export const mimeToFileFormat = (type: string) => {
  return type.split("/")[1].toUpperCase();
};
