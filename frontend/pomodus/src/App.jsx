import { ThemeProvider } from '@mui/material/styles';
import theme from './theme/theme'
import LandingPage from './pages/LandingPage';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <LandingPage />
    </ThemeProvider>
  )
}

export default App
