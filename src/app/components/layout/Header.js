"use client";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useUser } from "../AppContext";
import SmoothScrollLink from "./SmoothScrollLink";
import { useCartCount } from "../AppContext";

export default function Header() {
  const { data: session, status } = useSession();
  const { userName } = useUser();
  const router = useRouter();
  const { cartCount } = useCartCount();

  return (
    <header className="flex items-center justify-between ">
      <Link className="text-orange-500 font-semibold text-2xl" href={"/"}>
        ATAKUM KAVURMACISI
      </Link>
      <nav className="flex items-center gap-8 text-gray-500 font-semibold">
        <Link href={"/"}>Anasayfa</Link>
        <Link href={"/menu"}>Menu</Link>
        <SmoothScrollLink href={"/#about"}>Hakkında</SmoothScrollLink>
        <SmoothScrollLink href={"/#contact"}>ILETISIM</SmoothScrollLink>
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
            <Link href={'/cart'} className="ml-2 relative">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-8 h-8 text-orange-500 bg-white rounded-full p-1 border border-orange-300">
                <path d="M2.25 3a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 .728.573l.401 2.007A2.25 2.25 0 0 0 6.09 7.5h11.32a2.25 2.25 0 0 1 2.197 2.684l-1.2 6A2.25 2.25 0 0 1 16.197 18H7.803a2.25 2.25 0 0 1-2.21-1.816L4.01 7.607M6 21a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm12 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
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