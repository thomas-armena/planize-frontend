import { Router, useRouter } from "next/router";
import CenteredLoading from "../components/CenteredLoading";
import useAuth from "../lib/hooks/useAuth";



const AuthProtectedPage = ({ children }: { children: React.ReactNode }) => {

    const { authUser, loading } = useAuth();
    const router = useRouter()

    if (loading) {
        return <CenteredLoading />
    }

    if (!authUser) {
        router.push('/login')
    }

    return <>{children}</>;
};


export default AuthProtectedPage
