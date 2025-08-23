import { Paper, Typography, Button, Stack} from '@mui/material'
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
      <Stack direction="row" spacing={1} alignItems="center" justifyContent="center" sx={{ml:{xs:1, md:3}}}>
        <img src="/interface/logo.svg" alt="logo" style={{ width: '40px', height: 'auto' }} />
        <Typography variant="h3" color="white"
          sx={{
            fontSize: { xs: '1rem', md: '1.2rem' },
            fontFamily: 'cursive',
          }}>
          Pomodus
        </Typography>
      </Stack>
      <Button variant='contained' sx={{ mr:3 }} onClick={handleHome}>
        Sair
      </Button>
    </Paper>
  )
}

export default Header