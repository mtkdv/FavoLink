import useSWR from "swr";
import { fetchCategorySort } from "./firestore";

// export function useLinks(uid: string) {
//   const { data, error } = useSWR(`/users/${uid}/favolinks`, fetcher);
export function useCategorySort() {
  // const { data, error } = useSWR(`users/8kkpegiVDFB23pIp1dn`, fetcher);

  return {
    categorySort: data,
    isLoading: !error && !data,
    isError: error,
  };
}

// const fetcher = (path: string) => fetchFavolinks(path);
const fetcher = (path: string) => fetchCategorySort(path);
// const fetcher = async (path: string) => {
//   await new Promise((resolve) => setTimeout(resolve, 1000));
//   const q = query(collection(db, path), orderBy("createdAt"));
//   const querySnapshot = await getDocs(q);
//   return querySnapshot.docs.map((doc) => doc.data());
// };
