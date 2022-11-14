import { Box, Container, Paper, styled, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { firebaseApp } from '../lib/auth/initializeApp'
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import authErrorMessages from '../lib/auth/authErrorMessages';
import { FirebaseError } from 'firebase/app';
import LoadingButton from '../components/LoadingButton';
import { useRouter } from 'next/router';

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


const SignUp = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleSubmit = async () => {
        if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match")
            return
        }
        setErrorMessage("")
        setLoading(true)
        try {
            const userCredentials = await createUserWithEmailAndPassword(auth, email, password)
            router.push('/todo')
        } catch (e) {
            const error = e as FirebaseError
            const errorCode = error.code as string
            const errorMessage = authErrorMessages[errorCode] || "Something went wrong"
            setErrorMessage(errorMessage)
        } finally {
            setLoading(false)
        }
    }

    return (
        <StyledContainer>
            <StyledLoginPaper>
                <Typography variant="h4" component="h1" gutterBottom>Sign Up</Typography>
                <TextField value={email} onChange={e => setEmail(e.target.value)} label="Email"></TextField>
                <Box mt={2} />
                <TextField value={password} onChange={e => setPassword(e.target.value)} type="password" label="Password"></TextField>
                <Box mt={2} />
                <TextField value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} type="password" label="Confirm Password"></TextField>
                <Box mt={2} />
                <LoadingButton loading={loading} onClick={handleSubmit} variant="contained" color="primary">Sign Up</LoadingButton>
                <Box mt={2} />
                <Typography color="error">{errorMessage}</Typography>
            </StyledLoginPaper>
        </StyledContainer>
    )

}

export default SignUp