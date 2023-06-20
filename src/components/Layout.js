import { Outlet } from "react-router-dom"
import Headerr from "./Headerr";

const Layout = () => {
    return (
        <main className="App">
            <Headerr />
            <Outlet />
        </main>
    )
}

export default Layout