'use client';
import React, { useState } from 'react';
import axios from 'axios';
import { API_BASE } from '../config';
import { useRouter } from 'next/navigation';
export default function Register(){
const [role,setRole] = useState<'council'|'contractor'>('council');
const router = useRouter();
// common
const [name,setName] = useState('');
const [email,setEmail] = useState('');
const [password,setPassword] = useState('');
const [phone,setPhone] = useState('');
// council
const [apartment,setApartment] = useState('');
const [designation,setDesignation] = useState('');
// contractor extra
const [companyName,setCompanyName] = useState('');
const [skills,setSkills] = useState('');
const [experience,setExperience] = useState('');
const [license,setLicense] = useState('');
const submit = async (e:any) =>{
e.preventDefault();
try{
const body:any = { name, email, password, phone, role };
if(role==='council'){ body.apartment = apartment; body.designation =
designation; }
await axios.post(`${API_BASE}/user/register`, body);
if(role==='contractor'){
// create contractor profile quickly
await axios.post(`${API_BASE}/contractor`, { companyName: companyName
|| name, skills, experienceYears: experience, licenseNumber: license, phone,
email, location: apartment });
}
alert('Registered successfully');
router.push('/login');
}catch(err:any){ alert(err.response?.data?.msg || 'Registration failed'); }
}
return (
<div className="min-h-screen flex items-center justify-center bg-gradient￾to-br from-white to-slate-50 p-6">
<form onSubmit={submit} className="w-full max-w-2xl bg-white p-6 rounded￾lg shadow">
<h2 className="text-2xl font-semibold mb-4">Register</h2>
<div className="grid grid-cols-2 gap-3">
<div>
<label>Role</label>
<select value={role} onChange={e=>setRole(e.target.value as any)}
className="w-full p-2 border rounded">
<option value="council">Council Member</option>
<option value="contractor">Contractor</option>
</select>
</div>
<div>
<label>Phone</label>
<input value={phone} onChange={e=>setPhone(e.target.value)}
className="w-full p-2 border rounded" />
</div>
</div>
<div className="mt-3 grid grid-cols-2 gap-3">
<input value={name} onChange={e=>setName(e.target.value)}
placeholder="Full name" className="p-2 border rounded" />
<input value={email} onChange={e=>setEmail(e.target.value)}
placeholder="Email" className="p-2 border rounded" />
<input value={password} onChange={e=>setPassword(e.target.value)}
placeholder="Password" type="password" className="p-2 border rounded" />
<input value={apartment} onChange={e=>setApartment(e.target.value)}
placeholder="Apartment (optional)" className="p-2 border rounded" />
</div>
{role==='council' && (
<div className="mt-3">
<input value={designation}
onChange={e=>setDesignation(e.target.value)} placeholder="Designation (e.g. 
Secretary)" className="w-full p-2 border rounded" />
</div>
)}
{role==='contractor' && (
<div className="mt-3 grid grid-cols-2 gap-3">
<input value={companyName}
onChange={e=>setCompanyName(e.target.value)} placeholder="Company name"
className="p-2 border rounded" />
<input value={skills} onChange={e=>setSkills(e.target.value)}
placeholder="Skills (comma-separated)" className="p-2 border rounded" />
<input value={experience}
onChange={e=>setExperience(e.target.value)} placeholder="Experience (years)"
className="p-2 border rounded" />
<input value={license} onChange={e=>setLicense(e.target.value)}
placeholder="License number" className="p-2 border rounded" />
</div>
)}
<button className="mt-4 w-full py-2 rounded bg-black text-center">Register</button>
</form>
</div>
);
}