"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import MenuItemCard from "../menu/MenuItemCard";
import SectionHeaders from "./SectionHeaders";
import { useCartCount, useCartItems } from "../AppContext";

export default function HomeMenu() {
  const [items, setItems] = useState([]);
  const { addToCart } = useCartCount();
  const { addItem } = useCartItems();

  useEffect(() => {
    fetch("/api/menu-items?category=Yiyecek")
      .then(res => res.json())
      .then(data => setItems(data.slice(0, 6)));
  }, []);

  function handleAddToCart(item) {
    addToCart();
    addItem(item);
  }

  return (
    <section className="">
      <div className="text-center mb-4">
        <SectionHeaders subHeader={"Göz Atmak"} mainHeader={"Menü"} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {items.map(item => (
          <MenuItemCard
            key={item.id}
            image={item.image || "/ekmekarasi.jpeg"}
            name={item.name}
            ingredients={item.description}
            price={item.price}
            onAddToCart={() => handleAddToCart(item)}
          />
        ))}
      </div>
    </section>
  );
}