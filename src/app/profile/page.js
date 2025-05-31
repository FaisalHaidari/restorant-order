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
      <div className="flex gap-4 items-center">
        <div>
          <div className="p-2 rounded-lg relative">
            <div className="relative h-full w-full">
              <Image
                className="rounded-lg w-full h-full"
                src="/google.png"
                width={250}
                height={250}
                alt={'avatar'}
              />
            </div>
            <button type="button" className="mt-2 text-primary">Change avatar</button>
          </div>
        </div>
        <form className="grow mt-4" onSubmit={handleProfileInfoUpdate}>
          <div className="grow">
            <input
              type="text"
              placeholder="First and LastName"
              className="w-full p-2 border rounded-md"
              value={userName}
              onChange={ev => setUserName(ev.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full p-2 border rounded-md mt-2"
              value={session.data.user.email}
              disabled 
            />
            <button
              type="submit"
              disabled={isSaving}
              className="w-full bg-orange-500 text-white p-2 rounded-md mt-4 hover:bg-orange-600 disabled:bg-gray-400"
            >
              {isSaving ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
