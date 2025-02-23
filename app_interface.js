import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectItem } from "@/components/ui/select";
import Image from "next/image";
import { motion } from "framer-motion";

const fetchFragrances = async (query) => {
  const response = await fetch(`/api/fragrances?search=${query}`);
  const data = await response.json();
  return data.fragrances;
};

export default function PerfumeFinder() {
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedFragrance, setSelectedFragrance] = useState(null);

  useEffect(() => {
    if (search.length > 2) {
      fetchFragrances(search).then(setSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [search]);

  return (
    <div className="p-4 max-w-2xl mx-auto text-center bg-black text-pink-300 min-h-screen font-serif">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        <Image src="/logo-inestasy.png" alt="Inestasy Logo" width={200} height={100} className="mx-auto mb-4" />
        <h1 className="text-3xl font-bold mb-6">Trova la Tua Fragranza</h1>
      </motion.div>
      <Input className="bg-pink-100 text-black border-pink-500" placeholder="Cerca per nome o equivalente..." value={search} onChange={(e) => setSearch(e.target.value)} />
      {suggestions.length > 0 && (
        <motion.div className="border bg-pink-900 text-white shadow-md mt-2 rounded-md p-2" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          {suggestions.map((f) => (
            <div key={f.id} className="cursor-pointer p-2 hover:bg-pink-700" onClick={() => setSelectedFragrance(f)}>
              {f.name} ({f.equivalent})
            </div>
          ))}
        </motion.div>
      )}
    </div>
  );
}