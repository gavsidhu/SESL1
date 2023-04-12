import { useEffect, useState } from "react";
import { db } from "../../firebase";
import {
  doc,
  increment,
  onSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import axios from "axios";
import ClickMap from "@/components/ClickMap";
import addMarker from "@/lib/addMarker";
import Leadboard from "@/components/Leaderboard";
import Footer from "@/components/Footer";

type CountryData = {
  country: string;
  latitude: number;
  longitude: number;
};

export default function Home() {
  const [count, setCount] = useState(null);
  const [location, setLocation] = useState<null | CountryData>(null);
  useEffect(() => {
    const unsub = onSnapshot(doc(db, "clicks", "counter"), (doc) => {
      if (doc.exists()) {
        setCount(doc.data().count);
      } else console.error("Doc does not exist");
    });
    axios
      .get("https://ipapi.co/json/")
      .then((response) => {
        setLocation({
          country: response.data.country_name,
          latitude: response.data.latitude,
          longitude: response.data.longitude,
        });
      })
      .catch((error) => {
        console.error("Error getting country:", error);
      });
    return () => {
      unsub();
    };
  }, [db]);

  const handleClick = async () => {
    const counterRef = doc(db, "clicks", "counter");
    await updateDoc(counterRef, {
      count: increment(1),
    });
    if (!location?.country) {
      return;
    }
    const countriesRef = doc(db, "countries", location?.country);
    await setDoc(countriesRef, { count: increment(1) }, { merge: true });
    await addMarker(location?.latitude, location?.longitude);
  };
  return (
    <>
    <main className="max-w-5xl mx-auto">
      <div className="flex flex-col items-center space-y-8 lg:flex-row px-4 py-12">
        <div className="text-center mx-auto space-y-8">
          <div className="space-y-8">
            <h2 className="font-display text-center text-3xl">Count</h2>
            <p className="font-display text-center text-5xl">{count}</p>
          </div>
          <div>
            <button
              onClick={handleClick}
              className="px-5 py-3 bg-black text-white font-normal hover:shadow-lg"
            >
              Click
            </button>
          </div>
        </div>
        <div className="mx-auto">
          <Leadboard />
        </div>
      </div>
      <div>
        <ClickMap />
      </div>
    </main>
  <Footer />
  </>
  );
}
