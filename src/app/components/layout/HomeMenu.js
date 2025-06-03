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
      <div className="absolute  left-0 right-0 w-full justify-start">
        <div className="absolute left-0 -top-[70px] text-left -z-10">
          <Image src={'/spanak-l.png'} width={109} height={189} alt={'sallad'} />
        </div>
        <div className="absolute -top-[100px] right-0 -z-10">
          <Image src={'/spanak-r.png'} width={107} height={195} alt={'sallad'} />
        </div>
      </div>

      <div className="text-center mb-4">
        <SectionHeaders subHeader={"Goz atmak"} mainHeader={"Menü"} />
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