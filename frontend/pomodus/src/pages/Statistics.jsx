import { useState } from 'react';
import { Box, Grid, Stack, Typography, Icon } from '@mui/material';
import Header from '../components/Header';

import EqualizerIcon from '@mui/icons-material/Equalizer';
import ManageHistoryIcon from '@mui/icons-material/ManageHistory';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import FastForwardOutlinedIcon from '@mui/icons-material/FastForwardOutlined';
import AccessAlarmOutlinedIcon from '@mui/icons-material/AccessAlarmOutlined';

const Statistics = () => {
    // os estados responsaveis pela exibição das informação dos box coloridos
    const [diasUsados, setDiasUsasdos] = useState(32);
    const [produtividade, setProdutividade] = useState(12);
    const [horas, setHoras] = useState(3);

    return (
        <Box>
            {/* Header */}
            <Header />
            {/* Tela de fundo off-white */}
            <Box sx={{
                position: 'absolute',
                top: { xs: '8vh', md: '10vh' },
                left: 0,
                zIndex: -1,
                backgroundColor: 'white.off',
                width: '100%',
                height: '100vh',
                overflow: 'hidden'
            }}>

                <Grid container spacing={3} direction="column">
                    {/* Grid para nome: painel de estatisticas */}
                    <Grid size={12}>
                        <Stack direction="column" spacing={1} alignItems="center" justifyContent="center" padding={2} backgroundColor='white.basic' mt={2} ml={5} mr={5} borderRadius={12}>
                            <EqualizerIcon color="primary" />
                            <Typography variant="h3" color="primary.main"
                                sx={{
                                    fontSize: { xs: '1.2rem', md: '1.4rem' },
                                    fontFamily: 'cursive',
                                }}>
                                Painel de estatísticas
                            </Typography>
                        </Stack>
                    </Grid>

                    {/* Grid para os 3 quadradinhos de informacao */}
                    <Grid size={12}>
                        {/* Um stack pra deixar um do lado do outro */}
                        <Stack direction={'row'} spacing={5} alignItems="center" justifyContent="center">
                            {/* box dos dias usados */}
                            <Box padding={3} borderRadius={5} backgroundColor={'red.pastel'}>
                                <Stack direction={'row'} spacing={1}>
                                    <CalendarMonthOutlinedIcon />
                                    <Typography variant="h5" align="left" fontWeight="bold">Dias usados</Typography>
                                </Stack>
                                <Typography variant="body1" align="left" color="text.secondary">Você usou por {diasUsados} dias</Typography>
                            </Box>
                            {/* box das horas de foco */}
                            <Box padding={3} borderRadius={5} backgroundColor={'yellow.pastel'}>
                                <Stack direction={'row'} spacing={1}>
                                    <AccessAlarmOutlinedIcon />
                                    <Typography variant="h5" align="left" fontWeight="bold">Horas</Typography>
                                </Stack>

                                <Typography variant="body1" align="left" color="text.secondary">Você já dedicou {horas} horas de foco!</Typography>
                            </Box>

                            {/* box da produtividade */}
                            <Box padding={3} borderRadius={5} backgroundColor={'green.pastel'}>
                                <Stack direction={'row'} spacing={1}><FastForwardOutlinedIcon />
                                    <Typography variant="h5" align="left" fontWeight="bold">Produtividade</Typography>
                                </Stack>
                                <Typography variant="body1" align="left" color="text.secondary">Você foi produtivo por {produtividade} dias!! Continue assim</Typography>
                            </Box>

                        </Stack>

                    </Grid>

                    {/* Grid para gráfico de barra + grafico pizza */}
                    <Grid size={12}>

                    </Grid>


                    {/* Grid para título: Historico de atividades */}
                    <Grid size={12}>
                        <Stack direction="column" spacing={1} alignItems="center" justifyContent="center" padding={2} backgroundColor='white.basic' mt={2} ml={5} mr={5} borderRadius={12}>
                            <ManageHistoryIcon color="primary" />
                            <Typography variant="h3" color="primary.main"
                                sx={{
                                    fontSize: { xs: '1.2rem', md: '1.4rem' },
                                    fontFamily: 'cursive',
                                }}>
                                Historico de Atividades
                            </Typography>
                        </Stack>
                    </Grid>

                    {/* Grid para tabela de histórico */}
                    <Grid size={12}>
                        
                    </Grid>

                </Grid>

            </Box>
        </Box>

    )
}

export default Statistics