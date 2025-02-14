import PropTypes from 'prop-types'
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar'
import { hexToRgba, themes } from './themeSidebar'
import { Badge, Box, IconButton, Typography } from '@mui/material'
import BarChartIcon from '@mui/icons-material/BarChart'
import BrushIcon from '@mui/icons-material/Brush'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import DiamondIcon from '@mui/icons-material/Diamond'
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService'
import MailIcon from '@mui/icons-material/Mail'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined"
import PublicIcon from '@mui/icons-material/Public'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'

export const CustomSidebar = ({ collapsed, toggled, hasImage, theme, menuItemStyles, setToggled, setBroken, setCollapsed }) => {
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

            <MenuItem onClick={() => setCollapsed(!collapsed)} style={{ marginTop: 10, marginBottom: 10 }} >
              <Box>
                {collapsed ?
                  <IconButton color='primary' >
                    <MenuOutlinedIcon />
                  </IconButton>
                  :
                  <Typography variant="subtitle1" fontWeight={700} color="#0098e5" display='flex' justifyContent='space-between' alignItems='center'>
                    <div>Copy sidebarPrp</div>
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
              label="Charts"
              icon={<BarChartIcon />}
              suffix={
                <Badge shape="circle" badgeContent={6} color="primary" variant="danger">
                  <MailIcon color="action" />
                </Badge>
              }
            >
              <MenuItem> Pie charts</MenuItem>
              <MenuItem> Line charts</MenuItem>
              <MenuItem> Bar charts</MenuItem>
            </SubMenu>

            <SubMenu label="Maps" icon={<PublicIcon />}>
              <MenuItem> Google maps</MenuItem>
              <MenuItem> Open street maps</MenuItem>
            </SubMenu>

            <SubMenu label="Theme" icon={<BrushIcon />}>
              <MenuItem> Dark</MenuItem>
              <MenuItem> Light</MenuItem>
            </SubMenu>

            <SubMenu label="Components" icon={<DiamondIcon />}>
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

            <SubMenu label="E-commerce" icon={<ShoppingCartIcon />}>
              <MenuItem> Product</MenuItem>
              <MenuItem> Orders</MenuItem>
              <MenuItem> Credit card</MenuItem>
            </SubMenu>

          </Menu>

          <div style={{ padding: '0 24px', marginBottom: '8px', marginTop: '32px' }}>
            <Typography
              variant="body2"
              fontWeight={600}
              style={{ opacity: collapsed ? 0 : 0.7, letterSpacing: '0.5px' }}
            >
              Extra
            </Typography>
          </div>

          <Menu menuItemStyles={menuItemStyles}>
            <MenuItem icon={<CalendarMonthIcon />} suffix={<Badge variant="success">New</Badge>}>
              Calendar
            </MenuItem>
            <MenuItem icon={<MenuBookIcon />}>Documentation</MenuItem>
            <MenuItem disabled icon={<HomeRepairServiceIcon />}>
              Examples
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
  menuItemStyles: PropTypes.object,
}