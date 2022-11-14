import { CircularProgress, Container, styled } from "@mui/material"


const StyledContainer = styled(Container)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(2),
    height: '100%',
}))

const CenteredLoading = () => {
    return <StyledContainer><CircularProgress /></StyledContainer>
}

export default CenteredLoading