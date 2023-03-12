export const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png"];
export const ONE_MEGA_BYTE = 1_048_576;

export const NAME_ERROR_CODE = {
  RANGE: "range",
  WHITESPACE: "whitespace",
} as const;
export const SLUG_ERROR_CODE = {
  RANGE: "range",
  REGEX: "regex",
} as const;
export const DESC_ERROR_CODE = {
  TOO_BIG: "too_big",
  WHITESPACE: "whitespace",
} as const;
