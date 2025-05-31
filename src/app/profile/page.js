'use client';
import { useSession } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useUser } from "../components/AppContext";

export default function ProfilePage() {
  const session = useSession();
  const { status } = session;
  const [userName, setUserName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const { setUserName: setUserNameContext } = useUser();
  const [phone, setPhone] = useState('');
  const [street, setStreet] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');

  // گرفتن اطلاعات کاربر از API بعد از هر بار لود شدن صفحه
  useEffect(() => {
    async function fetchProfile() {
      if (status === 'authenticated') {
        const res = await fetch('/api/profile');
        if (res.ok) {
          const data = await res.json();
          console.log('API PROFILE DATA:', data); // لاگ مقدار دریافتی از API
          if (data?.name) {
            setUserName(data.name);
            setUserNameContext(data.name);
          }
          if (data?.avatar) {
            setAvatar(data.avatar);
          }
          if (data?.phone) setPhone(data.phone);
          if (data?.street) setStreet(data.street);
          if (data?.postalCode) setPostalCode(data.postalCode);
          if (data?.city) setCity(data.city);
          if (data?.country) setCountry(data.country);
        }
      }
    }
    fetchProfile();
  }, [status]);

  async function handleProfileInfoUpdate(ev) {
    ev.preventDefault();
    setIsSaving(true);
    const response = await fetch('/api/profile', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: userName,
        avatar,
        phone,
        street,
        postalCode,
        city,
        country,
      }),
    });
    if (response.ok) {
      await session.update();
      const res = await fetch('/api/profile');
      if (res.ok) {
        const data = await res.json();
        if (data?.name) {
          setUserName(data.name);
          setUserNameContext(data.name);
        }
        if (data?.avatar) {
          setAvatar(data.avatar);
        }
        if (data?.phone) setPhone(data.phone); else setPhone('');
        if (data?.street) setStreet(data.street); else setStreet('');
        if (data?.postalCode) setPostalCode(data.postalCode); else setPostalCode('');
        if (data?.city) setCity(data.city); else setCity('');
        if (data?.country) setCountry(data.country); else setCountry('');
      }
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    }
    setIsSaving(false);
  }

  // هندلر آپلود عکس
  async function handleFileChange(ev) {
    const files = ev.target.files;
    if (files?.length === 1) {
      const data = new FormData();
      data.set('file', files[0]);
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: data,
      });
      if (res.ok) {
        const result = await res.json();
        if (result?.url) {
          setAvatar(result.url);
        }
      }
    }
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
      {isSaved && (
        <div className="max-w-xs mx-auto">
          <h2 className="text-center bg-green-100 p-3 rounded-lg text-black font-semibold max-w-xs mx-auto text-base mt-4 mb-2 shadow border">
            Profile Saved!
          </h2>
        </div>
      )}
      <div className="flex flex-col items-center justify-center gap-6">
        <div className="flex flex-col items-center">
          <div className="text-center font-bold text-lg mt-2">{userName}</div>
          <div className="p-2 rounded-lg relative">
            <div className="relative w-[120px] h-[120px]">
              <Image
                className="rounded-lg object-cover"
                src={avatar || "/google.png"}
                width={120}
                height={120}
                style={{ aspectRatio: '1/1', objectFit: 'cover' }}
                alt={'avatar'}
              />
            </div>
            <input
              type="file"
              accept="image/*"
              id="avatar-upload"
              className="hidden"
              onChange={handleFileChange}
            />
            <button
              type="button"
              className="mt-2 text-primary border border-gray-300 rounded-xl px-8 py-2 text-red-400 font-semibold hover:bg-gray-100 transition-all"
              onClick={() => document.getElementById('avatar-upload').click()}
            >
              Edit
            </button>
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
            <input
              type="tel"
              placeholder="Phone number"
              className="p-2 border rounded-md"
              value={phone}
              onChange={ev => setPhone(ev.target.value)}
            />
            <input
              type="text"
              placeholder="Street address"
              className="p-2 border rounded-md"
              value={street}
              onChange={ev => setStreet(ev.target.value)}
            />
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="Postal code"
                className="p-2 border rounded-md w-1/2"
                value={postalCode}
                onChange={ev => setPostalCode(ev.target.value)}
              />
              <input
                type="text"
                placeholder="City"
                className="p-2 border rounded-md w-1/2"
                value={city}
                onChange={ev => setCity(ev.target.value)}
              />
            </div>
            <input
              type="text"
              placeholder="Country"
              className="p-2 border rounded-md"
              value={country}
              onChange={ev => setCountry(ev.target.value)}
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
