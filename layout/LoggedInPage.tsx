import { Drawer } from "@mui/material"
import { ReactNode } from "react"
import CustomAppBar from "./CustomAppBar"
import AuthProtectedPage from "./AuthProtectedPage"



const LoggedInPage = ({ children }: { children: ReactNode }) => {



    return <AuthProtectedPage>
        <CustomAppBar />
        {children}
    </AuthProtectedPage>

}

export default LoggedInPage