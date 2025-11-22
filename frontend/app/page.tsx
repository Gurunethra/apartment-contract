import Link from 'next/link';
import React from 'react';


export default function Home(){
return (
<main className="min-h-screen flex items-center justify-center bg-linear-to-br from-purple-400 via-pink-400 to-red-400">
<div className="w-full max-w-xl p-8 bg-white/90 rounded-2xl shadow-lg text-center">
<h1 className="text-3xl font-bold mb-4">Contractor Service Finder</h1>
<p className="mb-6">Find electricians, plumbers and more — fast.</p>
<div className="flex gap-4 justify-center">
<Link href="/login"><button className="px-6 py-2 rounded-full bg-black text-white">Existing User</button></Link>
<Link href="/register"><button className="px-6 py-2 rounded-full border border-black">New User</button></Link>
</div>
</div>
</main>
);
}
