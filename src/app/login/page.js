"use client"
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useSession, signIn } from "next-auth/react";

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);
  const [error, setError] = useState(false);
  const { status } = useSession();

  async function handleFormSubmit(ev) {
    ev.preventDefault();
    setLoggingIn(true);
    setError(false);

    const result = await signIn('credentials', {
      redirect: false,
      username: email,
      password,
    });

    if (result.ok) {
      window.location.href = '/';
    } else {
      setError(true);
    }
    setLoggingIn(false);
  }

  return (
    <section className="mt-8">
      <h1 className="text-center text-primary text-4xl mb-4">
        Login
      </h1>
      {error && (
        <div className="my-4 text-center text-red-500">
          Invalid email or password.<br /> Please try again.
        </div>
      )}
      <form className="block max-w-xs mx-auto" onSubmit={handleFormSubmit}>
        <input
          type="email"
          placeholder="email"
          value={email}
          disabled={loggingIn}
          onChange={(ev) => setEmail(ev.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          disabled={loggingIn}
          onChange={(ev) => setPassword(ev.target.value)}
        /> 
        <button type="submit" disabled={loggingIn}>
          {loggingIn ? 'Logging in...' : 'Login'}
        </button>
        <div className="my-4 text-center text-gray-500">
          or login with provider
        </div>
        <button type="button" className="flex gap-4 justify-center items-center">
          <Image src={'/google.png'} alt={''} width={24} height={24} />
          Login with google
        </button>
        <div className="text-center my-4 text-gray-500 border-t pt-4">
          Don't have an account?{' '}
          <Link className="underline" href={'/register'}>Register here &raquo;</Link>
        </div>
      </form>
    </section>
  );
} 