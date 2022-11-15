import { getAuth } from 'firebase/auth';
import { useState, useEffect } from 'react'
import { AuthUser } from '../../types/auth';
import apolloClient from '../apolloClient';
import { firebaseApp } from '../auth/initializeApp';

const auth = getAuth(firebaseApp)

export default function useFirebaseAuth() {
    const [authUser, setAuthUser] = useState<AuthUser | null>(null);
    const [loading, setLoading] = useState(true);

    // listen for Firebase state change
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
            if (!currentUser) {
                setAuthUser(null)
                setLoading(false)
                return;
            } 
            const uid = currentUser.uid ?? '';
            const email = currentUser.email ?? '';
            const tokenId = await currentUser.getIdToken();
            await apolloClient.resetStore()

            setLoading(false)

            setAuthUser({
                userId: uid,
                email,
                tokenId
            })

        });
        return () => unsubscribe();
    }, []);

    return {
        authUser,
        loading
    };
}