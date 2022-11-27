import { atom } from "recoil";
// import { User } from "firebase/auth";
// TODO: FirebaseからUserの型をimport
export type User = {
  uid: string;
  displayName: string | null;
  photoURL: string | null;
};

// export const userState = atom<User | undefined>({
export const userState = atom<User>({
  key: "userState",
  default: undefined,
});
