// ./pages/demo
import React from 'react'
import AuthProtectedPage from '../layout/AuthProtectedPage'
import LoggedInPage from '../layout/LoggedInPage';
import useAuth from '../lib/hooks/useAuth';


const Todo = () => {
    const { authUser } = useAuth();
    return (
        <LoggedInPage>
            {authUser?.email}
        </LoggedInPage>
    )
}

export default Todo

