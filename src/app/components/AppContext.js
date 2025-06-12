'use client';
import {SessionProvider, useSession} from "next-auth/react";
import { createContext, useState, useContext, useEffect } from 'react';

export const UserContext = createContext({
  userName: '',
  setUserName: () => {},
});

export function useUser() {
  return useContext(UserContext);
}

// Cart count context for showing badge on cart icon
const CartCountContext = createContext();

export function CartCountProvider({ children }) {
  const [cartCount, setCartCount] = useState(0);

  function addToCart() {
    setCartCount(count => count + 1);
  }

  function resetCartCount() {
    setCartCount(0);
  }

  return (
    <CartCountContext.Provider value={{ cartCount, addToCart, resetCartCount }}>
      {children}
    </CartCountContext.Provider>
  );
}

export function useCartCount() {
  return useContext(CartCountContext);
}

// Cart items context for showing actual items in cart page
const CartItemsContext = createContext();

export function CartItemsProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  function addItem(item) {
    setCartItems(prev => {
      const idx = prev.findIndex(i => i.name === item.name);
      if (idx > -1) {
        // If item exists, increase quantity
        return prev.map((i, index) =>
          index === idx ? { ...i, quantity: (i.quantity || 1) + 1 } : i
        );
      } else {
        // If new item, set quantity to 1
        return [...prev, { ...item, quantity: 1 }];
      }
    });
  }

  function removeItem(index) {
    setCartItems(prev => prev.filter((_, i) => i !== index));
  }

  function increaseQuantity(index) {
    setCartItems(prev => prev.map((item, i) =>
      i === index ? { ...item, quantity: (item.quantity || 1) + 1 } : item
    ));
  }

  function decreaseQuantity(index) {
    setCartItems(prev => prev.map((item, i) => {
      if (i === index) {
        const newQty = (item.quantity || 1) - 1;
        return newQty > 0 ? { ...item, quantity: newQty } : item;
      }
      return item;
    }).filter((item, i) => (i !== index || (item.quantity && item.quantity > 0))));
  }

  function clearCart() {
    setCartItems([]);
  }

  return (
    <CartItemsContext.Provider value={{ cartItems, addItem, removeItem, increaseQuantity, decreaseQuantity, clearCart }}>
      {children}
    </CartItemsContext.Provider>
  );
}

export function useCartItems() {
  return useContext(CartItemsContext);
}

export default function AppProvider({ children }) {
    const [userName, setUserName] = useState('');
    const { data: session, status } = useSession();

    useEffect(() => {
        if (status === 'authenticated') {
            let name = session?.user?.name;
            if (name && name.trim() !== '') {
                setUserName(name);
            } else {
                const email = session?.user?.email || '';
                const fallback = email.includes('@') ? email.split('@')[0] : '';
                setUserName(fallback);
            }
        } else {
            setUserName('');
        }
    }, [session, status]);

    return (
        <UserContext.Provider value={{ userName, setUserName }}>
            {children}
        </UserContext.Provider>
    );
}