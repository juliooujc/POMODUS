import { ThemeProvider } from '@mui/material/styles';
import theme from './theme/theme'
import BackgroundWithShape from './components/BackgroundWithShape';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BackgroundWithShape />
    </ThemeProvider>
  )
}

export default App
