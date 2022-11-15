import { AppBar, Box, Drawer, IconButton, Menu, MenuItem, styled, Toolbar } from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu';
import AppTitle from "../components/AppTitle";
import { AccountCircle } from "@mui/icons-material";
import { useState } from "react";
import useAuth from "../lib/hooks/useAuth";
import { getAuth, signOut } from "firebase/auth";
import { firebaseApp } from "../lib/auth/initializeApp";
import { useRouter } from "next/router";


const StyledDrawer = styled(Drawer)(({ theme }) => ({
    width: '250px',
    flexShrink: 0,
    '& .MuiDrawer-paper': {
        width: '250px',
        boxSizing: 'border-box',
    },
}))

const auth = getAuth(firebaseApp)

const CustomAppBar = () => {

    const { authUser } = useAuth()

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [drawerOpen, setDrawerOpen] = useState(false)
    const router = useRouter()

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = async () => {
        await signOut(auth)
        handleClose()
    }

    const handleMyProfile = () => {
        router.push('/profile')
        handleClose()
    }

    return (
        <AppBar position="static">
            <StyledDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} variant="temporary">
                Test
            </StyledDrawer>
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                    onClick={() => setDrawerOpen(true)}
                >
                    <MenuIcon />
                </IconButton>
                <AppTitle />
                <Box flexGrow={1} />
                {authUser && (
                    <div>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleMyProfile}>My Profile</MenuItem>
                            <MenuItem onClick={handleLogout}>Logout</MenuItem>
                        </Menu>
                    </div>
                )}

            </Toolbar>

        </AppBar>

    )
}

export default CustomAppBar