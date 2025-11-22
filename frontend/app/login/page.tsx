'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { API_BASE } from '../config';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [role, setRole] = useState<'council' | 'contractor'>('council');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const submit = async (e: any) => {
    e.preventDefault();
    try {
      const res = await axios.post<any>(`${API_BASE}/user/login`, {
        email,
        password,
        role,
      });

      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));

      router.push('/dashboard');
    } catch (err: any) {
      alert(err.response?.data?.msg || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
      <form
        onSubmit={submit}
        className="w-full max-w-md bg-white p-6 rounded-lg shadow"
      >
        <h2 className="text-2xl font-semibold mb-4">Login</h2>

        <div className="mb-3">
          <label className="block mb-1">Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value as any)}
            className="w-full p-2 border rounded"
          >
            <option value="council">Council Member</option>
            <option value="contractor">Contractor</option>
          </select>
        </div>

        <input
          className="w-full p-2 mb-3 border rounded"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full p-2 mb-4 border rounded"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full py-2 rounded bg-black text-white">
          Login
        </button>
      </form>
    </div>
  );
}
