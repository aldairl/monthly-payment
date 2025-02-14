import { BrowserRouter } from 'react-router-dom'
import { AppRouter } from './router/AppRouter'
import './App.css'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { ColorModeContext, useMode } from '../theme'

function App() {

  const [theme, ColorMode] = useMode()
  return (
    <ColorModeContext.Provider value={ColorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}

export default App
