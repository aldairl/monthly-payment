import { useState } from "react"
import { CustomSidebarContainer } from "../sidebar/CustomSidebarContainer"
import { Outlet } from "react-router-dom"
import { Header } from "../header/Header"

export const MainLayout = () => {
    const [theme, setTheme] = useState('light')
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
    const [toggled, setToggled] = useState(false)

    const hasImage = true

    const toggleTheme = () => {
        setTheme((prev) => (prev === "light" ? "dark" : "light"))
    }

    return (
        <main className="content">

            <Header
                theme={theme}
                ToggleTheme={toggleTheme}
                hasImage={hasImage}
                sidebarCollapsed={sidebarCollapsed}
                toggled={toggled}
                setToggled={setToggled}
            />

            <CustomSidebarContainer
                theme={theme}
                setBroken={setSidebarCollapsed}
                hasImage={hasImage}
                setToggled={setToggled}
                toggled={toggled}
            />
            <Outlet />
        </main>
    )
}
