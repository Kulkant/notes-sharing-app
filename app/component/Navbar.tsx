"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem(`token`);
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = async () => {
    localStorage.removeItem(`token`);
    localStorage.removeItem(`role`);
    setIsLoggedIn(false);
    router.push(`/login`);
  };

  return (
    <nav className="flex gap-4 p-4 bg-gray-800 text-white items-center">
      <Link href="/notes">Notes</Link>
      {isLoggedIn && <Link href="/upload">Upload</Link>}
      <div className="ml-auto">
        {!isLoggedIn && (
          <Link href="/login" className="mr-5">
            Login
          </Link>
        )}
        {!isLoggedIn && <Link href="/signup">Signup</Link>}
      </div>
      {isLoggedIn && (
        <button onClick={handleLogout} className="ml-auto">
          Logout
        </button>
      )}
    </nav>
  );
}
