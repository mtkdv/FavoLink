export const isExternal = (href: string) => {
  return /^http[s]?:\/\/.+/.test(href);
};
