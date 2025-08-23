import { ThemeProvider } from '@mui/material/styles';
import theme from './theme/theme';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppRoutes/>
    </ThemeProvider>
  )
}

export default App
