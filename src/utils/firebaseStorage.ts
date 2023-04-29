import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

import { storage } from "#/lib/firebase";

export const uploadAndGetUrl = async (imageFile: File) => {
  // try {
  const storageRef = ref(storage, imageFile.name);
  await uploadBytes(storageRef, imageFile);
  return await getDownloadURL(storageRef);
  // } catch (error) {
  //   console.error("error.message");
  // }
};
