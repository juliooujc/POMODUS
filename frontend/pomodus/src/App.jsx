import { ThemeProvider } from '@mui/material/styles';
import { AuthProvider } from './contexts/AuthContext';
import theme from './theme/theme';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <AppRoutes/>
      </ThemeProvider>
    </AuthProvider>
  )
}

export default App