import { db } from "#/firebase/firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import useSWR from "swr";
import { fetchFavolinks } from "./firestore";

// export function useLinks(uid: string) {
//   const { data, error } = useSWR(`/users/${uid}/favolinks`, fetcher);
export function useLinks() {
  const { data, error } = useSWR(`/api/favolinks`, async (url) => {
    const res = await fetch(url);
    return res.json();
  });

  return {
    favolinks: data,
    isLoading: !error && !data,
    isError: error,
  };
}

// const fetcher = (path: string) => fetchFavolinks(path);
// const fetcher = async (path: string) => {
//   await new Promise((resolve) => setTimeout(resolve, 1000));
//   const q = query(collection(db, path), orderBy("createdAt"));
//   const querySnapshot = await getDocs(q);
//   return querySnapshot.docs.map((doc) => doc.data());
// };
