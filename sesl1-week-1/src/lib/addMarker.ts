import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";

export default async function addMarker(latitude: number, longitude: number) {
    const markerRef = doc(db, 'markers', `${latitude},${longitude}`);
    await setDoc(markerRef, { latitude, longitude }, { merge: true });
  }