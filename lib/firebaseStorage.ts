import { storage } from "#/firebase/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const uploadAndGetUrl = async (imageFile: File) => {
  try {
    const storageRef = ref(storage, imageFile.name);
    await uploadBytes(storageRef, imageFile);
    return await getDownloadURL(storageRef);
  } catch (error: any) {
    // console.log("error.message:", error.message);
    throw new Error(error.message);
  }
};
