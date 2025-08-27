import { useState, useEffect } from 'react';
import { Box, Grid, Stack, Typography } from '@mui/material';
import Header from '../components/Header';
import UsageChart from '../components/UsageChart';
import HistoryTable from '../components/HistoryTable';

import EqualizerIcon from '@mui/icons-material/Equalizer';
import ManageHistoryIcon from '@mui/icons-material/ManageHistory';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import FastForwardOutlinedIcon from '@mui/icons-material/FastForwardOutlined';
import AccessAlarmOutlinedIcon from '@mui/icons-material/AccessAlarmOutlined';
import CategoryChart from '../components/CategoryChart';

{/* Talvez eu quebre em elementos */ }

const Statistics = () => {
    // os estados responsaveis pela exibição das informação dos box coloridos
    const [diasUsados, setDiasUsados] = useState(0);
    const [produtividade, setProdutividade] = useState(0);
    const [horas, setHoras] = useState(0);

    const [dadosGraficos, setDadosGraficos] = useState({
        usoSemana: [],
        usoMes: [],
        categoriasSemana: [],
        categoriasMes: [],
    });
    // useEffect para buscar os dados da API quando o componente for montado
    useEffect(() => {
        const fetchStatistics = async () => {
            try {
                // TODO: Trocar pela URL da sua API
                const response = await fetch('http://127.0.0.1:5000/api/statistics');
                const data = await response.json();

                setDiasUsados(data.diasUsados);
                setProdutividade(data.diasProdutivos);
                setHoras(data.horasDeFoco);
                setDadosGraficos({
                    usoSemana: data.usoSemana,
                    usoMes: data.usoMes,
                    categoriasSemana: data.categoriasSemana,
                    categoriasMes: data.categoriasMes,
                });

            } catch (error) {
                console.error("Erro ao buscar estatísticas:", error);
            }
        };

        fetchStatistics();
    }, []); // O array vazio garante que o efeito rode apenas uma vez

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
                minHeight: '100vh',
                overflow: 'hidden'
            }}>

                <Grid container spacing={3} direction="column">
                    {/* Grid para nome: painel de estatisticas */}
                    <Grid size={12}>
                        <Stack
                            direction={{ xs: "row", md: "column" }}
                            spacing={1}
                            alignItems="center"
                            justifyContent="center" 
                            sx={{
                            padding:{md:2, xs:1},
                            backgroundColor:'white.basic' ,
                            mt:2,
                            ml:5,
                            mr:5,
                            borderRadius:{md:12, xs:8}
                        }}>
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
                        <Stack  direction={{ xs: "column", md: "row" }} spacing={{md:5, xs:2}} alignItems="center" justifyContent="center">
                            {/* box dos dias usados */}
                            <Box width={{xs:'80%', md:'25%'}} padding={{md:3, xs:2}} borderRadius={{md:5, xs:3}} backgroundColor={'red.pastel'}>
                                <Stack direction={'row'} spacing={1}>
                                    <CalendarMonthOutlinedIcon color='primary' />
                                    <Typography variant="h5" fontSize={{md:'20px',xs:'18px'}} align="left" fontWeight="bold" color='primary'>Dias usados</Typography>
                                </Stack>
                                <Typography variant="body1" align="left" color="text.secondary">Você usou por {diasUsados} dias</Typography>
                            </Box>
                            {/* box das horas de foco */}
                            <Box width={{xs:'80%', md:'25%'}} padding={{md:3, xs:2}} borderRadius={{md:5, xs:3}} backgroundColor={'yellow.pastel'}>
                                <Stack direction={'row'} spacing={1}>
                                    <AccessAlarmOutlinedIcon color='darkYellow'/>
                                    <Typography variant="h5" fontSize={{md:'20px',xs:'18px'}} color='darkYellow' align="left" fontWeight="bold">Horas</Typography>
                                </Stack>

                                <Typography variant="body1" align="left" color="text.secondary">Você já dedicou {horas} horas de foco!</Typography>
                            </Box>

                            {/* box da produtividade */}
                            <Box width={{xs:'80%', md:'25%'}} padding={{md:3, xs:2}} borderRadius={{md:5, xs:3}} backgroundColor={'green.pastel'}>
                                <Stack direction={'row'} spacing={1}>
                                    <FastForwardOutlinedIcon color='darkGreen'/>
                                    <Typography variant="h5" fontSize={{md:'20px',xs:'18px'}} align="left" fontWeight="bold" color='darkGreen'>Produtividade</Typography>
                                </Stack>
                                <Typography variant="body1" align="left" color="text.secondary">Você foi produtivo por {produtividade} dias!! Continue assim</Typography>
                            </Box>

                        </Stack>

                    </Grid>

                    {/* Grid para gráfico de barra + grafico pizza */}
                    <Grid size={12}>
                        <Stack direction={{ xs: "column", md: "row" }} spacing={{md:12, xs:4}} justifyContent="center" p={{xs:2,md:0}}>
                            <UsageChart chartHeight={300} dadosUso={dadosGraficos} />
                            <CategoryChart chartHeight={300} dadosCategoria={dadosGraficos} />
                        </Stack>
                    </Grid>


                    {/* Grid para título: Historico de atividades */}
                    <Grid size={12}>
                        <Stack
                            direction={{ xs: "row", md: "column" }}
                            spacing={1}
                            alignItems="center"
                            justifyContent="center" 
                            sx={{
                            padding:{md:2, xs:1},
                            backgroundColor:'white.basic' ,
                            mt:2,
                            ml:5,
                            mr:5,
                            borderRadius:{md:12, xs:8}
                            }}
                        >
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
                        <HistoryTable />
                    </Grid>

                </Grid>

            </Box>
        </Box>

    )
}

export default Statistics