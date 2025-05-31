"use client";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useUser } from "../AppContext";

export default function Header() {
  const { data: session, status } = useSession();
  const { userName } = useUser();
  const router = useRouter();

  return (
    <header className="flex items-center justify-between ">
      <Link className="text-orange-500 font-semibold text-2xl" href={"/"}>
        ATAKUM KAVURMACISI
      </Link>
      <nav className="flex items-center gap-8 text-gray-500 font-semibold">
        <Link href={"/"}>Anasayfa</Link>
        <Link href={""}>Menu</Link>
        <Link href={""}>Hakkında</Link>
        <Link href={""}>ILETISIM</Link>
      </nav>
      <nav className="flex items-center gap-4 text-gray-500 font-semibold">
        {status === 'loading' && (
          <></>
        )}
        {status === 'authenticated' && (
          <>
            <Link href={'/profile'}>{userName}</Link>
            <button
              onClick={() => signOut()}
              className="bg-orange-500 rounded-full text-white px-8 py-2"
            >
              Logout
            </button>
          </>
        )}
        {status === 'unauthenticated' && (
          <>
            <Link href={'/login'}>Login</Link>
            <Link href={'/register'} className="bg-orange-500 rounded-full text-white px-8 py-2">
              Register
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}