import { auth, db } from "#/firebase/firebase";
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

type Favolink = {
  title: string;
  url: string;
  thumbnailUrl: string;
  categoryTitle: string;
};

export const fetchFavolinks = async (uid: string) => {
  const colRef = collection(db, `users/${uid}/favolinks`);
  const docsSnapshot = await getDocs(colRef);
  const favolinks = docsSnapshot.docs.map((doc) => doc.data());
  console.log("favolinks:", favolinks);
  //=>
  return favolinks as Favolink[];
};

export type Category = {
  title: string;
  index: number;
};

export const fetchCategories = async (uid: string) => {
  const docSnap = await getDoc(doc(db, `users/${uid}`));
  const categories = (docSnap.data()!.categories ?? []) as Category[];
  categories.sort((a, b) => (a.index < b.index ? -1 : 1));
  console.log("categories:", categories);
  //=>
  return categories;
};

export const fetchCategorizedFavolinks = async (uid: string) => {
  // console.log("fetchCategorizedFavolinks:", fetchCategorizedFavolinks);
  const [favolinks, categories] = await Promise.all([
    fetchFavolinks(uid),
    fetchCategories(uid),
  ]);

  // TODO: 切り出していい
  const categorizedFavolinks = categories?.flatMap((category) => {
    const spesificFavolinks = favolinks?.filter((favolink) => {
      return category.title === favolink.categoryTitle;
    });
    // console.log(i, spesificFavolinks);
    return spesificFavolinks.length > 0 ? [spesificFavolinks] : [];
  });
  console.log("categorizedFavolinks:", categorizedFavolinks);
  //=>
  return categorizedFavolinks;
};

export const addFavolink = async ({
  uid,
  url,
  categoryTitle,
}: {
  uid: string;
  url: string;
  categoryTitle: string;
}) => {
  try {
    const video = await listVideos(url);
    if (!video) throw new Error();
    addDoc(collection(db, `users/${uid}/favolinks`), {
      title: video.title,
      url,
      thumbnailUrl: video.thumbnailUrl,
      categoryTitle,
      createdAt: serverTimestamp(),
    });
  } catch (error: any) {
    console.error("error.body:", error.body);
  }
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
export const addCategory = async ({
  uid,
  title,
}: {
  uid: string;
  title: string;
}) => {
  try {
    const docRef = doc(db, `users/${uid}`);

    const docSnap = await getDoc(docRef);
    const categories: Category[] | undefined = docSnap.data()?.categories;
    if (categories) {
      const newCategories = [
        ...categories,
        {
          title,
          index: categories.length,
        },
      ];
      updateDoc(docRef, {
        categories: newCategories,
      });
    } else {
      updateDoc(docRef, {
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
    const { displayName, photoURL, slug, desc } = docSnap.data()!;
    // const { displayName, slug, desc } = await getDoc(docRef);
    // return {
    // displayName: docSnap.data()?.displayName,
    //   slug: docSnap.data()?.slug,
    //   desc: docSnap.data()?.desc,
    // };
    return { displayName, photoURL, slug, desc };
  } catch (error: any) {
    console.log(error.message);
  }
};

export const saveProfile = async ({
  uid,
  displayName,
  photoURL,
}: {
  uid: string;
  displayName: string | null;
  photoURL: string | null;
}) => {
  try {
    // console.log("saveProfile");
    // console.log("photoURL[0]:", photoURL?.[0]);
    const docRef = doc(db, `users/${uid}`);
    const docSnap = await getDoc(docRef);
    if (docSnap.data()) {
      // console.log("すでに当アプリのユーザーです");
      return;
    }

    setDoc(docRef, {
      displayName,
      photoURL,
      slug: "",
      desc: "",
    });
  } catch (error: any) {
    console.error("error.body:", error.body);
  }
};
export const updateProfile = async ({
  uid,
  displayName,
  // imageFile,
  photoURL,
  slug,
  desc,
}: {
  uid: string;
  displayName: string;
  // imageFile: File | undefined;
  photoURL: string;
  slug: string;
  desc: string;
}) => {
  try {
    // console.log("imageFile", imageFile);
    const docRef = doc(db, `users/${uid}`);

    // firebase storageの処理
    // let photoURL;
    // if (imageFile) {
    //   photoURL = await uploadAndGetUrl(imageFile);
    // }

    setDoc(docRef, {
      displayName,
      photoURL, // undefined
      slug,
      desc,
    });
  } catch (error: any) {
    console.error("updateProfile error.body:", error.body);
  }
};
