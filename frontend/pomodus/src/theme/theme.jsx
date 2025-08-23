// theme.jsx
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#AF3F3F', // vermelho
    },
    secondary: {
      main: '#D9D9D9', // branco
    },
    tertiary:{
      main:  '#D32F2F' // vermelho forte
    },
    quartiary:{
      main : '#ffcdd2' // vermelho claro
    }
  },
});

export default theme;