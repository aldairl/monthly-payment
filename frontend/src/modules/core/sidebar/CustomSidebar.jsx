import PropTypes from 'prop-types'
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar'
import { hexToRgba, themes } from './themeSidebar'
import { Box, IconButton, Typography } from '@mui/material'
import BarChartIcon from '@mui/icons-material/BarChart'
import BrushIcon from '@mui/icons-material/Brush'
import DiamondIcon from '@mui/icons-material/Diamond'
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined"
import PublicIcon from '@mui/icons-material/Public'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import LogoutIcon from '@mui/icons-material/Logout'
import { Link } from 'react-router-dom'

export const CustomSidebar = ({ collapsed, toggled, hasImage, theme, menuItemStyles, setToggled, setBroken, setCollapsed, handlerLogout }) => {
  return (
    <Sidebar
      collapsed={collapsed}
      toggled={toggled}
      onBackdropClick={() => setToggled(false)}
      onBreakPoint={setBroken}
      image="https://user-images.githubusercontent.com/25878302/144499035-2911184c-76d3-4611-86e7-bc4e8ff84ff5.jpg"
      breakPoint="md"
      backgroundColor={hexToRgba(themes[theme].sidebar.backgroundColor, hasImage ? 0.9 : 1)}
      rootStyles={{
        color: themes[theme].sidebar.color,
        // borderRight: `1px solid ${themes[theme].sidebar.color}`
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>

        <div style={{ flex: 1, marginBottom: '32px' }}>

          <Menu menuItemStyles={menuItemStyles}>

            <MenuItem onClick={() => setCollapsed(prev => toggled ? false : !prev)} style={{ marginTop: 10, marginBottom: 10 }} >
              <Box>
                {collapsed ?
                  <IconButton color='primary' >
                    <MenuOutlinedIcon />
                  </IconButton>
                  :
                  <Typography variant="subtitle1" fontWeight={700} color="#0098e5" display='flex' justifyContent='space-between' alignItems='center'>
                    <div>Registro de mensualidad</div>
                    <MenuOutlinedIcon />
                  </Typography>
                }

              </Box>
            </MenuItem>

            <div style={{ padding: '0 24px', marginBottom: '8px' }}>
              <Typography
                variant="body2"
                fontWeight={600}
                style={{ opacity: collapsed ? 0 : 0.7, letterSpacing: '0.5px' }}
              >
                General
              </Typography>
            </div>

            <SubMenu
              label="Cajas"
              icon={<BarChartIcon />}
            >
              <MenuItem component={ <Link to='/dash/box/list' /> } > lista de cajas</MenuItem>
              <MenuItem component={ <Link to='/dash/box/create' /> } > Crear caja</MenuItem>
              <MenuItem> Bar charts</MenuItem>
            </SubMenu>

            <SubMenu label="Conceptos" icon={<PublicIcon />}>
              <MenuItem component={ <Link to='/dash/concepts/create' /> }> crear concepto</MenuItem>
              <MenuItem component={ <Link to='/dash/concepts/list' /> }> lista de conceptos</MenuItem>
            </SubMenu>

            <SubMenu label="Beneficiarios" icon={<DiamondIcon />}>
              <MenuItem> Grid</MenuItem>
              <MenuItem> Layout</MenuItem>
              <SubMenu label="Forms">
                <MenuItem> Input</MenuItem>
                <MenuItem> Select</MenuItem>
                <SubMenu label="More">
                  <MenuItem> CheckBox</MenuItem>
                  <MenuItem> Radio</MenuItem>
                </SubMenu>
              </SubMenu>
            </SubMenu>

            <SubMenu label="Informes" icon={<ShoppingCartIcon />}>
              <MenuItem component={<Link to='/' />} > Product</MenuItem>
              <MenuItem> Orders</MenuItem>
              <MenuItem> Credit card</MenuItem>
            </SubMenu>

            <SubMenu label="Theme" icon={<BrushIcon />}>
              <MenuItem> Dark</MenuItem>
              <MenuItem> Light</MenuItem>
            </SubMenu>
            
          </Menu>

          <div style={{ padding: '0 24px', marginBottom: '8px', marginTop: '32px' }}>
            <Typography
              variant="body2"
              fontWeight={600}
              style={{ opacity: collapsed ? 0 : 0.7, letterSpacing: '0.5px' }}
            >
              Auth
            </Typography>
          </div>

          <Menu menuItemStyles={menuItemStyles}>
            <MenuItem icon={<LogoutIcon />} onClick={handlerLogout} >
              Cerrar sesión
            </MenuItem>
          </Menu>
        </div>
      </div>
    </Sidebar>
  )
}

CustomSidebar.propTypes = {
  collapsed: PropTypes.bool,
  toggled: PropTypes.bool,
  broken: PropTypes.bool,
  hasImage: PropTypes.bool,
  theme: PropTypes.string,
  setToggled: PropTypes.func,
  setBroken: PropTypes.func,
  setCollapsed: PropTypes.func,
  handlerLogout: PropTypes.func,
  menuItemStyles: PropTypes.object,
}