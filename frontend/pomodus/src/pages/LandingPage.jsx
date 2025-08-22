// LandingPage.jsx
import { Box, Stack, Typography, Button } from '@mui/material'
import BackgroundWithShape from '../components/BackgroundWithShape';
import Header from '../components/Header';

// sistema de Z-index

// style: buttons
const giantButtonSx = {
    padding: { xs: '12px 24px', md: '20px 96px' },
    fontSize: { xs: '1rem', md: '3.5rem' },
    fontWeight: 'lighter',
    minWidth: { xs: '180px', md: '250px' },
    borderRadius: '16px',
    fontFamily: 'cursive'
};

const LandingPage = () => {
    return (
        <Box>
            <Header />
            <Box sx={{
                position: 'relative',
                paddingTop: { xs: '56px', md: '64px' }
            }}>
                <BackgroundWithShape />
                {/* Stack da logo + texto que ficam no lado branco */}
                <Stack spacing={2} sx={{ 
                    position: 'absolute',
                    top: '30%',
                    left: '10%',
                    alignItems: 'center'
                }}>
                    {/* Logo do app*/}
                    <img src="interface/logo.svg" alt="" style={{ height: 'auto' }} />

                    {/* Texto */}
                    <Typography variant="h1" color="initial" sx={{ textAlign: 'center', fontSize: { xs: '3rem', md: '4.5rem' }, fontFamily: 'cursive' }}>Pomodus</Typography>
                    <Typography variant="body2" color="initial" sx={{ textAlign: 'center', fontSize: { xs: '1rem', md: '3.5rem' }, fontFamily: 'fantasy' }}>Seu assistente de Tarefas</Typography>
                </Stack>

                {/* Stack dos botões que ficam no lado vermelho */}
                <Stack spacing={12} sx={{
                    position: 'absolute',
                    top: '40%',
                    right: '20%',
                    alignItems: 'center'
                }}>
                    <Button variant="contained" color="success" size='large' sx={giantButtonSx}>
                        Cadastrar
                    </Button>
                    <Button variant="contained" color="error" size='large' sx={giantButtonSx}>
                        Fazer Login
                    </Button>
                </Stack>
            </Box>

        </Box>
    )
}

export default LandingPage