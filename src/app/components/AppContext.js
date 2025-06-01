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

  return (
    <CartCountContext.Provider value={{ cartCount, addToCart }}>
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
    setCartItems(prev => [...prev, item]);
  }

  return (
    <CartItemsContext.Provider value={{ cartItems, addItem }}>
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