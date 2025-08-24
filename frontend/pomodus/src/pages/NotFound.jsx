import React from 'react'

import { Box, Paper, Stack, Typography, Grid, Button } from '@mui/material'
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();

    const handleReturn = (e) => {
        e.preventDefault();
        navigate('/');
    };

    return (
        <Box>
            {/* Tela de fundo Vermelha */}
            <Box sx={{
                position: 'absolute', // Faz a Box ignorar o fluxo normal da página
                m: 0,
                p: 0,
                width: '100%',
                minHeight: '100vh',
                backgroundColor: 'primary.main',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>


                {/* Bloco para login */}
                <Paper elevation={12} sx={{
                    width: { xs: '90%', sm: '70%', md: '50%' },
                    maxWidth: '500px',
                    height: 'auto',
                    padding: { xs: 3, md: 5 },
                    margin: { xs: 2, md: 15 }
                }}>
                    {/* Grid de login */}
                    <Grid container spacing={3} direction="column">
                        {/* Logo + Nome */}
                        <Grid size={12}>
                            <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
                                <img src="interface/logo.svg" alt="logo" style={{ width: '40px', height: 'auto' }} />
                                <Typography variant="h3" color="black"
                                    sx={{
                                        fontSize: { xs: '1.2rem', md: '1.4rem' },
                                        fontFamily: 'cursive',
                                    }}>
                                    Pomodus
                                </Typography>
                            </Stack>
                        </Grid>

                        {/* Texto: Crie sua conta + Bem-vindo */}
                        <Grid size={12}>
                            <Typography variant="h5" align="center" fontWeight="bold">Ops!!</Typography>
                            <Typography variant="body1" align="center" color="text.secondary">
                                Você encontrou um lugar que nem mesmo o Pomodus reconhece. <br />
                                Quer voltar ao foco?</Typography>
                        </Grid>

                        {/* Botao de voltar */}
                        <Grid size={12} paddingLeft={12} paddingRight={12}>
                            <Button variant="outlined" size="large" fullWidth startIcon={<ArrowBackIosOutlinedIcon />} onClick={handleReturn}>
                                Retornar
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>

            </Box>

        </Box>
    )
}

export default NotFound