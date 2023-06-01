import { collection, doc, getDoc, getFirestore } from "firebase/firestore";
import { FUser } from "./types";

export const getUser = async (uid: string): Promise<FUser | undefined> => {
  const db = getFirestore();
  const col = collection(db, 'users');
  const docRef = doc(col, uid);
  const userDoc = await getDoc(docRef);
  const data = userDoc.data();
  return data as FUser | undefined;
}