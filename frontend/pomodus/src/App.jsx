import { ThemeProvider } from '@mui/material/styles';
import theme from './theme/theme'
import BackgroundWithShape from './components/BackgroundWithShape';
import Header from './components/Header';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <BackgroundWithShape />
    </ThemeProvider>
  )
}

export default App
