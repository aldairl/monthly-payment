import { useContext, useEffect, useState } from "react"
import { CustomSidebarContainer } from "../sidebar/CustomSidebarContainer"
import { Outlet } from "react-router-dom"
import { Header } from "../header/Header"
import { ColorModeContext } from "../../../../theme"
import { useTheme } from "@mui/material"

export const MainLayout = () => {
    const themMaterial = useTheme()
    const [theme, setTheme] = useState(themMaterial.palette.mode)
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
    const [toggled, setToggled] = useState(false)
    const colorMode = useContext(ColorModeContext)

    const hasImage = true

    const toggleTheme = () => {
        colorMode.toggleColorMode()
    }

    useEffect(() => {
        setTheme(themMaterial.palette.mode)
    }, [themMaterial])

    return (
        <div style={{ display: 'flex', height: '100vh', width: '100%' }}>

            <CustomSidebarContainer
                theme={theme}
                setBroken={setSidebarCollapsed}
                hasImage={hasImage}
                setToggled={setToggled}
                toggled={toggled}
            />
            <main className="content">
                <Header
                    theme={theme}
                    ToggleTheme={toggleTheme}
                    hasImage={hasImage}
                    sidebarCollapsed={sidebarCollapsed}
                    toggled={toggled}
                    setToggled={setToggled}
                />
                <Outlet />
            </main>
        </div>
    )
}
