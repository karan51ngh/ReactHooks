// import './App.css'
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import MyAppBarWithMenu from './components/AppBar';
import UseEffectUsage from './hookUsageComponents/UseEffectUsage'
import UseStateUsage from './hookUsageComponents/UseStateUsage'
import UseContextUsage from './hookUsageComponents/UseContextUsage'
import UseFetchUsage from './hookUsageComponents/UseFetchUsage';


function App() {
  const theme = createTheme();
  const useFetchExampleUrl = 'https://dummyjson.com/products/1';
  return (

    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MyAppBarWithMenu />
      <UseStateUsage />
        <UseEffectUsage />
        <UseContextUsage />
      <UseFetchUsage url={useFetchExampleUrl} />
    </ThemeProvider>

  )
}

export default App
