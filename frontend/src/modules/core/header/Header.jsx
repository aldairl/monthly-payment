import PropTypes from 'prop-types'
import { Box, IconButton, Typography } from '@mui/material'
import { hexToRgba, themes } from '../sidebar/themeSidebar'
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined"
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined"
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined"


export const Header = ({ theme, ToggleTheme, hasImage, sidebarCollapsed, setToggled, toggled }) => {

  return (
    <Box
      display='flex'
      justifyContent="space-between"
      alignItems='center'
      p={2}
      backgroundColor={hexToRgba(themes[theme].sidebar.backgroundColor, hasImage ? 0.9 : 1)}
      style={{
        color: themes[theme].sidebar.color,
      }}
    >
      <Box
        display="flex"
      >
        <Typography
          variant="body1"
          fontWeight="bold"
          sx={{ m: "0 0 5px 0" }}
        >
          {sidebarCollapsed && (
            <IconButton color='primary' onClick={() => setToggled(!toggled)}>
              <MenuOutlinedIcon />
            </IconButton>
          )}
          
        </Typography>

      </Box>
      <Box display="flex">
        <IconButton onClick={ToggleTheme} color='primary'>
          {theme === "dark" ? (
            <LightModeOutlinedIcon />
          ) : (
            <DarkModeOutlinedIcon />
          )}
        </IconButton>
      </Box>
    </Box>
  )
}

Header.propTypes = {
  theme: PropTypes.string,
  colors: PropTypes.object,
  ToggleTheme: PropTypes.any,
  hasImage: PropTypes.bool,
  sidebarCollapsed: PropTypes.bool,
  toggled: PropTypes.bool,
  setToggled: PropTypes.func,
}