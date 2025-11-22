'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE } from '../config';
import ContractorCard from '../components/ContractorCard';

export default function Dashboard() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);

  const search = async () => {
    try {
      const res = await axios.get<any[]>(`${API_BASE}/contractor`, {
        params: { q: query },
      });
      setResults(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    search();
  }, []);

  return (
    <div className="min-h-screen p-6 bg-slate-50">
      <div className="max-w-4xl mx-auto">
        <div className="flex gap-3 mb-4">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search contractors or company"
            className="flex-1 p-3 border rounded"
          />

          <button onClick={search} className="px-4 py-2 rounded bg-black text-white">
            Search
          </button>
        </div>

        {results.length === 0 ? (
          <p>No contractors found.</p>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {results.map((r) => (
              <ContractorCard key={r._id} contractor={r} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
