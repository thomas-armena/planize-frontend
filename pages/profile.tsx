import { gql, useMutation, useQuery } from "@apollo/client"
import { Box, styled, TextField } from "@mui/material"
import { useEffect, useState } from "react"
import CenteredLoading from "../components/CenteredLoading"
import LoadingButton from "../components/LoadingButton"
import LoggedInPage from "../layout/LoggedInPage"
import User from "../types/user"

const getUserQuery = gql`
  query getUser {
    loggedInUser {
      id
      firstName
      lastName
      birthDate
    }
  }
`

const updateUserQuery = gql`
  mutation updateUser($user: UserInput!) {
    updateUser(user: $user) {
      success
      message
      data
    }
  }
`

const PageContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: theme.spacing(2),
  maxWidth: '500px',
}))

const Profile = () => {

  const { data: userData, loading: userLoading, error: userError, refetch } = useQuery<{ loggedInUser: User }>(getUserQuery)
  const [
    updateUser 
  ] = useMutation<{ upsertUser: { success: boolean, message: string, data: User } }>(updateUserQuery)

  const [firstName, setFirstName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')
  const [birthDate, setBirthDate] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const isSynced = 
    firstName === userData?.loggedInUser?.firstName && 
    lastName === userData?.loggedInUser?.lastName && 
    birthDate === userData?.loggedInUser?.birthDate

  useEffect(() => {
    const sync = () => {
      setFirstName(userData?.loggedInUser.firstName || '')
      setLastName(userData?.loggedInUser.lastName || '')
      setBirthDate(userData?.loggedInUser.birthDate || '')
    }
    if (userData?.loggedInUser) sync()
  }, [userData])

  const handleSubmit = async () => {
    setLoading(true)
    try {
      await updateUser({
        variables: {
          user: {
            id: userData?.loggedInUser?.id,
            firstName,
            lastName,
            birthDate,
          }
        }
      })
      await refetch()
    } catch(e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  
  const renderPageContent = () => {
    if (userLoading) return <CenteredLoading />
    return (
      <PageContainer>
        <TextField value={firstName} onChange={e => setFirstName(e.target.value)} label="First Name"/>
        <Box mt={2} />
        <TextField value={lastName} onChange={e => setLastName(e.target.value)} label="Last Name"/>
        <Box mt={2} />
        <TextField value={birthDate} onChange={e => setBirthDate(e.target.value)} label="Birth Date"/>
        <Box mt={2} />
        <LoadingButton loading={loading} onClick={handleSubmit} disabled={isSynced} variant={"contained"} color="primary">Save</LoadingButton>
      </PageContainer>
    )
  }

  return (
    <LoggedInPage>
      {renderPageContent()}
    </LoggedInPage>
  )
}

export default Profile