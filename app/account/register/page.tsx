"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useRegister } from "@/hooks/useAccount";
export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [register, { loading, error }] = useRegister();
  const router = useRouter();

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setErrorMessage('');

    try {
      const { data } = await register({ variables: { email, password } });
      if (data?.register?.message) {
        alert("Registration successful! You can now log in.");
        router.push('/login'); 
      } else {
        setErrorMessage("Registration failed. Please try again.");
      }
    } catch (err) {
      setErrorMessage("Registration error. Try a different email.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Register</h1>
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
          className="bg-green-500 text-white px-4 py-2" 
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
}
