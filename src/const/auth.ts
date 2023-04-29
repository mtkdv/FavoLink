export const oAuthProviders = ["google", "twitter"] as const;
export type OAuthProvider = (typeof oAuthProviders)[number];
export type Provider = OAuthProvider | "credentials";
