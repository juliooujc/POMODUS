import { Paper, Typography, Button} from '@mui/material'
import { useNavigate } from 'react-router-dom';

const Header = () => {
  
  const navigate = useNavigate();

  const handleHome = () => {
    navigate("/pages/home")
  }

  return (
    <Paper elevation={3}
      sx={{
        backgroundColor: 'primary.main',
        width: '100%',
        height: { xs: '8vh', md: '10vh' },
        justifyContent:"space-between",

        // o que garante ele ficar acima de todos    
        position: 'absolute',
        zIndex: 1,

        // pra alinhar o texto pomodus
        display: 'flex',        
        alignItems: 'center',
        top:0,
        gap: 'auto'
      }}>

      <Typography variant="h3" color="white" 
        sx={{ 
          fontSize: { xs: '1.2rem', md: '1.4rem'},
          fontFamily: 'cursive',
          ml: 3
        }}>
        Pomodus
      </Typography>

      <Button variant='contained' sx={{ mr:3 }} onClick={handleHome}>
        Sair
      </Button>
    </Paper>
  )
}

export default Header