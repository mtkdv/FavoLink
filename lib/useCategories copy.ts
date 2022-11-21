import useSWR from "swr";
import { fetchField } from "./firestore";

// export function useLinks(uid: string) {
//   const { data, error } = useSWR(`/users/${uid}/favolinks`, fetcher);
export function useCategories() {
  const { data, error } = useSWR(
    [`users/8kkpegiVDFB23pIp1dnL`, "categories"],
    fetcher
  );

  return {
    categories: data,
    isLoading: !error && !data,
    isError: error,
  };
}

// const fetcher = (path: string) => fetchFavolinks(path);
const fetcher = (path: string, field: string) => fetchField(path, field);
// const fetcher = async (path: string) => {
//   await new Promise((resolve) => setTimeout(resolve, 1000));
//   const q = query(collection(db, path), orderBy("createdAt"));
//   const querySnapshot = await getDocs(q);
//   return querySnapshot.docs.map((doc) => doc.data());
// };
