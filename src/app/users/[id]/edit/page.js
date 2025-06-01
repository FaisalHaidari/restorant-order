"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";

export default function EditUserPage() {
  const params = useParams();
  const userId = params.id;

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/users/${userId}`)
      .then(res => res.json())
      .then(data => setUser(data))
      .finally(() => setLoading(false));
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>User not found</div>;

  return (
    <section className="mt-4 flex flex-col items-center justify-center min-h-[80vh]">
      <h1 className="text-center text-orange-500 text-3xl mb-4">Profile</h1>
      <div className="bg-white p-2 rounded-lg flex flex-col md:flex-row gap-4 items-start w-full max-w-md">
        {/* Profile Image and Edit Button Section */}
        <div className="flex flex-col items-center w-full md:w-1/3 md:items-center gap-1">
          <div className="relative w-[100px] h-[100px]">
            <Image
              className="rounded-2xl object-cover"
              src={user.avatar || "/google.png"}
              width={100}
              height={100}
              style={{ aspectRatio: '1/1', objectFit: 'cover' }}
              alt={'avatar'}
            />
          </div>
          <button
            type="button"
            className="text-orange-500 border border-orange-400 rounded-xl px-3 py-1 text-sm font-semibold hover:bg-orange-50 transition-all h-8 mt-1"
            disabled
          >
            Edit
          </button>
        </div>
        {/* Form Section */}
        <form className="flex-1 flex flex-col gap-1 w-full">
          <label className="block text-xs font-medium text-gray-700 mb-0" htmlFor="name">First and last name</label>
          <input
            id="name"
            type="text"
            className="p-1 border rounded-md bg-gray-100 text-sm h-8 mt-0"
            value={user.name || ""}
            readOnly
          />
          <label className="block text-xs font-medium text-gray-700 mb-0" htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            className="p-1 border rounded-md bg-gray-300 cursor-not-allowed text-sm h-8 mt-0"
            value={user.email || ""}
            disabled
          />
          <label className="block text-xs font-medium text-gray-700 mb-0" htmlFor="phone">Phone</label>
          <input
            id="phone"
            type="tel"
            className="p-1 border rounded-md bg-gray-100 text-sm h-8 mt-0"
            value={user.phone || ""}
            readOnly
          />
          <label className="block text-xs font-medium text-gray-700 mb-0" htmlFor="street">Street address</label>
          <input
            id="street"
            type="text"
            className="p-1 border rounded-md bg-gray-100 text-sm h-8 mt-0"
            value={user.street || ""}
            readOnly
          />
          <div className="flex gap-1">
            <div className="flex-1">
              <label className="block text-xs font-medium text-gray-700 mb-0" htmlFor="postalCode">Postal code</label>
              <input
                id="postalCode"
                type="text"
                className="p-1 border rounded-md bg-gray-100 text-sm h-8 w-full mt-0"
                value={user.postalCode || ""}
                readOnly
              />
            </div>
            <div className="flex-1">
              <label className="block text-xs font-medium text-gray-700 mb-0" htmlFor="city">City</label>
              <input
                id="city"
                type="text"
                className="p-1 border rounded-md bg-gray-100 text-sm h-8 w-full mt-0"
                value={user.city || ""}
                readOnly
              />
            </div>
          </div>
          <label className="block text-xs font-medium text-gray-700 mb-0" htmlFor="country">Country</label>
          <input
            id="country"
            type="text"
            className="p-1 border rounded-md bg-gray-100 text-sm h-8 mt-0"
            value={user.country || ""}
            readOnly
          />
          <button
            type="submit"
            className="bg-red-500 text-white p-1 rounded-md mt-2 font-semibold text-sm h-8"
            disabled
          >
            Save
          </button>
        </form>
      </div>
    </section>
  );
} 