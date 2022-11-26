import { db } from "#/firebase/firebase";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { listVideos } from "./youtube";

export const fetchFavolinks = async () => {
  // 下記一行はローディングを見たいから。
  // await new Promise((resolve) => setTimeout(resolve, 1000));
  const colRef = collection(db, `users/8kkpegiVDFB23pIp1dnL/favolinks`);
  const docsSnapshot = await getDocs(colRef);
  return docsSnapshot.docs.map((doc) => doc.data());
};

export const addFavolink = async ({
  url,
  categoryTitle,
}: {
  url: string;
  categoryTitle: string;
}) => {
  try {
    //// @ts-ignore
    const { title, thumbnailUrl } = await listVideos(url);
    addDoc(collection(db, `users/8kkpegiVDFB23pIp1dnL/favolinks`), {
      title,
      url,
      thumbnailUrl,
      categoryTitle,
      createdAt: serverTimestamp(),
    });
  } catch (error: any) {
    throw new Error(error.message);
    // console.error("error.body:", error.body);
  }
};

// export const fetchCategories = async (path: string) => {
//   const q = query(collection(db, path), orderBy("title"));
//   const querySnapshot = await getDocs(q);
//   return querySnapshot.docs.map((doc) => ({
//     id: doc.id,
//     title: doc.data().title,
//   }));
// };

type Category = {
  title: string;
  index: number;
};

export const fetchCategories = async () => {
  const docSnap = await getDoc(doc(db, `users/8kkpegiVDFB23pIp1dnL`));
  const categories = docSnap.data()?.categories as Category[];
  // TODO: まずはある想定で返す。
  categories?.sort((a, b) => (a.index < b.index ? -1 : 1));
  return categories;
};
// export const fetchField = async (path: string, field: string) => {
//   const docSnap = await getDoc(doc(db, path));
//   const fieldData = docSnap.data()?.[field];
//   // TODO: 引数fieldから型を指定したい。
//   // TODO: まずはある想定で返す。
//   fieldData.sort((a: any, b: any) => (a.index < b.index ? -1 : 1));
//   return fieldData;
// };

// TODO: titleが重複しないように
// export const addCategory = async ({ title }: { title: string }) => {
//   try {
//     const docRef = doc(
//       collection(db, `users/8kkpegiVDFB23pIp1dnL`, `categories`)
//     );

//     const docSnap = await getDoc(doc(db, `users/8kkpegiVDFB23pIp1dnL`));
//     const categorySort = docSnap.data()?.categorySort;
//     if (categorySort) {
//       const newCategorySort = [
//         ...categorySort,
//         {
//           categoryId: docRef.id,
//           index: categorySort.length,
//         },
//       ];
//       updateDoc(doc(db, `users/8kkpegiVDFB23pIp1dnL`), {
//         categorySort: newCategorySort,
//       });
//     } else {
//       setDoc(doc(db, `users/8kkpegiVDFB23pIp1dnL`), {
//         categorySort: [
//           {
//             categoryId: docRef.id,
//             index: 0,
//           },
//         ],
//       });
//     }

//     setDoc(docRef, {
//       title,
//     });
//   } catch (error: any) {
//     console.error("error.body:", error.body);
//   }
// };
// TODO: 空文字も登録できてしまう。
export const addCategory = async ({ title }: { title: string }) => {
  try {
    // const docRef = doc(
    //   collection(db, `users/8kkpegiVDFB23pIp1dnL`, `categories`)
    // );

    const docSnap = await getDoc(doc(db, `users/8kkpegiVDFB23pIp1dnL`));
    const categories = docSnap.data()?.categories;
    if (categories) {
      const newCategories = [
        ...categories,
        {
          title,
          index: categories.length,
        },
      ];
      updateDoc(doc(db, `users/8kkpegiVDFB23pIp1dnL`), {
        categories: newCategories,
      });
    } else {
      setDoc(doc(db, `users/8kkpegiVDFB23pIp1dnL`), {
        categories: [
          {
            title,
            index: 0,
          },
        ],
      });
    }
  } catch (error: any) {
    console.error("error.body:", error.body);
  }
};

type CategorySort = {
  categoryId: string;
  index: number;
};

export const fetchCategorySort = async (path: string) => {
  const docSnap = await getDoc(doc(db, path));
  const categorySort = docSnap.data()?.categorySort as CategorySort[];
  // TODO: まずはある想定で返す。
  categorySort.sort((a, b) => (a.index < b.index ? -1 : 1));
  return categorySort;
};

export const fetchProfile = async (uid: string) => {
  console.log("fetchProfile");
  try {
    // console.log("auth.currentUser!:", auth.currentUser!); //=> null
    const docRef = doc(db, `users/${uid}`);
    const docSnap = await getDoc(docRef);
    const { displayName, slug, desc } = docSnap.data()!;
    // const { displayName, slug, desc } = await getDoc(docRef);
    // return {
    // displayName: docSnap.data()?.displayName,
    //   slug: docSnap.data()?.slug,
    //   desc: docSnap.data()?.desc,
    // };
    return { displayName, slug, desc };
  } catch (error: any) {
    console.log(error.message);
  }
};

export const saveProfile = async ({
  uid,
  displayName,
  // photoURL,
  slug = "",
  desc = "",
}: {
  uid: string;
  displayName: string | null;
  // photoURL: string | null;
  slug?: string | null;
  desc?: string | null;
}) => {
  try {
    const docRef = doc(db, `users/${uid}`);
    const docSnap = await getDoc(docRef);
    if (docSnap) return;

    setDoc(docRef, {
      displayName,
      // photoURL,
      slug,
      desc,
    });
  } catch (error: any) {
    console.error("error.body:", error.body);
  }
};
