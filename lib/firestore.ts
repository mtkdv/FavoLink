import { db } from "#/firebase/firebase";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { listVideos } from "./youtube";

export const fetchFavolinks = async (path: string) => {
  // 下記一行はローディングを見たいから。
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const q = query(collection(db, path), orderBy("createdAt"));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => doc.data());
};

export const addFavolink = async ({ url }: { url: string }) => {
  try {
    //// @ts-ignore
    const { title, thumbnailUrl } = await listVideos(url);
    // console.log("title:", title);
    // console.log("thumbnailUrl:", thumbnailUrl);
    return await addDoc(collection(db, "favolinks"), {
      title,
      url,
      thumbnailUrl,
      createdAt: serverTimestamp(),
    });
  } catch (error: any) {
    console.error("error.body:", error.body);
  }
};

export const fetchCategories = async (path: string) => {
  const q = query(collection(db, path), orderBy("title"));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    title: doc.data().title,
  }));
};

// TODO: titleが重複しないように
export const addCategory = async ({ title }: { title: string }) => {
  try {
    const docRef = doc(collection(db, `categories`));
    // あ、違うわ。Mapの配列をupdateするんだった。また今度かな。
    await addDoc(collection(db, `categorySort`), {
      categoryId: docRef.id,
      // api routesから参照される関数からstateにアクセスできるのか。
      index: .length
    })
    return await setDoc(docRef, {
      title,
    });
  } catch (error: any) {
    console.error("error.body:", error.body);
  }
};
