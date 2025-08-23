// backgroundwithshape.jsx
import { Box } from '@mui/material';

const BackgroundWithShape = () => {
    return (
        // quadrado vermelho
        <Box sx={{
            position: 'absolute',
            top: {xs:'8vh', md:'10vh'},
            left: 0,
            zIndex: -1,
            backgroundColor: {md:'primary.main', xs:'secondary.main'}, 
            width: '100%',
            height: '100vh',
            overflow: 'hidden'
        }}>

        {/* Quadrado branco - escondido no XS */}
        <Box sx={{
            backgroundColor: 'secondary.main',
            width: '35vw',
            height: '100vh',
            display: { xs: 'none', md: 'block' }
            }}
        >
        {/* Elipse branca - só aparece no MD+ */}
        <Box
          sx={{
            position: 'absolute',
            backgroundColor: 'secondary.main',
            width: '20vw',
            height: '100vh',
            marginLeft: '30vw',
            borderTopRightRadius: '50%',
            borderBottomRightRadius: '40%',
            display: { xs: 'none', md: 'block' }
          }}
        />
      </Box>
    </Box>
    )
}

export default BackgroundWithShape