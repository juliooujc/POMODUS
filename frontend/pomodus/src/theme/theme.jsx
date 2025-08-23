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
      main:  '#2196F3' // azul
    },
    quartiary:{
      main : '#ffcdd2' // vermelho claro
    }
  },
});

export default theme;