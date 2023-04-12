import { collection, doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import { db } from "../../firebase";

interface Marker {
  latitude: number;
  longitude: number;
}

const geoUrl =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";

const ClickMap = () => {
  const [markers, setMarkers] = useState<Marker[]>([]);
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "markers"),
      (querySnapshot) => {
        const updatedMarkers: Marker[] = [];
        querySnapshot.forEach((doc) => {
          const marker = doc.data() as Marker;
          updatedMarkers.push(marker);
        });
        setMarkers(updatedMarkers);
      },
      (error) => {
        console.error(error);
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <ComposableMap>
      <Geographies geography={geoUrl}>
        {({ geographies }) =>
          geographies.map((geo) => (
            <Geography
              key={geo.rsmKey}
              geography={geo}
              fill="#EAEAEC"
              stroke="#D6D6DA"
            />
          ))
        }
      </Geographies>
      {markers.map((marker, i) => (
        <Marker key={i} coordinates={[marker.longitude, marker.latitude]}>
          <circle r={3} fill="#F00" stroke="#fff" />
        </Marker>
      ))}
    </ComposableMap>
  );
};

export default ClickMap;
