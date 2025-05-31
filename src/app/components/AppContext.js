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