"use client";
import Link from 'next/link';
import { useAuth } from '../hooks/useAuth';

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between">
      <Link href="/" className="text-xl font-bold">My Blog</Link>

      <div className="flex space-x-4">
        {isAuthenticated ? (
          <><button onClick={logout} className="bg-red-500 px-4 py-2 rounded">Logout</button>
          <Link href="/post/create" className="bg-blue-500 px-4 py-2 rounded">Create Post</Link>
          <Link href="/post/myposts" className="bg-blue-500 px-4 py-2 rounded">My Posts</Link>
          </>
        ) : (
          <>
            <Link href="/account/login" className="bg-blue-500 px-4 py-2 rounded">Login</Link>
            <Link href="/account/register" className="bg-green-500 px-4 py-2 rounded">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
