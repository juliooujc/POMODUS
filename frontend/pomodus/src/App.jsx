import { ThemeProvider } from '@mui/material/styles';
import { AuthProvider } from './contexts/AuthContext';
import { TimerProvider } from './contexts/TimerContext'; // Importe o TimerProvider
import { ConfigProvider } from './contexts/ConfigContext';
import theme from './theme/theme';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <ConfigProvider>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <TimerProvider>
            <AppRoutes />
          </TimerProvider>
        </ThemeProvider>
      </AuthProvider>
    </ConfigProvider>
  )
}

export default App