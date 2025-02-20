import PropTypes from 'prop-types'
import { menuClasses } from 'react-pro-sidebar'
import { CustomSidebar } from "./CustomSidebar"
import { hexToRgba, themes } from './themeSidebar'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../../auth/store/authSlice'
import { useNavigate } from 'react-router-dom'
import { cleanBox } from '../../dashboard/components/boxes/store/boxSlice'
import { clean } from '../../dashboard/components/user/storage/beneficiarySlice'
import { cleanDash } from '../../dashboard/store/dashSlice'


export const CustomSidebarContainer = ({ theme, setBroken, hasImage, toggled, setToggled }) => {

    const [collapsed, setCollapsed] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const menuItemStyles = {
        root: {
            fontSize: '13px',
            fontWeight: 400,
        },
        icon: {
            color: themes[theme].menu.icon,
            [`&.${menuClasses.disabled}`]: {
                color: themes[theme].menu.disabled.color,
            },
        },
        SubMenuExpandIcon: {
            color: '#b6b7b9',
        },
        subMenuContent: ({ level }) => ({
            backgroundColor:
                level === 0
                    ? hexToRgba(themes[theme].menu.menuContent, hasImage && !collapsed ? 0.4 : 1)
                    : 'transparent',
        }),
        button: {
            [`&.${menuClasses.disabled}`]: {
                color: themes[theme].menu.disabled.color,
            },
            '&:hover': {
                backgroundColor: hexToRgba(themes[theme].menu.hover.backgroundColor, hasImage ? 0.8 : 1),
                color: themes[theme].menu.hover.color,
            },
        },
        label: ({ open }) => ({
            fontWeight: open ? 600 : undefined,
        })
    }

    const handlerLogout = () => {
        localStorage.removeItem('authToken')
        dispatch(cleanBox())
        dispatch(clean())
        dispatch(logout())
        dispatch(cleanDash())
        navigate('/auth')
    }

    return (
        <CustomSidebar
            theme={theme}
            menuItemStyles={menuItemStyles}
            hasImage={hasImage}
            collapsed={collapsed}
            setCollapsed={setCollapsed}
            toggled={toggled}
            setToggled={setToggled}
            setBroken={setBroken}
            handlerLogout={handlerLogout}
        />
    )
}

CustomSidebarContainer.propTypes = {
    theme: PropTypes.string,
    hasImage: PropTypes.bool,
    setBroken: PropTypes.func,
    toggled: PropTypes.bool,
    setToggled: PropTypes.func,
}