'use client'


import { createContext,useContext,useState,Dispatch } from "react"
import { set } from "zod";


const UserContext = createContext(null);

type UserContextType = {
    currentUser: User;
    setCurrentUser:Dispatch<any>; 
};

type User = {
    id: string;
    email: string;
    username: string;
    role: string;
    verified?: boolean;

   
};


export function UserProvider({ children, user }: { children: React.ReactNode; user: any }) {
    const [currentUser, setCurrentUser] = useState<User>(user);

    function  setUser(currentUser: User) {
        setCurrentUser(currentUser);
    }

    return (
        <UserContext.Provider value={{
        currentUser,
        setUser

        } }>

            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    return useContext(UserContext);
}