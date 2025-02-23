"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [fragrances, setFragrances] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/fragrances")
      .then(res => res.json())
      .then(data => setFragrances(data.data));
  }, []);

  const filteredFragrances = fragrances.filter(f =>
    f.name.toLowerCase().includes(search.toLowerCase()) ||
    f.family.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-dark min-h-screen text-primary p-8">
      <h1 className="text-4xl font-bold text-center">🌸 Inestasy - Profumeria 🌸</h1>

      <div className="flex justify-center my-4">
        <input
          type="text"
          placeholder="Cerca per nome o famiglia olfattiva..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border border-primary rounded-md"
        />
      </div>

      <div className="max-w-5xl mx-auto bg-white p-4 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center">Lista Fragranze</h2>
        <table className="w-full border-collapse border border-gray-400 mt-4">
          <thead>
            <tr className="bg-primary text-white">
              <th className="p-2 border">Nome</th>
              <th className="p-2 border">Equivalente</th>
              <th className="p-2 border">Famiglia</th>
              <th className="p-2 border">Suggeriti per Layering</th>
            </tr>
          </thead>
          <tbody>
            {filteredFragrances.map((f) => (
              <tr key={f._id} className="text-black">
                <td className="p-2 border">{f.name}</td>
                <td className="p-2 border">{f.equivalent}</td>
                <td className="p-2 border">{f.family}</td>
                <td className="p-2 border">{f.suggestions.length > 0 ? f.suggestions.join(", ") : "Nessuno"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
