import { collection, limit, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase";

interface Country {
    name: string;
    count: number;
  }

export default function Leadboard() {
    const [topCountries, setTopCountries] = useState<Country[]>([]);
    useEffect(() => {
        const q = query(collection(db, 'countries'), orderBy('count', 'desc'), limit(5));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const updatedTopCountries = querySnapshot.docs.map((doc) => ({
            name: doc.id,
            count: doc.data().count,
          }));
          setTopCountries(updatedTopCountries);
        });
      
        return () => {
          unsubscribe();
        };
      }, []);
      return (
        <div className="inline-block min-w-full py-2 align-middle">
        <h2 className="font-display text-lg text-center">Leaderboard</h2>
        <table className="table-auto">
        <thead>
            <tr className="text-sm font-display">
            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Rank</th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Country</th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Count</th>
            </tr>
          </thead>
          <tbody>
            {topCountries.map((country, index) => (
              <tr key={country.name}>
                <td className="font-display whitespace-nowrap px-3 py-4 text-xs">{index+1}</td>
                <td className="font-display whitespace-nowrap px-3 py-4 text-xs">{country.name}</td>
                <td className="font-display whitespace-nowrap px-3 py-4 text-xs text-center">{country.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      )
}