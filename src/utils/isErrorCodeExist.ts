/**
 * zodで定義したエラーが発生しているかどうか。
 * @param {string} message RHFのerrors.field.messageを渡す。zod schemaのmessageに記述したエラーコードを参照する。
 */
export const isErrorCodeExist = <T extends Record<string, string>>(
  errorCodes: T,
  message: string
) => {
  type ErrorCode = T[keyof T];

  const values = Object.values(errorCodes) as ErrorCode[];

  return values.includes(message as ErrorCode);
};
