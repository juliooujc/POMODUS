// theme.jsx
import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

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
    },
    white: {
      basic: '#ffffffff', // branco puro
      off: '#F2F0EF' // off-white 
    },
    green:{
      pastel: '#90FF80'
    },
    red: {
      pastel: '#FF8082'
    },
    yellow: {
      pastel: '#FFDB80'
    }
  },
});

export default theme;