
export interface AuthUser {
    userId: string;
    tokenId: string;
    email: string;
}

export interface AuthContext {
    authUser: AuthUser | null;
    loading: boolean;
}
