import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react';

interface UserContextData {
    userName: string;
    setUserName: Dispatch<SetStateAction<string>>;
}

type UserProviderProps = {
    children: ReactNode;
}

const UserContext  = createContext({} as UserContextData);

export function UserProvider({children}: UserProviderProps){
    const [userName, setUserName] = useState('');
       
    return (
        <UserContext.Provider value={{userName, setUserName}}>
            {children}
        </UserContext.Provider>
    )
}

export function useUserContext(){
    const context = useContext(UserContext);

    return context;
}

