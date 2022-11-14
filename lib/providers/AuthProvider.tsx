import { createContext, useContext } from 'react'
import { AuthContext } from '../../types/auth';
import useFirebaseAuth from '../hooks/useAuth';

const AuthUserContext = createContext<AuthContext>({
    authUser: null,
    loading: true
});

const AuthUserContextProvider = AuthUserContext.Provider

export function AuthUserProvider({ children }: { children: React.ReactNode }) {
    const auth = useFirebaseAuth();
    return <AuthUserContextProvider value={auth}> {children} </AuthUserContextProvider>;
}

export const useAuth = () => useContext(AuthUserContext);