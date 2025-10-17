// import './App.css'
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import MyAppBarWithMenu from './components/AppBar';
import UseEffectUsage from './hookUsageComponents/UseEffectUsage'
import UseStateUsage from './hookUsageComponents/UseStateUsage'
import UseContextUsage from './hookUsageComponents/UseContextUsage'


function App() {
  const theme = createTheme();
  return (
    
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <MyAppBarWithMenu />
        <UseStateUsage />
        <UseEffectUsage />
        <UseContextUsage />
      </ThemeProvider>

  )
}

export default App
