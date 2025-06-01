"use client";
import { useEffect, useState } from "react";
import MenuItemCard from "../components/menu/MenuItemCard";

export default function MenuPage() {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/menu-items")
      .then(res => res.json())
      .then(data => setMenuItems(data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="flex flex-col items-center justify-center min-h-[60vh]">
      <h1 className="text-3xl font-bold text-orange-500 mb-4">Menu</h1>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
          {menuItems.map(item => (
            <MenuItemCard
              key={item.id}
              image={item.image || "/ekmekarasi.jpeg"}
              name={item.name}
              ingredients={item.description}
              price={item.price}
              onAddToCart={() => {}}
            />
          ))}
        </div>
      )}
    </section>
  );
} 