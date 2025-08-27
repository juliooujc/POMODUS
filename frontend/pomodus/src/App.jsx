import { ThemeProvider } from '@mui/material/styles';
import { AuthProvider } from './contexts/AuthContext';
import { TimerProvider } from './contexts/TimerContext'; // Importe o TimerProvider
import theme from './theme/theme';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <TimerProvider>
          <AppRoutes/>
        </TimerProvider>
      </ThemeProvider>
    </AuthProvider>
  )
}

export default App