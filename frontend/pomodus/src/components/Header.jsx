// header.jsx
import { Paper, Typography } from '@mui/material'

const Header = () => {
  return (
    <Paper elevation={3}
    sx={{
        backgroundColor: 'primary.main',
        width: '100vw',
        height: { xs: '56px', md: '64px' },

        // o que garante ele ficar acima de todos    
        position: 'absolute',
        zIndex: 1,

        // pra alinhar o texto pomodus
        display: 'flex',        
        alignItems: 'center',
        padding: 2
    }}>

        <Typography variant="h3" color="secondary.main" sx={{
            paddingLeft: { xs: 4, md: 6 }, 
            fontSize: { xs: '1.5rem', sm: '2rem', md: '3rem' }
        }}>
            Pomodus
        </Typography>
    </Paper>
  )
}

export default Header