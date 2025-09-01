import { useEffect, useState } from "react";
import SchoolCard from "@/components/SchoolCard";

export default function ShowSchools() {
  const [schools, setSchools] = useState([]);

useEffect(() => {
  async function fetchSchools() {
    const res = await fetch("/api/schools");
    const data = await res.json();
    console.log("Fetched schools:", data); // 🔎 debug
    setSchools(data);
    console.log(data)
  }
  fetchSchools();
}, []);


  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-3xl font-bold mb-6">Schools</h2>
      <div className="grid bg-red-500 gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {schools.map((school) => (
          <SchoolCard key={school.id} school={school} />
        ))}
      </div>
    </div>
  );
}
