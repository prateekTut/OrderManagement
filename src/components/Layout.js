import { Outlet } from "react-router-dom"
import Headerr from "./Headerr";
import NavBarMain from "./NavBarMain";

const Layout = () => {
    return (
        <main className="App">
            <Headerr />
            <Outlet />
        </main>
    )
}

export default Layout