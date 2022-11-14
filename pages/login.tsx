import { Box, Button, Container, Link, Paper, styled, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { firebaseApp } from '../lib/auth/initializeApp'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import AppTitle from '../components/AppTitle';
import { FirebaseError } from 'firebase/app';
import authErrorMessages from '../lib/auth/authErrorMessages';
import { useRouter } from 'next/router';
import LoadingButton from '../components/LoadingButton';

const auth = getAuth(firebaseApp)

const StyledContainer = styled(Container)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(2),
    height: '100%',
}))

const StyledLoginPaper = styled(Paper)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(2),
    minWidth: '500px',
}))


const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleSubmit = async () => {
        setErrorMessage("")
        setLoading(true)
        try {
            const userCredentials = await signInWithEmailAndPassword(auth, email, password)
            router.push('/todo')
        } catch (e) {
            const error = e as FirebaseError
            const errorMessage = authErrorMessages[error.code] || "Something went wrong"
            setErrorMessage(errorMessage)
            setLoading(false)
        }
    }

    return (
        <StyledContainer>
            <StyledLoginPaper>
                <AppTitle />
                <Box mt={2} />
                <TextField value={email} onChange={e => setEmail(e.target.value)} label="Email"></TextField>
                <Box mt={2} />
                <TextField value={password} onChange={e => setPassword(e.target.value)} label="Password" type="password"></TextField>
                <Box mt={2} />
                <LoadingButton onClick={handleSubmit} variant="contained" color="primary" loading={loading}>Log In</LoadingButton>
                <Box mt={2} />
                <Typography color="error">{errorMessage}</Typography>
            </StyledLoginPaper>
            <Box mt={2} />
            <Link href="/signup" underline='none'>Create an account</Link>
        </StyledContainer>
    )

}

export default Login