"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLogin } from "@/hooks/useAccount";

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); 
  const [login, { loading, error }] = useLogin(); 
  const router = useRouter();

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setErrorMessage(''); 

    try {
      const { data } = await login({ variables: { email, password } });
      if (data?.login?.access_token) {
        localStorage.setItem('access_token', data.login.access_token);
        router.refresh();
        router.push('/post/myposts'); 

      } else {
        setErrorMessage("Invalid credentials. Please try again.");
      }
    } catch (err) {
      setErrorMessage("Login failed. Check your credentials.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Login</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input 
          type="email" 
          placeholder="Email" 
          className="border p-2 w-full"
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
        <input 
          type="password" 
          placeholder="Password" 
          className="border p-2 w-full"
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
        {errorMessage && <p className="text-red-500">{errorMessage}</p>} 
        <button 
          type="submit" 
          className="bg-blue-500 text-white px-4 py-2" 
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
