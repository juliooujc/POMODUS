// LandingPage.jsx
import { Box, Stack, Typography, Button } from '@mui/material'
import BackgroundWithShape from '../components/BackgroundWithShape';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';

const giantButtonSx = {
    padding: { xs: '12px 24px', md: '16px ' },
    width: { md: '24vw', xs: '50vw' },
    fontSize: { xs: '1rem', md: '1rem' },
    fontWeight: 'lighter',
    borderRadius: '16px',
    fontFamily: 'cursive'
};

const LandingPage = () => {
    const navigate = useNavigate();

    const HandleCadastro = (e) => {
        e.preventDefault();
        navigate('/signin');
    };

    const HandleLogin = (e) => {
        e.preventDefault();
        navigate('/login');
    };

    return (
        <Box>
            <Header />
            <Box
                sx={{
                    paddingTop: { xs: '8vh', md: '10vh' },
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    justifyContent:'space-between',
                    gap:1,
                    minHeight: '100vh'
                }}
            >
                <BackgroundWithShape />
                {/* Área branca - logo + textos */}
                <Stack
                    sx={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: 'center'
                    }}
                >
                    {/* Logo */}
                    <Box sx={{ height: { xs: 150, md: 200 } }}>
                        <img src="interface/logo.svg" alt="logo" style={{ height: '100%' }} />
                    </Box>

                    {/* Título */}
                    <Typography variant="h1" color="text.primary"
                        sx={{
                            fontSize: { xs: '2.5rem', md: '2.5rem' },
                            fontFamily: 'cursive'
                        }}
                    >Pomodus</Typography>

                    {/* Subtítulo */}
                    <Typography variant="body2" color="text.primary"
                        sx={{
                            fontSize: { xs: '1.5rem', md: '1.5rem' }
                        }}
                    > Seu assistente de tarefas.</Typography>
                </Stack>

                {/* Área vermelha - texto + botões */}
                <Stack
                    spacing={4}
                    sx={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: 'center'
                    }}
                >
                    {/* Texto de descrição */}
                    <Typography variant="body1"
                        sx={{
                            fontSize: { xs: '1rem', md: '1.2rem' },
                            color: { md: 'white', xs: 'text.primary' }
                        }}
                    >
                        Transforme minutos em conquistas: <br />
                        gerencie suas tarefas com foco total <br />
                        usando a técnica Pomodoro.
                    </Typography>

                    {/* Botões */}
                    <Stack spacing={3} alignItems="center">
                        <Button variant="contained" color="primary" size="large" sx={giantButtonSx} onClick={HandleCadastro}>
                            Criar Conta
                        </Button>
                        <Button variant="contained" color="error" size="large" sx={giantButtonSx} onClick={HandleLogin}>
                            Fazer Login
                        </Button>
                    </Stack>
                </Stack>
            </Box>
        </Box>
    )
}

export default LandingPage
