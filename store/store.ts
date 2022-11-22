import { atom } from "recoil";

// TODO: FirebaseからUserの型をimport
export type User = {
  uid: string;
  displayName: string | null;
  photoURL: string | null;
};

export const userState = atom<User | undefined>({
  key: "userState",
  default: undefined,
});
