"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch(`/api/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();

    setMessage(data.message);

    router.push("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm flex flex-col gap-4"
      >
        <h1 className="text-2xl font-semibold text-gray-800 text-center">
          Sign Up
        </h1>

        <div>
          <label htmlFor="name">Name : </label>
          <input
            type="text"
            id="name"
            placeholder="Enter your name"
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 w-[95%] focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label htmlFor="name">Email : </label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 w-[95%] focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label htmlFor="password">Password : </label>
          <input
            type="text"
            id="password"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 w-[95%] focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <button className="bg-blue-600 text-white rounded-md py-2 font-medium hover:bg-blue-700 transition-colors">
          Signup
        </button>

        {message && (
          <p className="text-red-500 text-sm text-center">{message}</p>
        )}

        <p className="text-sm text-center text-gray-500">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Login
          </a>
        </p>
      </form>
    </div>
  );
}
