// fundo do negocinho
import { Box } from '@mui/material';


const BackgroundWithShape = () => {
    return (
        // quadrado vermelho
        <Box sx={{
            backgroundColor: 'primary.main', // vermelho
            width: '100vw',
            height: '100vh'
        }}>
            {/* Quadrado branco */}
            <Box
                sx={{
                    backgroundColor: 'secondary.main',
                    width: '40vw',
                    height: '100vh'
                }}>

                {/* Elipse branco */}
                <Box sx={{
                    backgroundColor: 'secondary.main',
                    width: '20vw',
                    height: '100vh',
                    marginLeft: '30vw', 
                    borderTopRightRadius: '50%', // tem aqui ajustar a elipse aq
                    borderBottomRightRadius: '40%'
                }}>

                </Box>
            </Box>
        </Box>
    )
}

export default BackgroundWithShape