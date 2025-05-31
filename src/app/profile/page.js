'use client';
import { useSession } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function ProfilePage() {
  const session = useSession();
  const { status } = session;
  const [userName, setUserName] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (status === 'authenticated') {
      const userData = session.data.user;
      let userName = '';
      if (userData?.name && userData.name.trim() !== '') {
        userName = userData.name;
      } else if (userData?.email) {
        userName = userData.email.split('@')[0];
      }
      setUserName(userName || '');
    }
  }, [session, status]);

  // گرفتن اطلاعات کاربر از API بعد از هر بار لود شدن صفحه
  useEffect(() => {
    async function fetchProfile() {
      if (status === 'authenticated') {
        const res = await fetch('/api/profile');
        if (res.ok) {
          const data = await res.json();
          if (data?.name && userName !== data.name) {
            setUserName(data.name);
          }
        }
      }
    }
    // فقط زمانی که userName خالی است یا مقدار جدید فرق دارد، مقدار را ست کن
    if (!userName) {
      fetchProfile();
    }
  }, [status]);

  async function handleProfileInfoUpdate(ev) {
    ev.preventDefault();
    setIsSaving(true);
    
    const response = await fetch('/api/profile', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: userName }),
    });

    if (response.ok) {
      // Refresh the session to get updated user data
      await session.update();
    }
    
    setIsSaving(false);
  }
 
  if (status === 'loading') {
    return 'Loading...';
  }

  if (status === 'unauthenticated') {
    return redirect('/login');
  }

  return (
    <section className="mt-8">
      <h1 className="text-center text-orange-500 text-4xl mb-4">
        Profile
      </h1>
      <div className="flex flex-col items-center justify-center gap-6">
        <div className="flex flex-col items-center">
          <div className="p-2 rounded-lg relative">
            <div className="relative h-[120px] w-[120px]">
              <Image
                className="rounded-lg object-cover"
                src="/google.png"
                width={120}
                height={120}
                alt={'avatar'}
              />
            </div>
            <button type="button" className="mt-2 text-primary border border-gray-300 rounded-xl px-8 py-2 text-red-400 font-semibold hover:bg-gray-100 transition-all">Edit</button>
          </div>
        </div>
        <form className="w-full max-w-xs mx-auto" onSubmit={handleProfileInfoUpdate}>
          <div className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="First and LastName"
              className="p-2 border rounded-md"
              value={userName}
              onChange={ev => setUserName(ev.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              className="p-2 border rounded-md bg-gray-200"
              value={session.data.user.email}
              disabled 
            />
            <button
              type="submit"
              disabled={isSaving}
              className="bg-orange-500 text-white p-2 rounded-md mt-2 hover:bg-orange-600 disabled:bg-gray-400 font-semibold transition-colors"
            >
              {isSaving ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
